import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, SlidersHorizontal, Plus } from "lucide-react"

export default function ProductsPage() {
  // Sample product data
  const products = [
    {
      id: "1",
      name: "iPhone 15 Pro Max",
      description: "Brand new, sealed in box. 256GB storage, Deep Blue color.",
      image: "/placeholder.svg?height=200&width=200",
      category: "Electronics",
      condition: "New",
      quantity: 5,
      status: "Active",
    },
    {
      id: "2",
      name: "MacBook Air M2",
      description: "Latest model with M2 chip, 8GB RAM, 256GB SSD, Space Gray.",
      image: "/placeholder.svg?height=200&width=200",
      category: "Electronics",
      condition: "New",
      quantity: 3,
      status: "Active",
    },
    {
      id: "3",
      name: "PlayStation 5 Digital Edition",
      description: "Brand new PS5 Digital Edition with one DualSense controller.",
      image: "/placeholder.svg?height=200&width=200",
      category: "Gaming",
      condition: "New",
      quantity: 2,
      status: "Active",
    },
    {
      id: "4",
      name: "Apple Watch Series 9",
      description: "GPS model with 45mm case, aluminum case with sport band.",
      image: "/placeholder.svg?height=200&width=200",
      category: "Wearables",
      condition: "New",
      quantity: 8,
      status: "Active",
    },
    {
      id: "5",
      name: "Samsung Galaxy S23 Ultra",
      description: "256GB, Phantom Black, unlocked with S Pen included.",
      image: "/placeholder.svg?height=200&width=200",
      category: "Electronics",
      condition: "New",
      quantity: 4,
      status: "Active",
    },
    {
      id: "6",
      name: 'iPad Pro 12.9" M2',
      description: "Latest iPad Pro with M2 chip, 256GB, Wi-Fi, Space Gray.",
      image: "/placeholder.svg?height=200&width=200",
      category: "Electronics",
      condition: "New",
      quantity: 6,
      status: "Active",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold">Products</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Products</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>
        <div className="mt-4 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search products..." className="w-full pl-8" />
          </div>
          <div className="flex gap-2">
            <Select defaultValue="newest">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="name-asc">Name: A to Z</SelectItem>
                <SelectItem value="name-desc">Name: Z to A</SelectItem>
                <SelectItem value="quantity-high">Quantity: High to Low</SelectItem>
                <SelectItem value="quantity-low">Quantity: Low to High</SelectItem>
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
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg truncate">{product.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 h-10 mt-1">{product.description}</p>
                  <div className="mt-3 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Category</span>
                      <span>{product.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Condition</span>
                      <span>{product.condition}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Quantity</span>
                      <span>{product.quantity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Status</span>
                      <span className="text-green-500 font-medium">{product.status}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" className="flex-1" asChild>
                      <a href={`/products/${product.id}`}>View</a>
                    </Button>
                    <Button variant="outline" className="flex-1" asChild>
                      <a href={`/products/${product.id}/edit`}>Edit</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="active" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products
              .filter((p) => p.status === "Active")
              .map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <div className="aspect-video relative">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg truncate">{product.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 h-10 mt-1">{product.description}</p>
                    <div className="mt-3 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Category</span>
                        <span>{product.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Condition</span>
                        <span>{product.condition}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Quantity</span>
                        <span>{product.quantity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Status</span>
                        <span className="text-green-500 font-medium">{product.status}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button variant="outline" className="flex-1" asChild>
                        <a href={`/products/${product.id}`}>View</a>
                      </Button>
                      <Button variant="outline" className="flex-1" asChild>
                        <a href={`/products/${product.id}/edit`}>Edit</a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
        <TabsContent value="draft" className="mt-6">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
              <SlidersHorizontal className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">No Draft Products</h3>
            <p className="text-muted-foreground max-w-sm mb-4">
              You don't have any products in draft status. Create a new product to get started.
            </p>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="archived" className="mt-6">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
              <SlidersHorizontal className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">No Archived Products</h3>
            <p className="text-muted-foreground max-w-sm mb-4">
              You don't have any archived products. Archived products will appear here.
            </p>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
