"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState, useCallback } from "react";
import { doc } from "firebase/firestore";
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult, UserCredential, EmailAuthProvider, linkWithCredential } from "firebase/auth";
import { useAuthState, useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useAuth, useFirestore } from "@/firebase";
import { setDocumentNonBlocking } from "@/firebase/non-blocking-updates";

const signupFormSchema = z.object({
  firstName: z.string().min(1, { message: "Nama depan tidak boleh kosong." }),
  lastName: z.string().min(1, { message: "Nama belakang tidak boleh kosong." }),
  email: z.string().email({ message: "Harap masukkan alamat email yang valid." }),
  password: z.string().min(6, { message: "Kata sandi minimal 6 karakter." }),
  phone: z.string().min(10, { message: "Nomor telepon tidak valid." }),
  otp: z.string().optional(),
});

type SignupFormValues = z.infer<typeof signupFormSchema>;

export default function SignupPage() {
  const auth = useAuth();
  const firestore = useFirestore();
  const [user, isUserLoading] = useAuthState(auth);
  const [createUserWithEmailAndPassword, , ,] = useCreateUserWithEmailAndPassword(auth);
  const router = useRouter();
  const { toast } = useToast();
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [isOtpSent, setIsOtpSent] = useState(false);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupFormSchema),
    mode: "onChange",
  });

  const setupRecaptcha = useCallback(() => {
    if (!auth) return;
    if (!(window as any).recaptchaVerifier) {
      (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
        'callback': () => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        }
      });
    }
  }, [auth]);

  useEffect(() => {
    setupRecaptcha();
  }, [setupRecaptcha]);

  useEffect(() => {
    if (!isUserLoading && user) {
      router.push('/dashboard');
    }
  }, [user, isUserLoading, router]);

  async function onSubmit(data: SignupFormValues) {
    if (!auth) return;
    
    if (!isOtpSent) {
      // Send OTP
      try {
        const appVerifier = (window as any).recaptchaVerifier;
        const result = await signInWithPhoneNumber(auth, data.phone, appVerifier);
        setConfirmationResult(result);
        setIsOtpSent(true);
        toast({
          title: "Kode OTP Terkirim",
          description: "Silakan periksa ponsel Anda untuk kode verifikasi.",
        });
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Gagal Mengirim OTP",
          description: error.message,
        });
        (window as any).recaptchaVerifier.render().then((widgetId: any) => {
            grecaptcha.reset(widgetId);
        });
      }
    } else {
      // Verify OTP and create user
      if (!confirmationResult || !data.otp) {
        toast({ variant: "destructive", title: "Kesalahan", description: "Harap masukkan kode OTP." });
        return;
      }
      try {
        const credential = await confirmationResult.confirm(data.otp);
        const phoneUser = credential.user;

        // Create user with email and password
        const emailUserCredential = await createUserWithEmailAndPassword(data.email, data.password);
        if (!emailUserCredential) {
            throw new Error("Gagal membuat akun dengan email.");
        }

        const emailUser = emailUserCredential.user;

        // Link phone auth to email/password user
        const emailCredential = EmailAuthProvider.credential(data.email, data.password);
        await linkWithCredential(phoneUser, emailCredential);

        // At this point, the user is signed in with both methods, but the primary user object is the one from the link operation.
        // We'll use the final user object from auth state to ensure consistency.
        const authUnsubscribe = auth.onAuthStateChanged(async (finalUser) => {
          if (finalUser) {
            const userRef = doc(firestore, "users", finalUser.uid);
            const userData = {
              id: finalUser.uid,
              email: data.email,
              firstName: data.firstName,
              lastName: data.lastName,
              phoneNumber: data.phone,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              role: "user",
            };
            setDocumentNonBlocking(userRef, userData, { merge: true });
            
            toast({
              title: "Akun Dibuat!",
              description: "Akun Anda telah berhasil dibuat dan diverifikasi.",
            });
            router.push('/dashboard');
            
            authUnsubscribe();
          }
        });

      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Oh tidak! Terjadi kesalahan.",
          description: error.message || "Tidak dapat membuat akun.",
        });
        setIsOtpSent(false);
        setConfirmationResult(null);
      }
    }
  }
  
  if (isUserLoading) {
    return <p>Memuat...</p>;
  }

  if (user) {
    return null;
  }

  return (
    <div className="flex items-center justify-center py-12">
      <Card className="mx-auto max-w-sm w-full">
        <CardHeader>
          <CardTitle className="text-xl font-headline">Daftar</CardTitle>
          <CardDescription>
            Masukkan informasi Anda untuk membuat akun
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {!isOtpSent ? (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nama depan</FormLabel>
                          <FormControl>
                            <Input placeholder="Max" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nama belakang</FormLabel>
                          <FormControl>
                            <Input placeholder="Robinson" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="m@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kata Sandi</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nomor Telepon</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="+628123456789" {...field} />
                        </FormControl>
                         <FormDescription>Gunakan format internasional (cth. +62812...).</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              ) : (
                <FormField
                  control={form.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kode OTP</FormLabel>
                      <FormControl>
                        <Input placeholder="123456" {...field} />
                      </FormControl>
                      <FormDescription>Masukkan kode 6 digit yang dikirimkan ke ponsel Anda.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <div id="recaptcha-container"></div>
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {isOtpSent ? "Verifikasi & Buat Akun" : "Daftar & Kirim OTP"}
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Sudah punya akun?{" "}
            <Link href="/login" className="underline">
              Masuk
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
