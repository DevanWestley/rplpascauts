import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-card border-t mt-auto">
      <div className="container mx-auto px-4 py-6 text-sm text-muted-foreground flex flex-col md:flex-row justify-between items-center gap-4">
        <p>&copy; {new Date().getFullYear()} Suara Kita. Semua hak dilindungi undang-undang.</p>
        <nav className="flex gap-4">
          <Link href="#" className="hover:text-primary transition-colors">Ketentuan Layanan</Link>
          <Link href="#" className="hover:text-primary transition-colors">Kebijakan Privasi</Link>
        </nav>
      </div>
    </footer>
  );
}
