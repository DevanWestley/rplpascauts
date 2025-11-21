"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const chartData = [
  { date: "2024-07-01", signatures: 23 },
  { date: "2024-07-02", signatures: 45 },
  { date: "2024-07-03", signatures: 112 },
  { date: "2024-07-04", signatures: 156 },
  { date: "2024-07-05", signatures: 203 },
  { date: "2024-07-06", signatures: 240 },
  { date: "2024-07-07", signatures: 298 },
]

const chartConfig = {
  signatures: {
    label: "Tanda Tangan",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function SignaturesChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tanda Tangan Seiring Waktu</CardTitle>
        <CardDescription>Jumlah tanda tangan harian selama 7 hari terakhir.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
              top: 10,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("id-ID", {
                  month: "short",
                  day: "numeric",
                })
              }
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              width={30}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="signatures"
              type="monotone"
              stroke="var(--color-signatures)"
              strokeWidth={2}
              dot={true}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
