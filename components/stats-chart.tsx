"use client"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Line, LineChart } from "recharts"

const weeklyData = [
  { day: "週一", hours: 2.5 },
  { day: "週二", hours: 3.2 },
  { day: "週三", hours: 1.8 },
  { day: "週四", hours: 4.1 },
  { day: "週五", hours: 2.9 },
  { day: "週六", hours: 3.7 },
  { day: "週日", hours: 2.3 },
]

const monthlyData = [
  { day: "1", hours: 2.1 },
  { day: "5", hours: 2.8 },
  { day: "10", hours: 3.5 },
  { day: "15", hours: 3.2 },
  { day: "20", hours: 4.1 },
  { day: "25", hours: 3.8 },
  { day: "30", hours: 3.6 },
]

interface StatsChartProps {
  type: "weekly" | "monthly"
}

export function StatsChart({ type }: StatsChartProps) {
  const data = type === "weekly" ? weeklyData : monthlyData

  if (type === "weekly") {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
          />
          <Bar dataKey="hours" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
          }}
        />
        <Line
          type="monotone"
          dataKey="hours"
          stroke="hsl(var(--primary))"
          strokeWidth={3}
          dot={{ fill: "hsl(var(--primary))", r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
