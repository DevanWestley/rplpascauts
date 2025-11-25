
"use client";

import { useState, useMemo } from 'react';
import { PetitionCard } from '@/components/petition-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

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

const categories = [
  "Lingkungan",
  "Pembangunan Kota",
  "Pendidikan",
  "Hak-Hak Hewan",
  "Kesehatan",
  "Hak Asasi Manusia",
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredPetitions = useMemo(() => {
    return petitions.filter(petition => {
      const matchesSearch = petition.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || petition.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

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

      <section id="petitions" className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold font-headline">Jelajahi Petisi</h2>
          <p className="text-muted-foreground mt-2">Temukan perjuangan yang sesuai dengan hati nurani Anda.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Cari berdasarkan judul petisi..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="md:w-[240px]">
              <SelectValue placeholder="Semua Kategori" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Kategori</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {filteredPetitions.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPetitions.map((petition) => (
              <PetitionCard key={petition.id} petition={petition} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg font-semibold">Tidak ada petisi yang ditemukan.</p>
            <p className="text-muted-foreground">Coba ubah kata kunci pencarian atau filter Anda.</p>
          </div>
        )}
      </section>
    </div>
  );
}
