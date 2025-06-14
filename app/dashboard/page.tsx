import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, Award, Clock, DollarSign, Users } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Auctions</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+2 from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Your Bids</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Active on 8 auctions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wins</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">2 pending claims</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,234</div>
            <p className="text-xs text-muted-foreground">+$340 from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="auctions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="auctions">Recent Auctions</TabsTrigger>
          <TabsTrigger value="bids">Your Bids</TabsTrigger>
          <TabsTrigger value="wins">Recent Wins</TabsTrigger>
        </TabsList>
        <TabsContent value="auctions" className="space-y-4">
          <RecentAuctions />
        </TabsContent>
        <TabsContent value="bids" className="space-y-4">
          <YourBids />
        </TabsContent>
        <TabsContent value="wins" className="space-y-4">
          <RecentWins />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function RecentAuctions() {
  const auctions = [
    {
      id: 1,
      title: "iPhone 15 Pro",
      currentBid: "$899",
      endTime: "2h 15m",
      bidders: 24,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      title: "MacBook Air M2",
      currentBid: "$1,199",
      endTime: "4h 30m",
      bidders: 18,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 3,
      title: "PlayStation 5",
      currentBid: "$499",
      endTime: "1h 45m",
      bidders: 32,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 4,
      title: "Apple Watch Series 9",
      currentBid: "$349",
      endTime: "5h 10m",
      bidders: 15,
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {auctions.map((auction) => (
        <Card key={auction.id}>
          <CardContent className="p-4">
            <div className="flex flex-col items-center gap-2">
              <img src={auction.image || "/placeholder.svg"} alt={auction.title} className="h-24 w-24 object-contain" />
              <h3 className="font-medium">{auction.title}</h3>
              <div className="flex w-full justify-between text-sm">
                <span className="text-muted-foreground">Current bid:</span>
                <span className="font-medium">{auction.currentBid}</span>
              </div>
              <div className="flex w-full justify-between text-sm">
                <span className="text-muted-foreground">Ends in:</span>
                <span className="font-medium text-orange-500">{auction.endTime}</span>
              </div>
              <div className="flex w-full justify-between text-sm">
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span className="text-muted-foreground">{auction.bidders} bidders</span>
                </span>
                <a href={`/auctions/${auction.id}`} className="text-primary hover:underline">
                  View
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function YourBids() {
  const bids = [
    {
      id: 1,
      title: "iPhone 15 Pro",
      yourBid: "$850",
      currentBid: "$899",
      status: "outbid",
      endTime: "2h 15m",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      title: "MacBook Air M2",
      yourBid: "$1,199",
      currentBid: "$1,199",
      status: "winning",
      endTime: "4h 30m",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 3,
      title: "PlayStation 5",
      yourBid: "$480",
      currentBid: "$499",
      status: "outbid",
      endTime: "1h 45m",
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {bids.map((bid) => (
        <Card key={bid.id}>
          <CardContent className="p-4">
            <div className="flex gap-4">
              <img src={bid.image || "/placeholder.svg"} alt={bid.title} className="h-16 w-16 object-contain" />
              <div className="flex flex-1 flex-col">
                <h3 className="font-medium">{bid.title}</h3>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Your bid:</span>
                  <span className="font-medium">{bid.yourBid}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Current bid:</span>
                  <span className="font-medium">{bid.currentBid}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Status:</span>
                  <span className={`font-medium ${bid.status === "winning" ? "text-green-500" : "text-red-500"}`}>
                    {bid.status === "winning" ? "Winning" : "Outbid"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Ends in:</span>
                  <span className="font-medium text-orange-500">{bid.endTime}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function RecentWins() {
  const wins = [
    {
      id: 1,
      title: "Samsung Galaxy S23",
      finalBid: "$699",
      status: "Claimed",
      date: "May 15, 2023",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      title: "Nintendo Switch OLED",
      finalBid: "$329",
      status: "Pending Claim",
      date: "May 10, 2023",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 3,
      title: "Bose QuietComfort Earbuds",
      finalBid: "$199",
      status: "Shipped",
      date: "May 5, 2023",
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {wins.map((win) => (
        <Card key={win.id}>
          <CardContent className="p-4">
            <div className="flex gap-4">
              <img src={win.image || "/placeholder.svg"} alt={win.title} className="h-16 w-16 object-contain" />
              <div className="flex flex-1 flex-col">
                <h3 className="font-medium">{win.title}</h3>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Final bid:</span>
                  <span className="font-medium">{win.finalBid}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Status:</span>
                  <span
                    className={`font-medium ${
                      win.status === "Claimed"
                        ? "text-green-500"
                        : win.status === "Shipped"
                          ? "text-blue-500"
                          : "text-orange-500"
                    }`}
                  >
                    {win.status}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Won on:</span>
                  <span className="font-medium">{win.date}</span>
                </div>
                <div className="mt-2 flex justify-end">
                  <a href={`/my-wins/${win.id}`} className="text-primary hover:underline">
                    Details
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
