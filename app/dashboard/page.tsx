import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Lock, AlertCircle, Trophy, Target, Clock, Calendar } from "lucide-react"
import { StatsChart } from "@/components/stats-chart"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <header className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
            <BarChart3 className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">成果儀表板</h1>
          <p className="text-muted-foreground text-lg">追蹤你的專注成就</p>
        </header>

        {/* Navigation */}
        <div className="flex gap-3 mb-8 justify-center">
          <Button variant="outline" asChild>
            <Link href="/" className="gap-2">
              <Lock className="w-4 h-4" />
              鎖定控制
            </Link>
          </Button>
          <Button variant="default" asChild>
            <Link href="/dashboard" className="gap-2">
              <BarChart3 className="w-4 h-4" />
              成果儀表板
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/emergency" className="gap-2">
              <AlertCircle className="w-4 h-4" />
              緊急解鎖
            </Link>
          </Button>
        </div>

        {/* Achievement Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="border-2 bg-gradient-to-br from-card to-primary/5">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-primary" />
                </div>
                <span className="text-2xl">🏆</span>
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">96.5%</div>
              <div className="text-sm text-muted-foreground">成功率</div>
            </CardContent>
          </Card>

          <Card className="border-2 bg-gradient-to-br from-card to-primary/5">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <span className="text-2xl">🎯</span>
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">124</div>
              <div className="text-sm text-muted-foreground">總完成次數</div>
            </CardContent>
          </Card>

          <Card className="border-2 bg-gradient-to-br from-card to-primary/5">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <span className="text-2xl">⏱️</span>
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">86.2</div>
              <div className="text-sm text-muted-foreground">總專注時數</div>
            </CardContent>
          </Card>

          <Card className="border-2 bg-gradient-to-br from-card to-primary/5">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <span className="text-2xl">🔥</span>
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">28</div>
              <div className="text-sm text-muted-foreground">連續使用天數</div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="border-2">
            <CardHeader>
              <CardTitle>每週專注時數</CardTitle>
              <CardDescription>過去 7 天的使用統計</CardDescription>
            </CardHeader>
            <CardContent>
              <StatsChart type="weekly" />
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <CardTitle>每月趨勢</CardTitle>
              <CardDescription>本月專注時長變化</CardDescription>
            </CardHeader>
            <CardContent>
              <StatsChart type="monthly" />
            </CardContent>
          </Card>
        </div>

        {/* Recent Sessions */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle>最近的專注記錄</CardTitle>
            <CardDescription>最新 5 次鎖定任務</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { date: "2025-01-07 14:30", duration: "2小時 15分", status: "completed" },
                { date: "2025-01-07 09:00", duration: "1小時 30分", status: "completed" },
                { date: "2025-01-06 15:45", duration: "3小時 00分", status: "completed" },
                { date: "2025-01-06 10:20", duration: "1小時 45分", status: "completed" },
                { date: "2025-01-05 13:00", duration: "2小時 30分", status: "emergency" },
              ].map((session, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-2 h-2 rounded-full ${session.status === "completed" ? "bg-primary" : "bg-destructive"}`}
                    />
                    <div>
                      <div className="font-medium text-foreground">{session.duration}</div>
                      <div className="text-sm text-muted-foreground">{session.date}</div>
                    </div>
                  </div>
                  <div
                    className={`text-sm font-medium px-3 py-1 rounded-full ${
                      session.status === "completed"
                        ? "bg-primary/10 text-primary"
                        : "bg-destructive/10 text-destructive"
                    }`}
                  >
                    {session.status === "completed" ? "已完成" : "提前解鎖"}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
