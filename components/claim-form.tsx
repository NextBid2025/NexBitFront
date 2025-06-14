"use client"

import type React from "react"

import { useState } from "react"
import { Check, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

interface ClaimFormProps {
  auctionId: string
  auctionTitle: string
  finalBid: string
  onClaimSubmitted?: () => void
}

export function ClaimForm({ auctionId, auctionTitle, finalBid, onClaimSubmitted }: ClaimFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [shippingMethod, setShippingMethod] = useState("standard")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)

      if (onClaimSubmitted) {
        setTimeout(() => {
          onClaimSubmitted()
        }, 2000)
      }
    }, 1500)
  }

  if (isSuccess) {
    return (
      <Card>
        <CardContent className="pt-6 flex flex-col items-center justify-center py-10 text-center">
          <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <Check className="h-6 w-6 text-green-600" />
          </div>
          <CardTitle className="mb-2">Claim Submitted Successfully!</CardTitle>
          <CardDescription className="mb-6">
            Your claim for "{auctionTitle}" has been submitted. You will receive a confirmation email shortly.
          </CardDescription>
          <p className="text-sm text-muted-foreground">Tracking information will be provided once your item ships.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Claim Your Prize</CardTitle>
        <CardDescription>
          Complete the form below to claim "{auctionTitle}" that you won for {finalBid}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium">Shipping Address</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name">First Name</Label>
                <Input id="first-name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Last Name</Label>
                <Input id="last-name" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Street Address</Label>
              <Input id="address" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State/Province</Label>
                <Input id="state" required />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="postal-code">Postal Code</Label>
                <Input id="postal-code" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input id="country" defaultValue="United States" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" required />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Shipping Method</h3>
            <RadioGroup defaultValue="standard" value={shippingMethod} onValueChange={setShippingMethod}>
              <div className="flex items-center space-x-2 border rounded-md p-3">
                <RadioGroupItem value="standard" id="standard" />
                <Label htmlFor="standard" className="flex-1 cursor-pointer">
                  <div className="font-medium">Standard Shipping</div>
                  <div className="text-sm text-muted-foreground">5-7 business days</div>
                </Label>
                <div className="font-medium">Free</div>
              </div>
              <div className="flex items-center space-x-2 border rounded-md p-3">
                <RadioGroupItem value="express" id="express" />
                <Label htmlFor="express" className="flex-1 cursor-pointer">
                  <div className="font-medium">Express Shipping</div>
                  <div className="text-sm text-muted-foreground">2-3 business days</div>
                </Label>
                <div className="font-medium">$15.00</div>
              </div>
              <div className="flex items-center space-x-2 border rounded-md p-3">
                <RadioGroupItem value="overnight" id="overnight" />
                <Label htmlFor="overnight" className="flex-1 cursor-pointer">
                  <div className="font-medium">Overnight Shipping</div>
                  <div className="text-sm text-muted-foreground">Next business day</div>
                </Label>
                <div className="font-medium">$25.00</div>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Special Instructions (Optional)</Label>
            <Textarea id="notes" placeholder="Add any special delivery instructions here..." />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Submit Claim"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
