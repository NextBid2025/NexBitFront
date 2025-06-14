import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ReportExportButton } from "@/components/report-export-button"
import { BarChart, LineChart, PieChart } from "lucide-react"

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Reports</h1>
          <p className="text-muted-foreground">View and analyze auction data and performance</p>
        </div>
        <ReportExportButton reportName="Auction Report" />
      </div>

      <Tabs defaultValue="auctions" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="auctions">Auctions</TabsTrigger>
          <TabsTrigger value="bids">Bids</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
        </TabsList>

        <TabsContent value="auctions" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Auctions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,248</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
                <div className="mt-4 h-[80px] w-full bg-muted rounded-md" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Auctions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">145</div>
                <p className="text-xs text-muted-foreground">+5% from last week</p>
                <div className="mt-4 h-[80px] w-full bg-muted rounded-md" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed Auctions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,103</div>
                <p className="text-xs text-muted-foreground">+8% from last month</p>
                <div className="mt-4 h-[80px] w-full bg-muted rounded-md" />
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Auction Performance</CardTitle>
                <CardDescription>Monthly auction completion rates</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px] w-full flex items-center justify-center bg-muted/50 rounded-md">
                  <LineChart className="h-16 w-16 text-muted-foreground/70" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Category Distribution</CardTitle>
                <CardDescription>Auctions by category</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px] w-full flex items-center justify-center bg-muted/50 rounded-md">
                  <PieChart className="h-16 w-16 text-muted-foreground/70" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Auctions</CardTitle>
              <CardDescription>Details of the most recent auctions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-5 p-4 font-medium border-b">
                  <div>Auction</div>
                  <div>Category</div>
                  <div>Start Date</div>
                  <div>End Date</div>
                  <div>Status</div>
                </div>
                <div className="divide-y">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="grid grid-cols-5 p-4">
                      <div>iPhone 15 Pro</div>
                      <div>Electronics</div>
                      <div>Jun 10, 2023</div>
                      <div>Jun 15, 2023</div>
                      <div className="font-medium text-green-500">Active</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bids" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Bids</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24,521</div>
                <p className="text-xs text-muted-foreground">+18% from last month</p>
                <div className="mt-4 h-[80px] w-full bg-muted rounded-md" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Bids per Auction</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">19.6</div>
                <p className="text-xs text-muted-foreground">+3% from last month</p>
                <div className="mt-4 h-[80px] w-full bg-muted rounded-md" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Unique Bidders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3,842</div>
                <p className="text-xs text-muted-foreground">+7% from last month</p>
                <div className="mt-4 h-[80px] w-full bg-muted rounded-md" />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Bid Activity</CardTitle>
              <CardDescription>Bid volume over time</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[300px] w-full flex items-center justify-center bg-muted/50 rounded-md">
                <BarChart className="h-16 w-16 text-muted-foreground/70" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Bidders</CardTitle>
              <CardDescription>Users with the most bid activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-4 p-4 font-medium border-b">
                  <div>User</div>
                  <div>Total Bids</div>
                  <div>Auctions Participated</div>
                  <div>Win Rate</div>
                </div>
                <div className="divide-y">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="grid grid-cols-4 p-4">
                      <div>user{i}@example.com</div>
                      <div>{Math.floor(Math.random() * 100) + 50}</div>
                      <div>{Math.floor(Math.random() * 20) + 5}</div>
                      <div>{Math.floor(Math.random() * 30) + 10}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$124,582</div>
                <p className="text-xs text-muted-foreground">+15% from last month</p>
                <div className="mt-4 h-[80px] w-full bg-muted rounded-md" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Sale Price</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$412</div>
                <p className="text-xs text-muted-foreground">+5% from last month</p>
                <div className="mt-4 h-[80px] w-full bg-muted rounded-md" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Payment Success Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">98.2%</div>
                <p className="text-xs text-muted-foreground">+0.5% from last month</p>
                <div className="mt-4 h-[80px] w-full bg-muted rounded-md" />
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Category</CardTitle>
                <CardDescription>Distribution of revenue across categories</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px] w-full flex items-center justify-center bg-muted/50 rounded-md">
                  <PieChart className="h-16 w-16 text-muted-foreground/70" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Monthly Revenue</CardTitle>
                <CardDescription>Revenue trends over the past 12 months</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px] w-full flex items-center justify-center bg-muted/50 rounded-md">
                  <BarChart className="h-16 w-16 text-muted-foreground/70" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Details of the most recent payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-5 p-4 font-medium border-b">
                  <div>Transaction ID</div>
                  <div>User</div>
                  <div>Amount</div>
                  <div>Date</div>
                  <div>Status</div>
                </div>
                <div className="divide-y">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="grid grid-cols-5 p-4">
                      <div>TRX-{Math.floor(Math.random() * 10000)}</div>
                      <div>user{i}@example.com</div>
                      <div>${Math.floor(Math.random() * 1000) + 100}</div>
                      <div>Jun {Math.floor(Math.random() * 30) + 1}, 2023</div>
                      <div className="font-medium text-green-500">Completed</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
