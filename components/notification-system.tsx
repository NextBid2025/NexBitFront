"use client"

import { useState, useEffect } from "react"
import { Bell, X, Check, AlertTriangle, Info, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface Notification {
  id: string
  type: "bid" | "auction_end" | "payment" | "dispute" | "system"
  title: string
  message: string
  timestamp: Date
  read: boolean
  actionUrl?: string
}

export function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "bid",
      title: "New Bid Placed",
      message: "Someone placed a bid of $1,299 on iPhone 15 Pro Max",
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      read: false,
      actionUrl: "/auctions/1",
    },
    {
      id: "2",
      type: "auction_end",
      title: "Auction Ending Soon",
      message: "MacBook Air M2 auction ends in 15 minutes",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      read: false,
      actionUrl: "/auctions/2",
    },
    {
      id: "3",
      type: "payment",
      title: "Payment Received",
      message: "Payment of $549 received for PlayStation 5",
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
      read: true,
      actionUrl: "/my-wins",
    },
    {
      id: "4",
      type: "dispute",
      title: "Dispute Opened",
      message: "A dispute has been opened for order #1247",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      read: false,
      actionUrl: "/disputes/1247",
    },
  ])

  const [isOpen, setIsOpen] = useState(false)

  // Simular nuevas notificaciones
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        // 30% chance cada 10 segundos
        const newNotification: Notification = {
          id: Date.now().toString(),
          type: ["bid", "auction_end", "payment"][Math.floor(Math.random() * 3)] as any,
          title: "New Activity",
          message: "New activity detected in the system",
          timestamp: new Date(),
          read: false,
        }
        setNotifications((prev) => [newNotification, ...prev.slice(0, 9)])
      }
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "bid":
        return <AlertTriangle className="h-4 w-4 text-blue-500" />
      case "auction_end":
        return <Clock className="h-4 w-4 text-orange-500" />
      case "payment":
        return <Check className="h-4 w-4 text-green-500" />
      case "dispute":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <Info className="h-4 w-4 text-gray-500" />
    }
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              Mark all read
            </Button>
          )}
        </div>
        <ScrollArea className="h-[400px]">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">No notifications</div>
          ) : (
            <div className="space-y-1">
              {notifications.map((notification) => (
                <Card
                  key={notification.id}
                  className={`m-2 cursor-pointer transition-colors ${
                    !notification.read ? "bg-blue-50 border-blue-200" : ""
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-start gap-3">
                      {getNotificationIcon(notification.type)}
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">{notification.title}</p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0"
                            onClick={(e) => {
                              e.stopPropagation()
                              removeNotification(notification.id)
                            }}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">{notification.message}</p>
                        <p className="text-xs text-muted-foreground">{formatTimeAgo(notification.timestamp)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}
