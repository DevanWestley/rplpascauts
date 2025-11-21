"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const chartData = [
  { source: "Facebook", visitors: 275 },
  { source: "Twitter/X", visitors: 187 },
  { source: "Tautan Langsung", visitors: 155 },
  { source: "Google", visitors: 123 },
  { source: "Lainnya", visitors: 90 },
]

const chartConfig = {
  visitors: {
    label: "Pengunjung",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function TrafficChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sumber Lalu Lintas</CardTitle>
        <CardDescription>Dari mana pendukung Anda berasal.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 10,
              top: 10,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="source"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 12)}
              width={80}
            />
            <XAxis type="number" dataKey="visitors" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="visitors" fill="var(--color-visitors)" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
