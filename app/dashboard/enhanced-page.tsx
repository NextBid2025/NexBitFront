"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Users, Gavel, DollarSign, Clock, AlertCircle, CheckCircle, Activity, Bell } from "lucide-react"

export default function EnhancedDashboard() {
  const [realTimeData, setRealTimeData] = useState({
    activeAuctions: 45,
    totalBids: 1247,
    revenue: 89750,
    activeUsers: 234,
    pendingPayments: 12,
    disputes: 3,
  })

  // Simular actualizaciones en tiempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData((prev) => ({
        ...prev,
        totalBids: prev.totalBids + Math.floor(Math.random() * 3),
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 5) - 2,
        revenue: prev.revenue + Math.floor(Math.random() * 500),
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const recentAuctions = [
    { id: 1, title: "iPhone 15 Pro Max", currentBid: "$1,299", timeLeft: "2h 15m", status: "active", bidders: 24 },
    { id: 2, title: "MacBook Air M2", currentBid: "$999", timeLeft: "45m", status: "ending-soon", bidders: 18 },
    { id: 3, title: "PlayStation 5", currentBid: "$549", timeLeft: "1d 3h", status: "active", bidders: 31 },
    { id: 4, title: "Apple Watch Series 9", currentBid: "$399", timeLeft: "3h 22m", status: "active", bidders: 15 },
  ]

  const alerts = [
    { type: "warning", message: "3 auctions ending in less than 1 hour", time: "2 min ago" },
    { type: "info", message: "New high-value bidder registered", time: "5 min ago" },
    { type: "error", message: "Payment dispute reported for Auction #1247", time: "10 min ago" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Enhanced Dashboard</h1>
          <p className="text-muted-foreground">Real-time auction platform overview</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="animate-pulse">
            <Activity className="h-3 w-3 mr-1" />
            Live
          </Badge>
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4 mr-2" />
            Alerts ({alerts.length})
          </Button>
        </div>
      </div>

      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Auctions</CardTitle>
            <Gavel className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{realTimeData.activeAuctions}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +12% from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bids Today</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{realTimeData.totalBids.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +8% from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue Today</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${realTimeData.revenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +15% from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{realTimeData.activeUsers}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +5% from yesterday
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="auctions" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="auctions">Live Auctions</TabsTrigger>
          <TabsTrigger value="alerts">System Alerts</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="auctions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Auctions</CardTitle>
              <CardDescription>Real-time auction monitoring</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAuctions.map((auction) => (
                  <div key={auction.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 bg-muted rounded-lg" />
                      <div>
                        <h4 className="font-medium">{auction.title}</h4>
                        <p className="text-sm text-muted-foreground">{auction.bidders} bidders</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">{auction.currentBid}</p>
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3" />
                        <span className="text-sm">{auction.timeLeft}</span>
                        <Badge
                          variant={auction.status === "ending-soon" ? "destructive" : "default"}
                          className="text-xs"
                        >
                          {auction.status === "ending-soon" ? "Ending Soon" : "Active"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Alerts</CardTitle>
              <CardDescription>Important notifications and warnings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map((alert, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                    {alert.type === "warning" && <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />}
                    {alert.type === "info" && <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5" />}
                    {alert.type === "error" && <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />}
                    <div className="flex-1">
                      <p className="text-sm">{alert.message}</p>
                      <p className="text-xs text-muted-foreground">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Pending Payments</CardTitle>
                <CardDescription>{realTimeData.pendingPayments} payments awaiting processing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Payment Success Rate</span>
                    <span className="font-medium">98.5%</span>
                  </div>
                  <Progress value={98.5} className="w-full" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Average Processing Time</span>
                    <span>2.3 minutes</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Disputes</CardTitle>
                <CardDescription>{realTimeData.disputes} active disputes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Resolution Rate</span>
                    <span className="font-medium">94.2%</span>
                  </div>
                  <Progress value={94.2} className="w-full" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Average Resolution Time</span>
                    <span>24 hours</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Auction Performance</CardTitle>
                <CardDescription>Last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center bg-muted/50 rounded-md">
                  <p className="text-muted-foreground">Performance Chart Placeholder</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Activity</CardTitle>
                <CardDescription>Real-time user engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center bg-muted/50 rounded-md">
                  <p className="text-muted-foreground">Activity Chart Placeholder</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
