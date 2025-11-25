
"use client";

import { useMemo } from 'react';
import { notFound, useRouter } from 'next/navigation';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { SignaturesChart } from "@/components/signatures-chart"
import { PetitionCard } from "@/components/petition-card"
import { BarChart, FileText, TrendingUp, Users } from "lucide-react"
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const router = useRouter();

  const petitionsCollectionRef = useMemoFirebase(() => {
    if (!user) return null;
    return collection(firestore, `users/${user.uid}/petitions`);
  }, [firestore, user]);

  const { data: userPetitions, isLoading: isLoadingPetitions } = useCollection(petitionsCollectionRef);

  const activePetitions = useMemo(() => userPetitions?.filter(p => new Date(p.expiryDate) > new Date()) || [], [userPetitions]);
  const endedPetitions = useMemo(() => userPetitions?.filter(p => new Date(p.expiryDate) <= new Date()) || [], [userPetitions]);
  const totalSignatures = useMemo(() => userPetitions?.reduce((sum, p) => sum + (p.signatures || 0), 0) || 0, [userPetitions]);

  if (isUserLoading) {
    return (
        <div className="space-y-8">
            <header className="space-y-2">
                <Skeleton className="h-10 w-1/2" />
                <Skeleton className="h-4 w-3/4" />
            </header>
            <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Skeleton className="h-28" />
                <Skeleton className="h-28" />
                <Skeleton className="h-28" />
                <Skeleton className="h-28" />
            </section>
            <section>
                <Skeleton className="h-10 w-[400px] mb-6" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Skeleton className="h-96" />
                    <Skeleton className="h-96" />
                    <Skeleton className="h-96" />
                </div>
            </section>
        </div>
    );
  }

  if (!user) {
    // Pengguna akan diarahkan dari halaman login, tetapi sebagai fallback
    router.push('/login');
    return null;
  }
  
  const mostPopularPetition = userPetitions?.sort((a, b) => (b.signatures || 0) - (a.signatures || 0))[0];

  return (
    <div className="space-y-8">
       <header className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <Avatar className="h-24 w-24">
            <AvatarImage src={user.photoURL || `https://picsum.photos/seed/${user.uid}/100/100`} data-ai-hint="person face" />
            <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
            <h1 className="text-3xl md:text-4xl font-bold font-headline">Dasbor Saya</h1>
            <p className="text-muted-foreground text-lg">Selamat datang kembali, {user.displayName || user.email}!</p>
            <p className="text-muted-foreground">Berikut adalah gambaran umum dari upaya advokasi Anda.</p>
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tanda Tangan</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSignatures.toLocaleString('id-ID')}</div>
            <p className="text-xs text-muted-foreground">Di semua petisi Anda</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Petisi Aktif</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activePetitions.length}</div>
            <p className="text-xs text-muted-foreground">Sedang mengumpulkan tanda tangan</p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paling Populer</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {mostPopularPetition ? (
                <>
                    <div className="text-2xl font-bold truncate">{mostPopularPetition.title}</div>
                    <p className="text-xs text-muted-foreground">dengan {(mostPopularPetition.signatures || 0).toLocaleString('id-ID')} tanda tangan</p>
                </>
            ) : (
                <div className="text-2xl font-bold">-</div>
            )}
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Petisi</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userPetitions?.length || 0}</div>
            <p className="text-xs text-muted-foreground">Total petisi yang telah Anda buat</p>
          </CardContent>
        </Card>
      </section>

      <section>
         <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold font-headline">Petisi Saya</h2>
            <Button onClick={() => router.push('/petitions/create')}>Buat Petisi Baru</Button>
        </div>
        <Tabs defaultValue="active">
          <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
            <TabsTrigger value="active">Petisi Aktif</TabsTrigger>
            <TabsTrigger value="ended">Petisi Berakhir</TabsTrigger>
          </TabsList>
          <TabsContent value="active" className="mt-6">
            {isLoadingPetitions ? (
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"><Skeleton className="h-96" /><Skeleton className="h-96" /><Skeleton className="h-96" /></div>
            ) : activePetitions.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {activePetitions.map((petition) => (
                        <PetitionCard key={petition.id} petition={petition} />
                    ))}
                </div>
            ) : (
                <p className="text-muted-foreground text-center py-8">Anda tidak memiliki petisi aktif.</p>
            )}
          </TabsContent>
          <TabsContent value="ended" className="mt-6">
            {isLoadingPetitions ? (
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"><Skeleton className="h-96" /><Skeleton className="h-96" /><Skeleton className="h-96" /></div>
            ) : endedPetitions.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {endedPetitions.map((petition) => (
                        <PetitionCard key={petition.id} petition={petition} />
                    ))}
                </div>
             ) : (
                <p className="text-muted-foreground text-center py-8">Anda tidak memiliki petisi yang sudah berakhir.</p>
            )}
          </TabsContent>
        </Tabs>
      </section>

      {mostPopularPetition && (
        <section className="space-y-4">
            <h2 className="text-2xl font-bold font-headline">Analitik Petisi: <span className="text-primary/90">{mostPopularPetition.title}</span></h2>
            <div className="grid gap-8 lg:grid-cols-2">
            <SignaturesChart />
            <TrafficChart />
            </div>
        </section>
      )}

    </div>
  )
}
