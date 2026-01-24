"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "./chart"

const chartData = [
  { month: "Jan", questions: 186 },
  { month: "Fév", questions: 305 },
  { month: "Mar", questions: 237 },
  { month: "Avr", questions: 173 },
  { month: "Mai", questions: 409 },
  { month: "Juin", questions: 214 },
]

const chartConfig = {
  questions: {
    label: "Questions",
    color: "#3B82F6",
  },
} satisfies ChartConfig

export function ProgressionChart() {
  return (
    <ChartContainer config={chartConfig} className="h-full w-full min-h-[120px]">
      <AreaChart
        accessibilityLayer
        data={chartData}
        margin={{
          top: 10,
          right: 12,
          left: -20,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tick={{ fontSize: 11, fill: "#9ca3af" }}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tick={{ fontSize: 11, fill: "#9ca3af" }}
          width={40}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <defs>
          <linearGradient id="fillQuestions" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <Area
          dataKey="questions"
          type="monotone"
          fill="url(#fillQuestions)"
          stroke="#3B82F6"
          strokeWidth={2.5}
          dot={{
            fill: "#3B82F6",
            strokeWidth: 2,
            r: 4,
            stroke: "#fff",
          }}
          activeDot={{
            r: 6,
            stroke: "#3B82F6",
            strokeWidth: 2,
            fill: "#fff",
          }}
        />
      </AreaChart>
    </ChartContainer>
  )
}
