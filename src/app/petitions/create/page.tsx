
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { id } from "date-fns/locale"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const petitionFormSchema = z.object({
  title: z.string().min(10, { message: "Judul harus terdiri dari minimal 10 karakter." }).max(150, { message: "Judul maksimal 150 karakter." }),
  description: z.string().min(50, { message: "Deskripsi harus terdiri dari minimal 50 karakter." }),
  target: z.coerce.number().min(1, { message: "Target harus minimal 1." }),
  category: z.string({ required_error: "Silakan pilih kategori." }),
  deadline: z.date({ required_error: "Tanggal batas waktu diperlukan." }),
  visibility: z.enum(["public", "private"], { required_error: "Anda harus memilih opsi visibilitas." }),
  attachments: z.any().optional(),
})

type PetitionFormValues = z.infer<typeof petitionFormSchema>

const defaultValues: Partial<PetitionFormValues> = {
  title: "",
  description: "",
  target: 1000,
  visibility: "public",
  category: undefined,
  deadline: undefined,
  attachments: undefined,
};

export default function CreatePetitionPage() {
  const { toast } = useToast();
  const form = useForm<PetitionFormValues>({
    resolver: zodResolver(petitionFormSchema),
    defaultValues,
    mode: "onChange",
  })

  function onSubmit(data: PetitionFormValues) {
    toast({
      title: "Petisi Dibuat!",
      description: "Petisi Anda telah berhasil dikirim untuk ditinjau.",
    });
    console.log(data);
  }
  
  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl font-headline">Buat Petisi Baru</CardTitle>
        <CardDescription>Isi detail di bawah ini untuk meluncurkan kampanye perubahan Anda.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Judul Petisi</FormLabel>
                  <FormControl>
                    <Input placeholder="cth., Larang plastik sekali pakai di kota kita" {...field} value={field.value || ''} />
                  </FormControl>
                  <FormDescription>Ini akan menjadi judul utama untuk petisi Anda.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Ceritakan kisah di balik petisi Anda dan mengapa itu penting..." className="min-h-[150px]" {...field} value={field.value || ''} />
                  </FormControl>
                  <FormDescription>Jelaskan masalah dan solusi yang Anda usulkan.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid md:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="target"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target Tanda Tangan</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="5000" {...field} value={field.value || ''} />
                    </FormControl>
                    <FormDescription>Berapa banyak tanda tangan yang Anda targetkan?</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kategori</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih kategori" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="lingkungan">Lingkungan</SelectItem>
                        <SelectItem value="hak-asasi-manusia">Hak Asasi Manusia</SelectItem>
                        <SelectItem value="pendidikan">Pendidikan</SelectItem>
                        <SelectItem value="kesehatan">Kesehatan</SelectItem>
                        <SelectItem value="hak-hewan">Hak-Hak Hewan</SelectItem>
                        <SelectItem value="pembangunan-kota">Pembangunan Kota</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="deadline"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Batas Waktu</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full md:w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP", { locale: id })
                          ) : (
                            <span>Pilih tanggal</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>Kapan petisi Anda akan berakhir?</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="attachments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gambar / Dokumen</FormLabel>
                  <FormControl>
                    <Input type="file" onChange={(e) => field.onChange(e.target.files)} />
                  </FormControl>
                  <FormDescription>Tambahkan gambar yang menarik atau dokumen pendukung (opsional).</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="visibility"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Visibilitas</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="public" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Publik - Terlihat oleh semua orang dan dapat ditemukan di hasil pencarian.
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="private" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Pribadi - Hanya orang dengan tautan langsung yang dapat melihat dan menandatangani.
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Buat Petisi</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
