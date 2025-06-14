"use client"

import type React from "react"

import { useState } from "react"
import { AlertCircle, Bell, Check, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface NotificationBannerProps {
  title: string
  description: string
  variant?: "default" | "success" | "warning" | "error"
  icon?: React.ReactNode
  action?: {
    label: string
    onClick: () => void
  }
  onDismiss?: () => void
}

export function NotificationBanner({
  title,
  description,
  variant = "default",
  icon,
  action,
  onDismiss,
}: NotificationBannerProps) {
  const [isVisible, setIsVisible] = useState(true)

  const handleDismiss = () => {
    setIsVisible(false)
    if (onDismiss) {
      onDismiss()
    }
  }

  if (!isVisible) {
    return null
  }

  const getVariantStyles = () => {
    switch (variant) {
      case "success":
        return "border-green-500 bg-green-50 dark:bg-green-950/50"
      case "warning":
        return "border-yellow-500 bg-yellow-50 dark:bg-yellow-950/50"
      case "error":
        return "border-red-500 bg-red-50 dark:bg-red-950/50"
      default:
        return "border-blue-500 bg-blue-50 dark:bg-blue-950/50"
    }
  }

  const getIcon = () => {
    if (icon) return icon

    switch (variant) {
      case "success":
        return <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
      default:
        return <Bell className="h-5 w-5 text-blue-600 dark:text-blue-400" />
    }
  }

  return (
    <Alert className={`${getVariantStyles()} border-l-4`}>
      <div className="flex items-start gap-4">
        <div className="mt-0.5">{getIcon()}</div>
        <div className="flex-1">
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription>{description}</AlertDescription>
          {action && (
            <Button variant="link" className="mt-2 h-auto p-0 text-sm" onClick={action.onClick}>
              {action.label}
            </Button>
          )}
        </div>
        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleDismiss}>
          <X className="h-4 w-4" />
          <span className="sr-only">Dismiss</span>
        </Button>
      </div>
    </Alert>
  )
}
