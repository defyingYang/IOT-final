import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"

interface StatusCardProps {
  title: string
  value: string
  unit: string
  trend?: string
}

export function StatusCard({ title, value, unit, trend }: StatusCardProps) {
  const isPositive = trend?.startsWith("+")

  return (
    <Card className="border-2">
      <CardContent className="pt-6">
        <div className="text-sm text-muted-foreground mb-2">{title}</div>
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-3xl font-bold text-foreground">{value}</span>
          <span className="text-sm text-muted-foreground">{unit}</span>
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-sm ${isPositive ? "text-primary" : "text-muted-foreground"}`}>
            {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span className="font-medium">{trend}</span>
            <span className="text-muted-foreground">vs 上週</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
