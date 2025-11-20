import { PetitionCard } from '@/components/petition-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Mock data for petitions
const petitions = [
  {
    id: '1',
    title: 'Protect Our Local Park from Urban Development',
    category: 'Environment',
    signatures: 1250,
    target: 5000,
    image: 'park-image',
  },
  {
    id: '2',
    title: 'Improve Public Transportation in Downtown Area',
    category: 'Urban Development',
    signatures: 342,
    target: 1000,
    image: 'bus-image',
  },
  {
    id: '3',
    title: 'Increase Funding for Public Schools',
    category: 'Education',
    signatures: 879,
    target: 2500,
    image: 'school-image',
  },
  {
    id: '4',
    title: 'Build a New No-Kill Animal Shelter',
    category: 'Animal Rights',
    signatures: 4112,
    target: 10000,
    image: 'animal-shelter-image',
  },
];

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">Give Your Voice to a Cause</h1>
        <p className="max-w-2xl mx-auto text-muted-foreground text-lg mb-8">
          Start a petition, gather support, and make a change. Advocacy Alley is where your voice matters.
        </p>
        <Button size="lg" asChild>
          <Link href="/petitions/create">Start a Petition</Link>
        </Button>
      </section>

      <section id="petitions" className="space-y-6">
        <h2 className="text-3xl font-bold font-headline text-center">Trending Petitions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {petitions.map((petition) => (
            <PetitionCard key={petition.id} petition={petition} />
          ))}
        </div>
      </section>
    </div>
  );
}
