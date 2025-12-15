"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Lock, Unlock, Timer } from "lucide-react"

export function LockControl() {
  const [hours, setHours] = useState("2")
  const [minutes, setMinutes] = useState("0")
  const [isLocked, setIsLocked] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState<string | null>(null)

  const handleLock = () => {
    setIsLocked(true)
    const totalMinutes = Number.parseInt(hours) * 60 + Number.parseInt(minutes)
    setTimeRemaining(`${hours}:${minutes.padStart(2, "0")}:00`)
    // Here you would trigger the actual lock mechanism
  }

  const handleUnlock = () => {
    setIsLocked(false)
    setTimeRemaining(null)
  }

  return (
    <Card className="border-2 shadow-lg">
      <CardHeader className="text-center pb-4">
        <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          {isLocked ? (
            <Lock className="w-10 h-10 text-primary" />
          ) : (
            <Unlock className="w-10 h-10 text-muted-foreground" />
          )}
        </div>
        <CardTitle className="text-2xl">{isLocked ? "鎖定中" : "設定鎖定時間"}</CardTitle>
        <CardDescription>{isLocked ? "手機已安全鎖定，時間到達前無法開啟" : "設定你想專注的時間長度"}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!isLocked ? (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="hours" className="text-sm font-medium">
                  小時
                </Label>
                <Input
                  id="hours"
                  type="number"
                  min="0"
                  max="24"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  className="text-center text-2xl font-bold h-16"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="minutes" className="text-sm font-medium">
                  分鐘
                </Label>
                <Input
                  id="minutes"
                  type="number"
                  min="0"
                  max="59"
                  value={minutes}
                  onChange={(e) => setMinutes(e.target.value)}
                  className="text-center text-2xl font-bold h-16"
                />
              </div>
            </div>
            <Button onClick={handleLock} className="w-full h-14 text-lg font-semibold" size="lg">
              <Lock className="w-5 h-5 mr-2" />
              開始鎖定
            </Button>
          </>
        ) : (
          <>
            <div className="text-center py-8">
              <div className="inline-flex items-center gap-2 text-muted-foreground mb-4">
                <Timer className="w-5 h-5" />
                <span className="text-sm font-medium">剩餘時間</span>
              </div>
              <div className="text-6xl font-bold text-primary font-mono">{timeRemaining}</div>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground">堅持就是勝利！專注讓你更強大 💪</p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
