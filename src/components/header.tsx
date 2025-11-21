import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Menu, User } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Logo } from './logo';

export function Header() {
  const isLoggedIn = true; // Placeholder for authentication state

  return (
    <header className="bg-card shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Logo className="h-8 w-8 text-primary" />
          <span className="font-headline">Suara Kita</span>
        </Link>
        <nav className="hidden md:flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/">Beranda</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/#petitions">Jelajahi</Link>
          </Button>
          <Button asChild>
            <Link href="/petitions/create">Mulai Petisi</Link>
          </Button>
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full">
                  <Avatar>
                    <AvatarImage src="https://picsum.photos/seed/user-avatar/40/40" alt="User avatar" data-ai-hint="person face" />
                    <AvatarFallback><User /></AvatarFallback>
                  </Avatar>
                  <span className="sr-only">Buka menu pengguna</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild><Link href="/dashboard">Dasbor</Link></DropdownMenuItem>
                <DropdownMenuItem disabled>Pengaturan</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Keluar</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="outline" asChild>
              <Link href="/login">Masuk</Link>
            </Button>
          )}
        </nav>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Buka menu navigasi</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>
                  <Link href="/" className="flex items-center gap-2 text-lg font-semibold mb-4">
                    <Logo className="h-8 w-8" />
                    <span>Suara Kita</span>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <nav className="grid gap-4 text-lg font-medium mt-4">
                <Link href="/" className="hover:text-primary transition-colors">Beranda</Link>
                <Link href="/#petitions" className="hover:text-primary transition-colors">Jelajahi</Link>
                <Link href="/petitions/create" className="hover:text-primary transition-colors">Mulai Petisi</Link>
                <Separator />
                {isLoggedIn ? (
                  <>
                    <Link href="/dashboard" className="hover:text-primary transition-colors">Dasbor</Link>
                    <Link href="#" className="text-muted-foreground cursor-not-allowed">Pengaturan</Link>
                    <Link href="#" className="hover:text-primary transition-colors">Keluar</Link>
                  </>
                ) : (
                  <Link href="/login" className="hover:text-primary transition-colors">Masuk</Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
