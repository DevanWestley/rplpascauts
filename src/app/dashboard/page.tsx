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
    title: 'Protect Our Local Park from Urban Development',
    category: 'Environment',
    signatures: 1250,
    target: 5000,
    image: 'park-image',
    status: 'active',
  },
  {
    id: '4',
    title: 'Build a New No-Kill Animal Shelter',
    category: 'Animal Rights',
    signatures: 4112,
    target: 10000,
    image: 'animal-shelter-image',
    status: 'active',
  },
  {
    id: '2',
    title: 'Improve Public Transportation in Downtown Area',
    category: 'Urban Development',
    signatures: 1000,
    target: 1000,
    image: 'bus-image',
    status: 'ended',
  },
];

const recentSignatures = [
    { name: 'Alice Johnson', location: 'San Francisco, USA', comment: 'This is crucial for our community!', signedAt: '15 minutes ago' },
    { name: 'Bob Williams', location: 'London, UK', comment: '', signedAt: '1 hour ago' },
    { name: 'Charlie Brown', location: 'Sydney, Australia', comment: 'Happy to support this initiative.', signedAt: '3 hours ago' },
    { name: 'Diana Miller', location: 'Toronto, Canada', comment: 'We must protect our green spaces.', signedAt: '5 hours ago' },
];

export default function DashboardPage() {
  const activePetitions = userPetitions.filter(p => p.status === 'active');
  const endedPetitions = userPetitions.filter(p => p.status === 'ended');
  const totalSignatures = userPetitions.reduce((sum, p) => sum + p.signatures, 0);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl md:text-4xl font-bold font-headline">My Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your advocacy efforts.</p>
      </header>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Signatures</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSignatures.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Across all your petitions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Petitions</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activePetitions.length}</div>
            <p className="text-xs text-muted-foreground">Currently collecting signatures</p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Most Popular</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold truncate">Protect Our Park</div>
            <p className="text-xs text-muted-foreground">with {userPetitions[0].signatures.toLocaleString()} signatures</p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Goal Progress</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">75%</div>
            <p className="text-xs text-muted-foreground">Average progress to target</p>
          </CardContent>
        </Card>
      </section>

      <section>
        <Tabs defaultValue="active">
          <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
            <TabsTrigger value="active">Active Petitions</TabsTrigger>
            <TabsTrigger value="ended">Ended Petitions</TabsTrigger>
          </TabsList>
          <TabsContent value="active" className="mt-6">
            {activePetitions.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {activePetitions.map((petition) => (
                        <PetitionCard key={petition.id} petition={petition} />
                    ))}
                </div>
            ) : (
                <p className="text-muted-foreground text-center py-8">You have no active petitions.</p>
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
                <p className="text-muted-foreground text-center py-8">You have no ended petitions.</p>
            )}
          </TabsContent>
        </Tabs>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold font-headline">Petition Analytics: <span className="text-primary/90">{userPetitions[0].title}</span></h2>
        <div className="grid gap-8 lg:grid-cols-2">
          <SignaturesChart />
          <TrafficChart />
        </div>
      </section>

      <section>
        <Card>
          <CardHeader>
            <CardTitle>Recent Supporters</CardTitle>
            <CardDescription>Latest signatures across all your active petitions.</CardDescription>
          </CardHeader>
          <CardContent>
             <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Supporter</TableHead>
                  <TableHead className="hidden sm:table-cell">Comment</TableHead>
                  <TableHead className="text-right">Signed</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentSignatures.map((supporter, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <p className="font-semibold">{supporter.name}</p>
                      <p className="text-sm text-muted-foreground">{supporter.location}</p>
                    </TableCell>
                     <TableCell className="hidden sm:table-cell italic max-w-xs truncate">{supporter.comment || "No comment provided"}</TableCell>
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
