"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, Lock, BarChart3, AlertTriangle, CheckCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function Emergency() {
  const [reason, setReason] = useState("")
  const [status, setStatus] = useState<"idle" | "checking" | "approved" | "denied">("idle")

  const handleSubmit = async () => {
    if (!reason.trim()) return

    setStatus("checking")

    // Simulate AI checking
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Simple keyword check (in real implementation, this would use AI)
    const emergencyKeywords = ["急", "緊急", "醫院", "生病", "意外", "重要"]
    const isEmergency = emergencyKeywords.some((keyword) => reason.includes(keyword))

    setStatus(isEmergency ? "approved" : "denied")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-destructive/5">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <header className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-destructive/10 mb-4">
            <AlertCircle className="w-8 h-8 text-destructive" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">緊急解鎖申請</h1>
          <p className="text-muted-foreground text-lg">AI 智慧判斷緊急狀況</p>
        </header>

        {/* Navigation */}
        <div className="flex gap-3 mb-8 justify-center">
          <Button variant="outline" asChild>
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
          <Button variant="default" asChild>
            <Link href="/emergency" className="gap-2">
              <AlertCircle className="w-4 h-4" />
              緊急解鎖
            </Link>
          </Button>
        </div>

        {/* Warning Alert */}
        <Alert className="mb-8 border-2 border-destructive/20 bg-destructive/5">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          <AlertDescription className="text-foreground ml-2">
            此功能僅供真正緊急狀況使用。濫用將被記錄並影響你的成就統計。
          </AlertDescription>
        </Alert>

        {/* Main Form */}
        <Card className="border-2 shadow-lg">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
              <AlertCircle className="w-10 h-10 text-destructive" />
            </div>
            <CardTitle className="text-2xl">說明你的緊急狀況</CardTitle>
            <CardDescription>AI 系統將分析你的原因並決定是否允許提前解鎖</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {status === "idle" || status === "checking" ? (
              <>
                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground">請詳細說明緊急情況 *</label>
                  <Textarea
                    placeholder="例如：家人突然生病需要聯絡醫院..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="min-h-[150px] resize-none"
                    disabled={status === "checking"}
                  />
                  <p className="text-xs text-muted-foreground">系統會使用自然語言處理技術判斷緊急程度</p>
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={!reason.trim() || status === "checking"}
                  className="w-full h-14 text-lg font-semibold"
                  variant="destructive"
                  size="lg"
                >
                  {status === "checking" ? (
                    <>
                      <div className="w-5 h-5 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      AI 分析中...
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-5 h-5 mr-2" />
                      提交緊急解鎖申請
                    </>
                  )}
                </Button>
              </>
            ) : status === "approved" ? (
              <div className="text-center py-8 space-y-6">
                <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="w-12 h-12 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">解鎖已批准</h3>
                  <p className="text-muted-foreground">系統判定為合理的緊急狀況，已為你解鎖</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">此次提前解鎖將被記錄在你的使用歷史中</p>
                </div>
                <Button asChild className="w-full" size="lg">
                  <Link href="/">返回主頁</Link>
                </Button>
              </div>
            ) : (
              <div className="text-center py-8 space-y-6">
                <div className="mx-auto w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center">
                  <AlertCircle className="w-12 h-12 text-destructive" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">解鎖被拒絕</h3>
                  <p className="text-muted-foreground">系統判定不符合緊急狀況標準</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-4 text-left space-y-2">
                  <p className="text-sm font-medium text-foreground">建議：</p>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>確保描述了真正的緊急狀況</li>
                    <li>說明為何需要立即取回手機</li>
                    <li>提供更多具體細節</li>
                  </ul>
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={() => {
                      setStatus("idle")
                      setReason("")
                    }}
                    variant="outline"
                    className="flex-1"
                  >
                    重新申請
                  </Button>
                  <Button asChild className="flex-1">
                    <Link href="/">返回主頁</Link>
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Info Cards */}
        {(status === "idle" || status === "checking") && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <Card className="border-2">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  合理的緊急狀況
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• 醫療緊急事件</li>
                  <li>• 家人突發狀況</li>
                  <li>• 重要工作聯絡</li>
                  <li>• 安全相關問題</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-destructive" />
                  不合理的理由
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• 感到無聊</li>
                  <li>• 想查看社群媒體</li>
                  <li>• 單純想玩遊戲</li>
                  <li>• 沒有具體原因</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
