"use client"

import { useState } from "react"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"

interface SearchFilters {
  query: string
  category: string[]
  priceRange: [number, number]
  condition: string
  auctionType: string
  timeRemaining: string
  location: string
  seller: string
}

export function AdvancedSearch() {
  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    category: [],
    priceRange: [0, 10000],
    condition: "",
    auctionType: "",
    timeRemaining: "",
    location: "",
    seller: "",
  })

  const [isOpen, setIsOpen] = useState(false)

  const categories = [
    "Electronics",
    "Fashion",
    "Home & Garden",
    "Sports",
    "Automotive",
    "Books",
    "Art & Collectibles",
    "Jewelry",
  ]

  const conditions = [
    { value: "new", label: "New" },
    { value: "like-new", label: "Like New" },
    { value: "good", label: "Good" },
    { value: "fair", label: "Fair" },
    { value: "poor", label: "Poor" },
  ]

  const auctionTypes = [
    { value: "standard", label: "Standard Auction" },
    { value: "buy-now", label: "Buy It Now" },
    { value: "reserve", label: "Reserve Auction" },
    { value: "dutch", label: "Dutch Auction" },
  ]

  const timeOptions = [
    { value: "ending-soon", label: "Ending Soon (< 1 hour)" },
    { value: "today", label: "Ending Today" },
    { value: "week", label: "Ending This Week" },
    { value: "month", label: "Ending This Month" },
  ]

  const handleCategoryChange = (category: string, checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      category: checked ? [...prev.category, category] : prev.category.filter((c) => c !== category),
    }))
  }

  const clearFilters = () => {
    setFilters({
      query: "",
      category: [],
      priceRange: [0, 10000],
      condition: "",
      auctionType: "",
      timeRemaining: "",
      location: "",
      seller: "",
    })
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (filters.query) count++
    if (filters.category.length > 0) count++
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 10000) count++
    if (filters.condition) count++
    if (filters.auctionType) count++
    if (filters.timeRemaining) count++
    if (filters.location) count++
    if (filters.seller) count++
    return count
  }

  const activeFiltersCount = getActiveFiltersCount()

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search auctions, products, sellers..."
            value={filters.query}
            onChange={(e) => setFilters((prev) => ({ ...prev, query: e.target.value }))}
            className="pl-10"
          />
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="relative">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge variant="destructive" className="ml-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[400px] sm:w-[540px]">
            <SheetHeader>
              <SheetTitle>Advanced Filters</SheetTitle>
              <SheetDescription>Refine your search with detailed filters</SheetDescription>
            </SheetHeader>

            <div className="space-y-6 mt-6">
              {/* Categories */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Categories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={category}
                        checked={filters.category.includes(category)}
                        onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                      />
                      <Label htmlFor={category} className="text-sm">
                        {category}
                      </Label>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Price Range */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Price Range</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Slider
                    value={filters.priceRange}
                    onValueChange={(value) =>
                      setFilters((prev) => ({ ...prev, priceRange: value as [number, number] }))
                    }
                    max={10000}
                    step={100}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>${filters.priceRange[0]}</span>
                    <span>${filters.priceRange[1]}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Condition */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Condition</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={filters.condition}
                    onValueChange={(value) => setFilters((prev) => ({ ...prev, condition: value }))}
                  >
                    {conditions.map((condition) => (
                      <div key={condition.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={condition.value} id={condition.value} />
                        <Label htmlFor={condition.value} className="text-sm">
                          {condition.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Auction Type */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Auction Type</CardTitle>
                </CardHeader>
                <CardContent>
                  <Select
                    value={filters.auctionType}
                    onValueChange={(value) => setFilters((prev) => ({ ...prev, auctionType: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select auction type" />
                    </SelectTrigger>
                    <SelectContent>
                      {auctionTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Time Remaining */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Time Remaining</CardTitle>
                </CardHeader>
                <CardContent>
                  <Select
                    value={filters.timeRemaining}
                    onValueChange={(value) => setFilters((prev) => ({ ...prev, timeRemaining: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select time range" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Location */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Location</CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    placeholder="Enter city, state, or country"
                    value={filters.location}
                    onChange={(e) => setFilters((prev) => ({ ...prev, location: e.target.value }))}
                  />
                </CardContent>
              </Card>

              {/* Seller */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Seller</CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    placeholder="Enter seller name or ID"
                    value={filters.seller}
                    onChange={(e) => setFilters((prev) => ({ ...prev, seller: e.target.value }))}
                  />
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4">
                <Button onClick={() => setIsOpen(false)} className="flex-1">
                  Apply Filters
                </Button>
                <Button variant="outline" onClick={clearFilters}>
                  Clear All
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.query && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Search: "{filters.query}"
              <X className="h-3 w-3 cursor-pointer" onClick={() => setFilters((prev) => ({ ...prev, query: "" }))} />
            </Badge>
          )}
          {filters.category.map((cat) => (
            <Badge key={cat} variant="secondary" className="flex items-center gap-1">
              {cat}
              <X className="h-3 w-3 cursor-pointer" onClick={() => handleCategoryChange(cat, false)} />
            </Badge>
          ))}
          {(filters.priceRange[0] > 0 || filters.priceRange[1] < 10000) && (
            <Badge variant="secondary" className="flex items-center gap-1">
              ${filters.priceRange[0]} - ${filters.priceRange[1]}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => setFilters((prev) => ({ ...prev, priceRange: [0, 10000] }))}
              />
            </Badge>
          )}
          {filters.condition && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Condition: {conditions.find((c) => c.value === filters.condition)?.label}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => setFilters((prev) => ({ ...prev, condition: "" }))}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}
