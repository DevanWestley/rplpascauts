"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export function SignPetitionDialog({ children }: { children: React.ReactNode }) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Here you would handle form submission, e.g., send to an API
    // For now, we just show a success toast and close the dialog.
    toast({
      title: "Tanda Tangan Terkirim!",
      description: "Terima kasih telah mendukung perjuangan ini.",
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Tambahkan Tanda Tangan Anda</DialogTitle>
            <DialogDescription>
              Suara Anda penting. Isi formulir di bawah ini untuk menandatangani petisi ini.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input id="name" required placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Alamat Email</Label>
              <Input id="email" type="email" required placeholder="anda@contoh.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Lokasi (Opsional)</Label>
              <Input id="location" placeholder="cth., Kota, Negara" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="comment">Komentar (Opsional)</Label>
              <Textarea id="comment" placeholder="Mengapa ini penting bagi Anda?" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="ghost">Batal</Button>
            </DialogClose>
            <Button type="submit">Kirim Tanda Tangan</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
