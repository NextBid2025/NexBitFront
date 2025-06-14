"use client"

import type React from "react"

import { useState } from "react"
import { Check, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface BidModalProps {
  auctionId: string
  auctionTitle: string
  currentBid: string
  minBidIncrement: string
  onBidPlaced?: (amount: number) => void
}

export function BidModal({ auctionId, auctionTitle, currentBid, minBidIncrement, onBidPlaced }: BidModalProps) {
  const [open, setOpen] = useState(false)
  const [bidAmount, setBidAmount] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const currentBidValue = Number.parseFloat(currentBid.replace(/[^0-9.]/g, ""))
  const minBidValue = currentBidValue + Number.parseFloat(minBidIncrement.replace(/[^0-9.]/g, ""))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)

      // Reset after showing success
      setTimeout(() => {
        if (onBidPlaced) {
          onBidPlaced(Number.parseFloat(bidAmount))
        }
        setOpen(false)
        setIsSuccess(false)
        setBidAmount("")
      }, 1500)
    }, 1500)
  }

  const isValidBid = Number.parseFloat(bidAmount) >= minBidValue

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Place Bid</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Place a Bid</DialogTitle>
          <DialogDescription>
            You are bidding on <strong>{auctionTitle}</strong>
          </DialogDescription>
        </DialogHeader>
        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-4 space-y-2">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-medium text-lg">Bid Placed Successfully!</h3>
            <p className="text-center text-muted-foreground">
              Your bid of ${bidAmount} has been placed. You will be notified if you are outbid.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bid-amount">Bid Amount</Label>
              <Input
                id="bid-amount"
                type="number"
                step="0.01"
                min={minBidValue}
                placeholder={`Min bid: $${minBidValue}`}
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                required
              />
              <p className="text-sm text-muted-foreground">
                Current bid: {currentBid} • Minimum bid: ${minBidValue}
              </p>
              {bidAmount && !isValidBid && <p className="text-sm text-red-500">Bid must be at least ${minBidValue}</p>}
            </div>

            <div className="space-y-2">
              <Label>Payment Method</Label>
              <div className="flex items-center space-x-2 border rounded-md p-2">
                <div className="h-8 w-12 bg-muted rounded" />
                <div>
                  <p className="text-sm font-medium">Visa •••• 4242</p>
                  <p className="text-xs text-muted-foreground">Expires 12/25</p>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button type="submit" disabled={!bidAmount || !isValidBid || isSubmitting} className="w-full">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  `Place Bid ($${bidAmount || "0"})`
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
