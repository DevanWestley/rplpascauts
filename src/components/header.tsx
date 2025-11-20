import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Menu, Mountain, User } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export function Header() {
  const isLoggedIn = true; // Placeholder for authentication state

  return (
    <header className="bg-card shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Mountain className="h-6 w-6 text-primary" />
          <span className="font-headline">Advocacy Alley</span>
        </Link>
        <nav className="hidden md:flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/">Home</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/#petitions">Browse</Link>
          </Button>
          <Button asChild>
            <Link href="/petitions/create">Start a Petition</Link>
          </Button>
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full">
                  <Avatar>
                    <AvatarImage src="https://picsum.photos/seed/user-avatar/40/40" alt="User avatar" data-ai-hint="person face" />
                    <AvatarFallback><User /></AvatarFallback>
                  </Avatar>
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild><Link href="/dashboard">Dashboard</Link></DropdownMenuItem>
                <DropdownMenuItem disabled>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="outline" asChild>
              <Link href="/login">Login</Link>
            </Button>
          )}
        </nav>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="grid gap-4 text-lg font-medium mt-8">
                <Link href="/" className="flex items-center gap-2 text-lg font-semibold mb-4">
                  <Mountain className="h-6 w-6" />
                  <span>Advocacy Alley</span>
                </Link>
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                <Link href="/#petitions" className="hover:text-primary transition-colors">Browse</Link>
                <Link href="/petitions/create" className="hover:text-primary transition-colors">Start a Petition</Link>
                <Separator />
                {isLoggedIn ? (
                  <>
                    <Link href="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
                    <Link href="#" className="text-muted-foreground cursor-not-allowed">Settings</Link>
                    <Link href="#" className="hover:text-primary transition-colors">Logout</Link>
                  </>
                ) : (
                  <Link href="/login" className="hover:text-primary transition-colors">Login</Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
