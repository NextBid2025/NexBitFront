"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Clock, Play, Pause, CheckCircle, XCircle, AlertTriangle, ArrowRight, Activity } from "lucide-react"

type AuctionState = "Pending" | "Active" | "Ended" | "Canceled" | "Completed"

interface AuctionStateInfo {
  id: string
  title: string
  currentState: AuctionState
  progress: number
  timeRemaining?: string
  lastEvent: string
  eventHistory: Array<{
    state: AuctionState
    timestamp: Date
    event: string
    details?: string
  }>
}

export function AuctionStateManager() {
  const [auctions, setAuctions] = useState<AuctionStateInfo[]>([
    {
      id: "1",
      title: "iPhone 15 Pro Max",
      currentState: "Active",
      progress: 75,
      timeRemaining: "2h 15m",
      lastEvent: "BidPlaced",
      eventHistory: [
        {
          state: "Pending",
          timestamp: new Date(Date.now() - 3600000),
          event: "AuctionCreated",
          details: "Auction created by seller",
        },
        {
          state: "Active",
          timestamp: new Date(Date.now() - 1800000),
          event: "AuctionStarted",
          details: "Auction went live",
        },
        { state: "Active", timestamp: new Date(Date.now() - 300000), event: "BidPlaced", details: "New bid: $1,299" },
      ],
    },
    {
      id: "2",
      title: "MacBook Air M2",
      currentState: "Ended",
      progress: 100,
      lastEvent: "AuctionEnded",
      eventHistory: [
        { state: "Pending", timestamp: new Date(Date.now() - 7200000), event: "AuctionCreated" },
        { state: "Active", timestamp: new Date(Date.now() - 3600000), event: "AuctionStarted" },
        { state: "Ended", timestamp: new Date(Date.now() - 600000), event: "AuctionEnded", details: "Winner: user123" },
      ],
    },
    {
      id: "3",
      title: "PlayStation 5",
      currentState: "Completed",
      progress: 100,
      lastEvent: "PaymentReceived",
      eventHistory: [
        { state: "Pending", timestamp: new Date(Date.now() - 10800000), event: "AuctionCreated" },
        { state: "Active", timestamp: new Date(Date.now() - 7200000), event: "AuctionStarted" },
        { state: "Ended", timestamp: new Date(Date.now() - 3600000), event: "AuctionEnded" },
        {
          state: "Completed",
          timestamp: new Date(Date.now() - 1800000),
          event: "PaymentReceived",
          details: "Payment confirmed: $549",
        },
      ],
    },
  ])

  const getStateIcon = (state: AuctionState) => {
    switch (state) {
      case "Pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "Active":
        return <Play className="h-4 w-4 text-green-500" />
      case "Ended":
        return <Pause className="h-4 w-4 text-orange-500" />
      case "Canceled":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "Completed":
        return <CheckCircle className="h-4 w-4 text-blue-500" />
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-500" />
    }
  }

  const getStateColor = (state: AuctionState) => {
    switch (state) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Active":
        return "bg-green-100 text-green-800 border-green-200"
      case "Ended":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "Canceled":
        return "bg-red-100 text-red-800 border-red-200"
      case "Completed":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const simulateStateChange = (auctionId: string) => {
    setAuctions((prev) =>
      prev.map((auction) => {
        if (auction.id === auctionId) {
          let newState: AuctionState = auction.currentState
          let newEvent = ""

          switch (auction.currentState) {
            case "Pending":
              newState = "Active"
              newEvent = "AuctionStarted"
              break
            case "Active":
              newState = "Ended"
              newEvent = "AuctionEnded"
              break
            case "Ended":
              newState = "Completed"
              newEvent = "PaymentReceived"
              break
          }

          return {
            ...auction,
            currentState: newState,
            lastEvent: newEvent,
            progress: newState === "Completed" ? 100 : auction.progress + 25,
            eventHistory: [
              ...auction.eventHistory,
              {
                state: newState,
                timestamp: new Date(),
                event: newEvent,
                details: `State changed to ${newState}`,
              },
            ],
          }
        }
        return auction
      }),
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Auction State Management</h2>
          <p className="text-muted-foreground">Monitor auction states and saga workflows</p>
        </div>
        <Badge variant="outline" className="flex items-center gap-2">
          <Activity className="h-3 w-3" />
          MassTransit Sagas
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {auctions.map((auction) => (
          <Card key={auction.id} className="relative">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{auction.title}</CardTitle>
                <div className="flex items-center gap-2">
                  {getStateIcon(auction.currentState)}
                  <Badge className={getStateColor(auction.currentState)}>{auction.currentState}</Badge>
                </div>
              </div>
              <CardDescription>
                Last Event: {auction.lastEvent}
                {auction.timeRemaining && ` • ${auction.timeRemaining} remaining`}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress</span>
                  <span>{auction.progress}%</span>
                </div>
                <Progress value={auction.progress} className="w-full" />
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Event History</h4>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {auction.eventHistory.slice(-3).map((event, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs">
                      {getStateIcon(event.state)}
                      <div className="flex-1">
                        <span className="font-medium">{event.event}</span>
                        {event.details && <p className="text-muted-foreground">{event.details}</p>}
                      </div>
                      <span className="text-muted-foreground">{event.timestamp.toLocaleTimeString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              {auction.currentState !== "Completed" && auction.currentState !== "Canceled" && (
                <Button variant="outline" size="sm" className="w-full" onClick={() => simulateStateChange(auction.id)}>
                  <ArrowRight className="h-3 w-3 mr-2" />
                  Trigger Next State
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* State Flow Diagram */}
      <Card>
        <CardHeader>
          <CardTitle>Auction State Flow</CardTitle>
          <CardDescription>MassTransit Saga state transitions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center space-x-4 p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-yellow-500" />
              <span className="text-sm">Pending</span>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
            <div className="flex items-center space-x-2">
              <Play className="h-4 w-4 text-green-500" />
              <span className="text-sm">Active</span>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
            <div className="flex items-center space-x-2">
              <Pause className="h-4 w-4 text-orange-500" />
              <span className="text-sm">Ended</span>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-blue-500" />
              <span className="text-sm">Completed</span>
            </div>
          </div>
          <div className="text-center mt-4">
            <div className="flex items-center justify-center space-x-2">
              <XCircle className="h-4 w-4 text-red-500" />
              <span className="text-sm text-muted-foreground">Canceled (can occur from Pending or Active states)</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
