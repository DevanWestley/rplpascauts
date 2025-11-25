import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { ImagePlaceholder } from '@/lib/placeholder-images';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface Petition {
  id: string;
  title: string;
  category: string;
  signatures: number;
  target: number;
  image?: string; // Corresponds to id in placeholder-images.json
  attachmentUrl?: string; // Can be used directly as image src
}

interface PetitionCardProps {
  petition: Petition;
}

export function PetitionCard({ petition }: PetitionCardProps) {
  const percentage = (petition.signatures / petition.target) * 100;
  const image: ImagePlaceholder | undefined = petition.image ? PlaceHolderImages.find(p => p.id === petition.image) : undefined;
  const imageUrl = petition.attachmentUrl || image?.imageUrl;

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-shadow hover:shadow-lg duration-300">
      <CardHeader className="p-0">
        <Link href={`/petitions/${petition.id}`} className="block relative aspect-[4/3]">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={petition.title}
              data-ai-hint={image?.imageHint || "petition image"}
              fill
              className="object-cover rounded-t-lg"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="bg-muted w-full h-full flex items-center justify-center">
                <span className="text-muted-foreground text-sm">Tidak ada gambar</span>
            </div>
          )}
          <Badge variant="secondary" className="absolute top-3 left-3">{petition.category}</Badge>
        </Link>
      </CardHeader>
      <div className="p-4 flex flex-col flex-grow">
        <CardTitle className="text-lg leading-tight mb-4 flex-grow">
          <Link href={`/petitions/${petition.id}`} className="hover:underline">
            {petition.title}
          </Link>
        </CardTitle>
        <CardContent className="p-0 mb-4">
          <div className="flex justify-between items-center mb-2 text-sm text-muted-foreground">
            <span>
              <strong className="text-foreground">{petition.signatures.toLocaleString('id-ID')}</strong> tanda tangan
            </span>
            <span className="font-semibold">{percentage.toFixed(0)}%</span>
          </div>
          <Progress value={percentage} aria-label={`${percentage.toFixed(0)}% dari target tanda tangan`} />
        </CardContent>
        <CardFooter className="p-0">
          <Button asChild className="w-full" variant="outline">
            <Link href={`/petitions/${petition.id}`}>Lihat & Tanda Tangani</Link>
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
