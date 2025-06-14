import { AuctionCard } from "@/components/auction-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, SlidersHorizontal } from "lucide-react"

export default function AuctionsPage() {
  // Sample auction data
  const auctions = [
    {
      id: "1",
      title: "iPhone 15 Pro Max",
      description: "Brand new, sealed in box. 256GB storage, Deep Blue color.",
      image: "/placeholder.svg?height=300&width=300",
      currentBid: "$899",
      startingBid: "$699",
      endTime: "June 15, 2023",
      timeLeft: "2h 15m",
      bidders: 24,
      progress: 80,
    },
    {
      id: "2",
      title: "MacBook Air M2",
      description: "Latest model with M2 chip, 8GB RAM, 256GB SSD, Space Gray.",
      image: "/placeholder.svg?height=300&width=300",
      currentBid: "$1,199",
      startingBid: "$999",
      endTime: "June 16, 2023",
      timeLeft: "4h 30m",
      bidders: 18,
      progress: 65,
    },
    {
      id: "3",
      title: "PlayStation 5 Digital Edition",
      description: "Brand new PS5 Digital Edition with one DualSense controller.",
      image: "/placeholder.svg?height=300&width=300",
      currentBid: "$499",
      startingBid: "$399",
      endTime: "June 14, 2023",
      timeLeft: "1h 45m",
      bidders: 32,
      progress: 90,
    },
    {
      id: "4",
      title: "Apple Watch Series 9",
      description: "GPS model with 45mm case, aluminum case with sport band.",
      image: "/placeholder.svg?height=300&width=300",
      currentBid: "$349",
      startingBid: "$299",
      endTime: "June 17, 2023",
      timeLeft: "5h 10m",
      bidders: 15,
      progress: 50,
    },
    {
      id: "5",
      title: "Samsung Galaxy S23 Ultra",
      description: "256GB, Phantom Black, unlocked with S Pen included.",
      image: "/placeholder.svg?height=300&width=300",
      currentBid: "$899",
      startingBid: "$799",
      endTime: "June 15, 2023",
      timeLeft: "3h 20m",
      bidders: 22,
      progress: 75,
    },
    {
      id: "6",
      title: 'iPad Pro 12.9" M2',
      description: "Latest iPad Pro with M2 chip, 256GB, Wi-Fi, Space Gray.",
      image: "/placeholder.svg?height=300&width=300",
      currentBid: "$1,099",
      startingBid: "$999",
      endTime: "June 16, 2023",
      timeLeft: "6h 15m",
      bidders: 19,
      progress: 40,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold">Auctions</h1>
        <Button>Create Auction</Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="ending-soon">Ending Soon</TabsTrigger>
          <TabsTrigger value="new">New</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
        </TabsList>
        <div className="mt-4 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search auctions..." className="w-full pl-8" />
          </div>
          <div className="flex gap-2">
            <Select defaultValue="newest">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="ending-soon">Ending Soon</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
          </div>
        </div>
        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {auctions.map((auction) => (
              <AuctionCard key={auction.id} auction={auction} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="ending-soon" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {auctions
              .filter((a) => Number.parseInt(a.timeLeft.split("h")[0]) < 3)
              .map((auction) => (
                <AuctionCard key={auction.id} auction={auction} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="new" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {auctions.slice(0, 3).map((auction) => (
              <AuctionCard key={auction.id} auction={auction} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="popular" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {auctions
              .sort((a, b) => b.bidders - a.bidders)
              .map((auction) => (
                <AuctionCard key={auction.id} auction={auction} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
