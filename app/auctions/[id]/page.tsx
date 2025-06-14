import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Activity,
  AlertCircle,
  ArrowLeft,
  Clock,
  Heart,
  Info,
  Package,
  Share2,
  Shield,
  Truck,
  Users,
} from "lucide-react"

export default function AuctionDetailPage({ params }: { params: { id: string } }) {
  // This would normally be fetched from an API based on the ID
  const auction = {
    id: params.id,
    title: "iPhone 15 Pro Max",
    description:
      "Brand new, sealed in box. 256GB storage, Deep Blue color. Includes original charger, cable, and earphones. 1-year Apple warranty.",
    images: [
      "/placeholder.svg?height=500&width=500",
      "/placeholder.svg?height=500&width=500",
      "/placeholder.svg?height=500&width=500",
      "/placeholder.svg?height=500&width=500",
    ],
    currentBid: "$899",
    startingBid: "$699",
    minBidIncrement: "$10",
    endTime: "June 15, 2023",
    timeLeft: "2h 15m",
    bidders: 24,
    seller: {
      name: "TechStore",
      rating: "4.9",
      sales: 156,
    },
    bids: [
      { user: "user123", amount: "$899", time: "10 minutes ago" },
      { user: "bidmaster", amount: "$889", time: "15 minutes ago" },
      { user: "techbuyer", amount: "$879", time: "20 minutes ago" },
      { user: "gadgetlover", amount: "$869", time: "25 minutes ago" },
      { user: "phonecollector", amount: "$859", time: "30 minutes ago" },
    ],
    details: {
      condition: "New",
      brand: "Apple",
      model: "iPhone 15 Pro Max",
      storage: "256GB",
      color: "Deep Blue",
      warranty: "1 year manufacturer warranty",
    },
    shipping: {
      methods: ["Standard", "Express", "Next Day"],
      cost: "$15",
      estimatedDelivery: "3-5 business days",
    },
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <a href="/auctions">
            <ArrowLeft className="h-4 w-4" />
          </a>
        </Button>
        <h1 className="text-2xl font-bold">{auction.title}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Images */}
        <div className="lg:col-span-2 space-y-4">
          <div className="aspect-square bg-muted rounded-lg overflow-hidden">
            <img
              src={auction.images[0] || "/placeholder.svg"}
              alt={auction.title}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {auction.images.map((image, index) => (
              <div key={index} className="aspect-square bg-muted rounded-lg overflow-hidden cursor-pointer">
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${auction.title} - Image ${index + 1}`}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right column - Auction details */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Current bid</span>
                  <span className="font-semibold text-lg">{auction.currentBid}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Starting bid</span>
                  <span>{auction.startingBid}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Min. increment</span>
                  <span>{auction.minBidIncrement}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-orange-500">
                <Clock className="h-4 w-4" />
                <span className="font-medium">{auction.timeLeft} left</span>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Users className="h-4 w-4" />
                <span>{auction.bidders} bidders</span>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Input type="number" placeholder="Enter bid amount" defaultValue="909" />
                  <Button className="whitespace-nowrap">Place Bid</Button>
                </div>
                <p className="text-xs text-muted-foreground">Enter {auction.currentBid} or more</p>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <Heart className="h-4 w-4 mr-2" />
                  Watch
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Shield className="h-4 w-4 text-green-500" />
                <span>Buyer Protection Guarantee</span>
                <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                  {auction.seller.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium">{auction.seller.name}</p>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <span>⭐ {auction.seller.rating}</span>
                    <span>•</span>
                    <span>{auction.seller.sales} sales</span>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                View Seller Profile
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="bids">Bid History</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
          <TabsTrigger value="questions">Questions</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="mt-4 space-y-4">
          <div className="prose max-w-none">
            <h3 className="text-lg font-medium">Description</h3>
            <p>{auction.description}</p>

            <h3 className="text-lg font-medium mt-6">Item Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(auction.details).map(([key, value]) => (
                <div key={key} className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground capitalize">{key}</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="bids" className="mt-4">
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                {auction.bids.map((bid, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{bid.user}</span>
                      <span className="text-sm text-muted-foreground">{bid.time}</span>
                    </div>
                    <span className="font-medium">{bid.amount}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="shipping" className="mt-4">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-muted-foreground" />
                <h3 className="font-medium">Shipping Information</h3>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Shipping Cost</span>
                  <span>{auction.shipping.cost}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Estimated Delivery</span>
                  <span>{auction.shipping.estimatedDelivery}</span>
                </div>
                <div className="pt-2">
                  <h4 className="font-medium mb-2">Available Shipping Methods</h4>
                  <ul className="space-y-2">
                    {auction.shipping.methods.map((method, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-muted-foreground" />
                        <span>{method}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="questions" className="mt-4">
          <Card>
            <CardContent className="p-6 flex flex-col items-center justify-center py-10 text-center">
              <AlertCircle className="h-10 w-10 text-muted-foreground mb-4" />
              <h3 className="font-medium text-lg">No Questions Yet</h3>
              <p className="text-muted-foreground mb-4">Be the first to ask a question about this item</p>
              <Button>Ask a Question</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
