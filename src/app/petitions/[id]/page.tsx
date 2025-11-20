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
      title: 'Protect Our Local Park from Urban Development',
      category: 'Environment',
      description: 'Our local park is a green lung for our community, providing a space for recreation, relaxation, and biodiversity. A new proposal for urban development threatens to destroy a large portion of this invaluable green space. We, the undersigned, urge the city council to reject this proposal and work with the community to preserve and enhance our park for future generations. This park is not just land; it is a part of our community\'s heritage and well-being.',
      signatures: 1250,
      target: 5000,
      image: 'park-image',
      creator: 'Jane Doe',
      deadline: new Date('2024-12-31'),
    },
    {
      id: '2',
      title: 'Improve Public Transportation in Downtown Area',
      category: 'Urban Development',
      description: 'Downtown traffic is becoming unbearable, causing pollution and wasting commuters\' time. We need a more robust and reliable public transportation system. This petition calls for increased funding, expanded bus routes, and the exploration of a light rail system to make our city more accessible and sustainable.',
      signatures: 342,
      target: 1000,
      image: 'bus-image',
      creator: 'John Smith',
      deadline: new Date('2025-02-28'),
    },
    {
      id: '3',
      title: 'Increase Funding for Public Schools',
      category: 'Education',
      description: 'Our children\'s future depends on the quality of their education. Public schools in our district are underfunded, leading to overcrowded classrooms, outdated materials, and underpaid teachers. We demand that the local government prioritize education by increasing the budget for our public schools.',
      signatures: 879,
      target: 2500,
      image: 'school-image',
      creator: 'Emily White',
      deadline: new Date('2024-11-30'),
    },
    {
      id: '4',
      title: 'Build a New No-Kill Animal Shelter',
      category: 'Animal Rights',
      description: 'Thousands of stray and abandoned animals are euthanized each year due to a lack of space in our local shelters. A new, modern, no-kill shelter would provide a safe haven for these animals, giving them the chance to find a loving forever home. Let\'s show our compassion and build a better future for our furry friends.',
      signatures: 4112,
      target: 10000,
      image: 'animal-shelter-image',
      creator: 'Michael Brown',
      deadline: new Date('2025-06-01'),
    },
];

const supporters = [
  { name: 'John S.', location: 'New York, USA', comment: 'We need more green spaces, not less!', signedAt: '2 hours ago' },
  { name: 'Maria G.', location: 'Madrid, Spain', comment: 'Parks are essential for mental health.', signedAt: '5 hours ago' },
  { name: 'Kenji T.', location: 'Tokyo, Japan', comment: '', signedAt: '1 day ago' },
  { name: 'Aisha B.', location: 'Lagos, Nigeria', comment: 'Protect our environment!', signedAt: '2 days ago' },
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
        <p className="text-muted-foreground">Created by <span className="font-semibold text-foreground">{petition.creator}</span></p>
        <Separator />
        <article className="prose dark:prose-invert max-w-none text-foreground/90 leading-relaxed">
          <p>{petition.description}</p>
        </article>
      </div>

      <div className="space-y-6 md:sticky md:top-24 h-fit">
        <Card>
          <CardHeader>
            <CardTitle>Petition Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-baseline">
              <span className="text-2xl font-bold">{petition.signatures.toLocaleString()}</span>
              <span className="text-sm text-muted-foreground">of {petition.target.toLocaleString()}</span>
            </div>
            <Progress value={percentage} aria-label={`${percentage.toFixed(0)}% of target achieved`} />
            <SignPetitionDialog>
              <Button className="w-full" size="lg">Sign this petition</Button>
            </SignPetitionDialog>
            <p className="text-xs text-center text-muted-foreground">
              Deadline: {petition.deadline.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Share this Petition</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Button variant="outline" size="icon" aria-label="Share on Twitter"><Twitter /></Button>
            <Button variant="outline" size="icon" aria-label="Share on Facebook"><Facebook /></Button>
            <Button variant="outline" size="icon" aria-label="Share on LinkedIn"><Linkedin /></Button>
            <Button variant="outline" size="icon" aria-label="Copy link"><Copy /></Button>
            <Button variant="outline" size="icon" aria-label="Embed code"><Code /></Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Supporters</CardTitle>
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
