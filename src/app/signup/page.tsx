"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect } from "react";
import { doc } from "firebase/firestore";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useAuth, useFirestore, useUser } from "@/firebase";
import { initiateEmailSignUp } from "@/firebase/non-blocking-login";
import { setDocumentNonBlocking } from "@/firebase/non-blocking-updates";

const signupFormSchema = z.object({
  firstName: z.string().min(1, { message: "Nama depan tidak boleh kosong." }),
  lastName: z.string().min(1, { message: "Nama belakang tidak boleh kosong." }),
  email: z.string().email({ message: "Harap masukkan alamat email yang valid." }),
  password: z.string().min(6, { message: "Kata sandi minimal 6 karakter." }),
});

type SignupFormValues = z.infer<typeof signupFormSchema>;

export default function SignupPage() {
  const auth = useAuth();
  const firestore = useFirestore();
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupFormSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (!isUserLoading && user) {
      router.push('/dashboard');
    }
  }, [user, isUserLoading, router]);

  async function onSubmit(data: SignupFormValues) {
    try {
      // First, create the user in Firebase Auth
      const userCredential = await initiateEmailSignUp(auth, data.email, data.password);
      
      // After user is created, user object is available in the listener.
      // We'll create the user document in Firestore inside the onAuthStateChanged listener
      // to ensure we have the UID.
      const authUnsubscribe = auth.onAuthStateChanged(authUser => {
        if (authUser) {
          const userRef = doc(firestore, "users", authUser.uid);
          const userData = {
            id: authUser.uid,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            role: "user",
          };
          setDocumentNonBlocking(userRef, userData, { merge: true });
          
          toast({
            title: "Akun Dibuat!",
            description: "Akun Anda telah berhasil dibuat.",
          });
          
          // Unsubscribe to avoid running this multiple times
          authUnsubscribe();
        }
      });

    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Oh tidak! Terjadi kesalahan.",
        description: error.message || "Tidak dapat membuat akun.",
      });
    }
  }

  if (isUserLoading) {
    return <p>Memuat...</p>; // Or a loading spinner
  }
  
  if (user) {
    // Already logged in, no need to show signup
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
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                Buat akun
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
