import Link from "next/link"
import { LockControl } from "@/components/lock-control"
import { StatusCard } from "@/components/status-card"
import { Lock, BarChart3, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <header className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">智慧戒斷盒</h1>
          <p className="text-muted-foreground text-lg">讓專注成為習慣，遠離手機干擾</p>
        </header>

        {/* Navigation */}
        <div className="flex gap-3 mb-8 justify-center">
          <Button variant="default" asChild>
            <Link href="/" className="gap-2">
              <Lock className="w-4 h-4" />
              鎖定控制
            </Link>
          </Button>
          <Button variant="outline" asChild>
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

        {/* Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <StatusCard title="本週總時數" value="12.5" unit="小時" trend="+23%" />
          <StatusCard title="成功次數" value="18" unit="次" trend="+5" />
          <StatusCard title="平均時長" value="42" unit="分鐘" trend="+8%" />
        </div>

        {/* Main Control */}
        <LockControl />
      </div>
    </div>
  )
}
