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
import { TrafficChart } from "@/components/traffic-chart"
import { PetitionCard } from "@/components/petition-card"
import { BarChart, FileText, TrendingUp, Users } from "lucide-react"

// Mock data
const userPetitions = [
  {
    id: '1',
    title: 'Lindungi Taman Lokal Kita dari Pembangunan Kota',
    category: 'Lingkungan',
    signatures: 1250,
    target: 5000,
    image: 'park-image',
    status: 'active',
  },
  {
    id: '4',
    title: 'Bangun Penampungan Hewan Baru Tanpa Eutanasia',
    category: 'Hak-Hak Hewan',
    signatures: 4112,
    target: 10000,
    image: 'animal-shelter-image',
    status: 'active',
  },
  {
    id: '2',
    title: 'Tingkatkan Transportasi Publik di Area Pusat Kota',
    category: 'Pembangunan Kota',
    signatures: 1000,
    target: 1000,
    image: 'bus-image',
    status: 'ended',
  },
];

const recentSignatures = [
    { name: 'Alice Johnson', location: 'San Francisco, USA', comment: 'Ini sangat penting untuk komunitas kita!', signedAt: '15 menit lalu' },
    { name: 'Bob Williams', location: 'London, UK', comment: '', signedAt: '1 jam lalu' },
    { name: 'Charlie Brown', location: 'Sydney, Australia', comment: 'Senang mendukung inisiatif ini.', signedAt: '3 jam lalu' },
    { name: 'Diana Miller', location: 'Toronto, Canada', comment: 'Kita harus melindungi ruang hijau kita.', signedAt: '5 jam lalu' },
];

export default function DashboardPage() {
  const activePetitions = userPetitions.filter(p => p.status === 'active');
  const endedPetitions = userPetitions.filter(p => p.status === 'ended');
  const totalSignatures = userPetitions.reduce((sum, p) => sum + p.signatures, 0);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl md:text-4xl font-bold font-headline">Dasbor Saya</h1>
        <p className="text-muted-foreground">Selamat datang kembali! Berikut adalah gambaran umum dari upaya advokasi Anda.</p>
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
            <div className="text-2xl font-bold truncate">Lindungi Taman Kita</div>
            <p className="text-xs text-muted-foreground">dengan {userPetitions[0].signatures.toLocaleString('id-ID')} tanda tangan</p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rata-rata Progres</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">75%</div>
            <p className="text-xs text-muted-foreground">Rata-rata progres menuju target</p>
          </CardContent>
        </Card>
      </section>

      <section>
        <Tabs defaultValue="active">
          <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
            <TabsTrigger value="active">Petisi Aktif</TabsTrigger>
            <TabsTrigger value="ended">Petisi Berakhir</TabsTrigger>
          </TabsList>
          <TabsContent value="active" className="mt-6">
            {activePetitions.length > 0 ? (
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
            {endedPetitions.length > 0 ? (
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

      <section className="space-y-4">
        <h2 className="text-2xl font-bold font-headline">Analitik Petisi: <span className="text-primary/90">{userPetitions[0].title}</span></h2>
        <div className="grid gap-8 lg:grid-cols-2">
          <SignaturesChart />
          <TrafficChart />
        </div>
      </section>

      <section>
        <Card>
          <CardHeader>
            <CardTitle>Pendukung Terbaru</CardTitle>
            <CardDescription>Tanda tangan terbaru di semua petisi aktif Anda.</CardDescription>
          </CardHeader>
          <CardContent>
             <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pendukung</TableHead>
                  <TableHead className="hidden sm:table-cell">Komentar</TableHead>
                  <TableHead className="text-right">Menandatangani</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentSignatures.map((supporter, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <p className="font-semibold">{supporter.name}</p>
                      <p className="text-sm text-muted-foreground">{supporter.location}</p>
                    </TableCell>
                     <TableCell className="hidden sm:table-cell italic max-w-xs truncate">{supporter.comment || "Tidak ada komentar"}</TableCell>
                    <TableCell className="text-right text-xs text-muted-foreground">{supporter.signedAt}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
