import { Clock, Heart, Users } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface AuctionCardProps {
  auction: {
    id: string | number
    title: string
    description: string
    image: string
    currentBid: string
    startingBid: string
    endTime: string
    timeLeft: string
    bidders: number
    progress: number
  }
}

export function AuctionCard({ auction }: AuctionCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-square relative">
        <img src={auction.image || "/placeholder.svg"} alt={auction.title} className="object-cover w-full h-full" />
        <div className="absolute top-2 right-2">
          <Button variant="ghost" size="icon" className="rounded-full bg-background/80 backdrop-blur-sm">
            <Heart className="h-4 w-4" />
            <span className="sr-only">Add to favorites</span>
          </Button>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg truncate">{auction.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 h-10">{auction.description}</p>
        <div className="mt-3 space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Current bid</span>
            <span className="font-medium">{auction.currentBid}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Starting bid</span>
            <span>{auction.startingBid}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-sm text-orange-500 font-medium">{auction.timeLeft} left</span>
            <Progress value={auction.progress} className="h-1.5 ml-auto w-1/3" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Users className="h-3.5 w-3.5" />
          <span>{auction.bidders} bidders</span>
        </div>
        <Button asChild>
          <Link href={`/auctions/${auction.id}`}>Place Bid</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
