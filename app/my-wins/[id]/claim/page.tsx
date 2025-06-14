import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ClaimForm } from "@/components/claim-form"

export default function ClaimPrizePage({ params }: { params: { id: string } }) {
  // This would normally be fetched from an API based on the ID
  const win = {
    id: params.id,
    title: "Nintendo Switch OLED",
    image: "/placeholder.svg?height=200&width=200",
    finalBid: "$329",
    wonDate: "May 10, 2023",
    status: "Pending Claim",
    expiresIn: "3 days",
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/my-wins">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Claim Your Prize</h1>
      </div>

      <ClaimForm auctionId={params.id} auctionTitle={win.title} finalBid={win.finalBid} />
    </div>
  )
}
