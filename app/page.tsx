import Link from "next/link"
import { ArrowRight, Award, CheckCircle, Clock, Shield, Sparkles, Truck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function HomePage() {
  const featuredAuctions = [
    {
      id: "1",
      title: "iPhone 15 Pro Max",
      image: "/placeholder.svg?height=300&width=300",
      currentBid: "$899",
      timeLeft: "2h 15m",
    },
    {
      id: "2",
      title: "MacBook Air M2",
      image: "/placeholder.svg?height=300&width=300",
      currentBid: "$1,199",
      timeLeft: "4h 30m",
    },
    {
      id: "3",
      title: "PlayStation 5",
      image: "/placeholder.svg?height=300&width=300",
      currentBid: "$499",
      timeLeft: "1h 45m",
    },
    {
      id: "4",
      title: "Apple Watch Series 9",
      image: "/placeholder.svg?height=300&width=300",
      currentBid: "$349",
      timeLeft: "5h 10m",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-background border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6" />
            <span className="text-lg font-bold">AuctionHub</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/auctions" className="text-sm font-medium">
              Auctions
            </Link>
            <Link href="/how-it-works" className="text-sm font-medium">
              How It Works
            </Link>
            <Link href="/about" className="text-sm font-medium">
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link href="/login">Log In</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Bid, Win, and Claim Amazing Prizes
                </h1>
                <p className="text-muted-foreground md:text-xl">
                  Join thousands of bidders on our secure auction platform. Find great deals on electronics,
                  collectibles, and more.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" asChild>
                    <Link href="/auctions">Browse Auctions</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/register">Create Account</Link>
                  </Button>
                </div>
              </div>
              <div className="mx-auto lg:ml-auto">
                <div className="aspect-video overflow-hidden rounded-xl bg-muted">
                  <img
                    alt="Hero Image"
                    className="object-cover w-full h-full"
                    src="/placeholder.svg?height=500&width=800"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Auctions */}
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter">Featured Auctions</h2>
                <p className="text-muted-foreground">Don't miss these hot items ending soon</p>
              </div>
              <Button variant="outline" asChild>
                <Link href="/auctions" className="flex items-center gap-1">
                  View All
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredAuctions.map((auction) => (
                <Card key={auction.id} className="overflow-hidden">
                  <div className="aspect-square relative">
                    <img
                      src={auction.image || "/placeholder.svg"}
                      alt={auction.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold truncate">{auction.title}</h3>
                    <div className="flex justify-between items-center mt-2">
                      <div className="font-medium">{auction.currentBid}</div>
                      <div className="flex items-center text-orange-500 text-sm">
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        {auction.timeLeft}
                      </div>
                    </div>
                    <Button className="w-full mt-3" asChild>
                      <Link href={`/auctions/${auction.id}`}>Bid Now</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tighter">How It Works</h2>
              <p className="text-muted-foreground mt-2 md:text-lg">Simple steps to start bidding and winning</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Register</h3>
                <p className="text-muted-foreground">
                  Create an account and add your payment method to start bidding on auctions.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Bid & Win</h3>
                <p className="text-muted-foreground">
                  Place bids on items you want. If you're the highest bidder when the auction ends, you win!
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Truck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Claim & Receive</h3>
                <p className="text-muted-foreground">
                  Claim your prize, provide shipping details, and receive your item at your doorstep.
                </p>
              </div>
            </div>
            <div className="flex justify-center mt-10">
              <Button size="lg" asChild>
                <Link href="/register">Get Started Now</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Trust & Security */}
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tighter">Trust & Security</h2>
              <p className="text-muted-foreground mt-2 md:text-lg">We prioritize your safety and satisfaction</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6 flex gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Buyer Protection</h3>
                    <p className="text-muted-foreground">
                      Our Buyer Protection program covers every purchase, ensuring you receive exactly what you bid on
                      or your money back.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Verified Sellers</h3>
                    <p className="text-muted-foreground">
                      We verify all sellers on our platform to ensure authenticity and quality of items being auctioned.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter mb-4">Ready to Start Bidding?</h2>
            <p className="text-primary-foreground/80 mb-6 max-w-2xl mx-auto md:text-lg">
              Join thousands of satisfied users who find amazing deals every day on our platform.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/register">Create Your Free Account</Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t py-6 md:py-0">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-6 w-6" />
                <span className="text-lg font-bold">AuctionHub</span>
              </div>
              <p className="text-sm text-muted-foreground">
                The premier online auction platform for electronics, collectibles, and more.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/auctions" className="text-muted-foreground hover:text-foreground">
                    Auctions
                  </Link>
                </li>
                <li>
                  <Link href="/how-it-works" className="text-muted-foreground hover:text-foreground">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-foreground">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-3">Support</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/faq" className="text-muted-foreground hover:text-foreground">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="text-muted-foreground hover:text-foreground">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-3">Connect</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-muted-foreground">© 2023 AuctionHub. All rights reserved.</p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <Link href="/terms" className="text-xs text-muted-foreground hover:text-foreground">
                Terms
              </Link>
              <Link href="/privacy" className="text-xs text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
              <Link href="/cookies" className="text-xs text-muted-foreground hover:text-foreground">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
