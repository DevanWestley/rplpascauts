import { PetitionCard } from '@/components/petition-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Mock data for petitions
const petitions = [
  {
    id: '1',
    title: 'Lindungi Taman Lokal Kita dari Pembangunan Kota',
    category: 'Lingkungan',
    signatures: 1250,
    target: 5000,
    image: 'park-image',
  },
  {
    id: '2',
    title: 'Tingkatkan Transportasi Publik di Area Pusat Kota',
    category: 'Pembangunan Kota',
    signatures: 342,
    target: 1000,
    image: 'bus-image',
  },
  {
    id: '3',
    title: 'Tingkatkan Dana untuk Sekolah Umum',
    category: 'Pendidikan',
    signatures: 879,
    target: 2500,
    image: 'school-image',
  },
  {
    id: '4',
    title: 'Bangun Penampungan Hewan Baru Tanpa Eutanasia',
    category: 'Hak-Hak Hewan',
    signatures: 4112,
    target: 10000,
    image: 'animal-shelter-image',
  },
];

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">Berikan Suaramu untuk Sebuah Perubahan</h1>
        <p className="max-w-2xl mx-auto text-muted-foreground text-lg mb-8">
          Mulai sebuah petisi, kumpulkan dukungan, dan buat perubahan. Suara Kita adalah tempat di mana suaramu berarti.
        </p>
        <Button size="lg" asChild>
          <Link href="/petitions/create">Mulai Petisi</Link>
        </Button>
      </section>

      <section id="petitions" className="space-y-6">
        <h2 className="text-3xl font-bold font-headline text-center">Petisi Populer</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {petitions.map((petition) => (
            <PetitionCard key={petition.id} petition={petition} />
          ))}
        </div>
      </section>
    </div>
  );
}
