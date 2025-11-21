import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Copy, Facebook, Linkedin, Twitter, Code } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { ImagePlaceholder } from '@/lib/placeholder-images';
import { SignPetitionDialog } from '@/components/sign-petition-dialog';
import { notFound } from 'next/navigation';

// This would typically come from a database or API
const petitionsData = [
    {
      id: '1',
      title: 'Lindungi Taman Lokal Kita dari Pembangunan Kota',
      category: 'Lingkungan',
      description: 'Taman lokal kita adalah paru-paru hijau bagi komunitas kita, menyediakan ruang untuk rekreasi, relaksasi, dan keanekaragaman hayati. Sebuah proposal baru untuk pembangunan perkotaan mengancam untuk menghancurkan sebagian besar ruang hijau yang tak ternilai ini. Kami, yang bertanda tangan di bawah ini, mendesak dewan kota untuk menolak proposal ini dan bekerja sama dengan masyarakat untuk melestarikan dan meningkatkan taman kita untuk generasi mendatang. Taman ini bukan hanya tanah; itu adalah bagian dari warisan dan kesejahteraan komunitas kita.',
      signatures: 1250,
      target: 5000,
      image: 'park-image',
      creator: 'Jane Doe',
      deadline: new Date('2024-12-31'),
    },
    {
      id: '2',
      title: 'Tingkatkan Transportasi Publik di Area Pusat Kota',
      category: 'Pembangunan Kota',
      description: 'Lalu lintas di pusat kota menjadi tak tertahankan, menyebabkan polusi dan membuang-buang waktu para komuter. Kita membutuhkan sistem transportasi publik yang lebih kuat dan andal. Petisi ini menyerukan peningkatan dana, perluasan rute bus, dan eksplorasi sistem kereta ringan untuk membuat kota kita lebih mudah diakses dan berkelanjutan.',
      signatures: 342,
      target: 1000,
      image: 'bus-image',
      creator: 'John Smith',
      deadline: new Date('2025-02-28'),
    },
    {
      id: '3',
      title: 'Tingkatkan Dana untuk Sekolah Umum',
      category: 'Pendidikan',
      description: 'Masa depan anak-anak kita bergantung pada kualitas pendidikan mereka. Sekolah-sekolah umum di distrik kita kekurangan dana, yang menyebabkan kelas-kelas yang terlalu padat, materi yang sudah usang, dan guru yang dibayar rendah. Kami menuntut agar pemerintah daerah memprioritaskan pendidikan dengan meningkatkan anggaran untuk sekolah umum kita.',
      signatures: 879,
      target: 2500,
      image: 'school-image',
      creator: 'Emily White',
      deadline: new Date('2024-11-30'),
    },
    {
      id: '4',
      title: 'Bangun Penampungan Hewan Baru Tanpa Eutanasia',
      category: 'Hak-Hak Hewan',
      description: 'Ribuan hewan liar dan terlantar di-eutanasia setiap tahun karena kurangnya ruang di penampungan lokal kita. Penampungan baru yang modern dan tanpa eutanasia akan memberikan tempat yang aman bagi hewan-hewan ini, memberi mereka kesempatan untuk menemukan rumah selamanya yang penuh kasih. Mari tunjukkan belas kasih kita dan bangun masa depan yang lebih baik untuk teman-teman berbulu kita.',
      signatures: 4112,
      target: 10000,
      image: 'animal-shelter-image',
      creator: 'Michael Brown',
      deadline: new Date('2025-06-01'),
    },
];

const supporters = [
  { name: 'John S.', location: 'New York, USA', comment: 'Kita butuh lebih banyak ruang hijau, bukan lebih sedikit!', signedAt: '2 jam lalu' },
  { name: 'Maria G.', location: 'Madrid, Spanyol', comment: 'Taman sangat penting untuk kesehatan mental.', signedAt: '5 jam lalu' },
  { name: 'Kenji T.', location: 'Tokyo, Jepang', comment: '', signedAt: '1 hari lalu' },
  { name: 'Aisha B.', location: 'Lagos, Nigeria', comment: 'Lindungi lingkungan kita!', signedAt: '2 hari lalu' },
];


export default function PetitionPage({ params }: { params: { id: string } }) {
  const petition = petitionsData.find(p => p.id === params.id);

  if (!petition) {
    notFound();
  }

  const image: ImagePlaceholder | undefined = PlaceHolderImages.find(p => p.id === petition.image);
  const percentage = (petition.signatures / petition.target) * 100;
  
  return (
    <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
      <div className="md:col-span-2 space-y-6">
        {image && (
          <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-md">
            <Image
              src={image.imageUrl}
              alt={image.description}
              data-ai-hint={image.imageHint}
              fill
              className="object-cover"
            />
          </div>
        )}
        <Badge variant="secondary">{petition.category}</Badge>
        <h1 className="text-3xl md:text-4xl font-bold font-headline">{petition.title}</h1>
        <p className="text-muted-foreground">Dibuat oleh <span className="font-semibold text-foreground">{petition.creator}</span></p>
        <Separator />
        <article className="prose dark:prose-invert max-w-none text-foreground/90 leading-relaxed">
          <p>{petition.description}</p>
        </article>
      </div>

      <div className="space-y-6 md:sticky md:top-24 h-fit">
        <Card>
          <CardHeader>
            <CardTitle>Status Petisi</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-baseline">
              <span className="text-2xl font-bold">{petition.signatures.toLocaleString('id-ID')}</span>
              <span className="text-sm text-muted-foreground">dari {petition.target.toLocaleString('id-ID')}</span>
            </div>
            <Progress value={percentage} aria-label={`${percentage.toFixed(0)}% dari target tercapai`} />
            <SignPetitionDialog>
              <Button className="w-full" size="lg">Tanda Tangani Petisi Ini</Button>
            </SignPetitionDialog>
            <p className="text-xs text-center text-muted-foreground">
              Batas Waktu: {petition.deadline.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bagikan Petisi Ini</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Button variant="outline" size="icon" aria-label="Bagikan di Twitter"><Twitter /></Button>
            <Button variant="outline" size="icon" aria-label="Bagikan di Facebook"><Facebook /></Button>
            <Button variant="outline" size="icon" aria-label="Bagikan di LinkedIn"><Linkedin /></Button>
            <Button variant="outline" size="icon" aria-label="Salin tautan"><Copy /></Button>
            <Button variant="outline" size="icon" aria-label="Sematkan kode"><Code /></Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pendukung Terbaru</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                {supporters.slice(0, 3).map((supporter, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <p className="font-semibold">{supporter.name}</p>
                      <p className="text-sm text-muted-foreground">{supporter.location}</p>
                      {supporter.comment && <p className="text-sm mt-1 italic">"{supporter.comment}"</p>}
                    </TableCell>
                    <TableCell className="text-right text-xs text-muted-foreground align-top">{supporter.signedAt}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
