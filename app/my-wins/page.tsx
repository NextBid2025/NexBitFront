import Link from "next/link"
import { Award, Check, Clock, Truck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function MyWinsPage() {
  const pendingWins = [
    {
      id: "1",
      title: "Nintendo Switch OLED",
      image: "/placeholder.svg?height=200&width=200",
      finalBid: "$329",
      wonDate: "May 10, 2023",
      status: "Pending Claim",
      expiresIn: "3 days",
    },
    {
      id: "2",
      title: "Bose QuietComfort Earbuds",
      image: "/placeholder.svg?height=200&width=200",
      finalBid: "$199",
      wonDate: "May 12, 2023",
      status: "Pending Claim",
      expiresIn: "5 days",
    },
  ]

  const shippedWins = [
    {
      id: "3",
      title: "Samsung Galaxy S23",
      image: "/placeholder.svg?height=200&width=200",
      finalBid: "$699",
      wonDate: "May 5, 2023",
      status: "Shipped",
      trackingNumber: "1Z999AA10123456784",
      estimatedDelivery: "May 18, 2023",
    },
    {
      id: "4",
      title: "Sony WH-1000XM5 Headphones",
      image: "/placeholder.svg?height=200&width=200",
      finalBid: "$299",
      wonDate: "May 3, 2023",
      status: "Shipped",
      trackingNumber: "1Z999AA10123456785",
      estimatedDelivery: "May 16, 2023",
    },
  ]

  const deliveredWins = [
    {
      id: "5",
      title: "iPad Air 5th Generation",
      image: "/placeholder.svg?height=200&width=200",
      finalBid: "$549",
      wonDate: "April 25, 2023",
      status: "Delivered",
      deliveredDate: "May 2, 2023",
    },
    {
      id: "6",
      title: "DJI Mini 3 Pro Drone",
      image: "/placeholder.svg?height=200&width=200",
      finalBid: "$749",
      wonDate: "April 20, 2023",
      status: "Delivered",
      deliveredDate: "April 28, 2023",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Wins</h1>
        <Button asChild variant="outline">
          <Link href="/auctions">Browse More Auctions</Link>
        </Button>
      </div>

      <div className="flex items-center justify-between bg-muted/50 p-4 rounded-lg">
        <div className="flex items-center gap-3">
          <Award className="h-8 w-8 text-amber-500" />
          <div>
            <h2 className="font-medium">You've won 6 auctions!</h2>
            <p className="text-sm text-muted-foreground">Total value: $2,924</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending">Pending Claims ({pendingWins.length})</TabsTrigger>
          <TabsTrigger value="shipped">Shipped ({shippedWins.length})</TabsTrigger>
          <TabsTrigger value="delivered">Delivered ({deliveredWins.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-6 space-y-6">
          {pendingWins.map((win) => (
            <Card key={win.id}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 bg-muted rounded-md overflow-hidden">
                      <img
                        src={win.image || "/placeholder.svg"}
                        alt={win.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-xl font-medium">{win.title}</h3>
                      <div className="flex flex-wrap gap-x-4 gap-y-2 mt-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Award className="h-4 w-4 text-muted-foreground" />
                          <span>Won for {win.finalBid}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>Won on {win.wonDate}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-orange-500">
                      <Clock className="h-4 w-4" />
                      <span className="font-medium">Claim expires in {win.expiresIn}</span>
                    </div>

                    <div className="pt-2">
                      <Button asChild>
                        <Link href={`/my-wins/${win.id}/claim`}>Claim Now</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="shipped" className="mt-6 space-y-6">
          {shippedWins.map((win) => (
            <Card key={win.id}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 bg-muted rounded-md overflow-hidden">
                      <img
                        src={win.image || "/placeholder.svg"}
                        alt={win.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-xl font-medium">{win.title}</h3>
                      <div className="flex flex-wrap gap-x-4 gap-y-2 mt-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Award className="h-4 w-4 text-muted-foreground" />
                          <span>Won for {win.finalBid}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>Won on {win.wonDate}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-blue-500">
                      <Truck className="h-4 w-4" />
                      <span className="font-medium">Shipped • Arriving {win.estimatedDelivery}</span>
                    </div>

                    <div className="bg-muted/50 p-3 rounded-md">
                      <div className="flex flex-col gap-1">
                        <div className="text-sm font-medium">Tracking Information</div>
                        <div className="text-sm">{win.trackingNumber}</div>
                        <div className="flex justify-between mt-1">
                          <Button variant="link" className="h-auto p-0 text-sm">
                            Track Package
                          </Button>
                          <Button variant="link" className="h-auto p-0 text-sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="delivered" className="mt-6 space-y-6">
          {deliveredWins.map((win) => (
            <Card key={win.id}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 bg-muted rounded-md overflow-hidden">
                      <img
                        src={win.image || "/placeholder.svg"}
                        alt={win.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-xl font-medium">{win.title}</h3>
                      <div className="flex flex-wrap gap-x-4 gap-y-2 mt-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Award className="h-4 w-4 text-muted-foreground" />
                          <span>Won for {win.finalBid}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>Won on {win.wonDate}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-green-500">
                      <Check className="h-4 w-4" />
                      <span className="font-medium">Delivered on {win.deliveredDate}</span>
                    </div>

                    <div className="pt-2 flex flex-wrap gap-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        Leave Review
                      </Button>
                      <Button variant="outline" size="sm">
                        Report Issue
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
