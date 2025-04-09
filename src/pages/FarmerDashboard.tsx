import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"
import { Calendar as CalendarIcon } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { DayPicker } from "react-day-picker"
import { useToast } from "@/components/ui/use-toast"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Circle } from 'lucide-react';
import { DoughnutChart } from "@/components/DoughnutChart"
import { BarChart } from "@/components/BarChart"

const FarmerDashboard = () => {
  const { toast } = useToast()
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0
        }
        const diff = Math.random() * 10
        return Math.min(oldProgress + diff, 100)
      })
    }, 500)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <div className="container mx-auto py-10">
          <h1 className="text-3xl font-bold mb-5">Farmer Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Calendar Card */}
            <Card className="bg-white shadow-md rounded-lg overflow-hidden">
              <CardHeader className="p-4">
                <CardTitle className="text-lg font-semibold">Today</CardTitle>
                <CardDescription>Check your schedule for today.</CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="center">
                    <DayPicker
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(date) =>
                        date > new Date() || date < new Date("2022-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </CardContent>
              <CardFooter className="p-4">
                <Button className="w-full">View Full Calendar</Button>
              </CardFooter>
            </Card>

            {/* Quick Actions Card */}
            <Card className="bg-white shadow-md rounded-lg overflow-hidden">
              <CardHeader className="p-4">
                <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
                <CardDescription>Manage your farm efficiently.</CardDescription>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                <Button className="w-full">Add New Product</Button>
                <Button className="w-full">View Sales Report</Button>
                <Button className="w-full">Manage Inventory</Button>
              </CardContent>
            </Card>

            {/* Weather Card */}
            <Card className="bg-white shadow-md rounded-lg overflow-hidden">
              <CardHeader className="p-4">
                <CardTitle className="text-lg font-semibold">Weather Forecast</CardTitle>
                <CardDescription>Stay updated with the weather.</CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <p><strong>Today:</strong> Sunny, 25°C</p>
                <p><strong>Tomorrow:</strong> Cloudy, 22°C</p>
                <p><strong>Next 7 Days:</strong> Mostly sunny</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Sales Overview Card */}
            <Card className="bg-white shadow-md rounded-lg overflow-hidden">
              <CardHeader className="p-4">
                <CardTitle className="text-lg font-semibold">Sales Overview</CardTitle>
                <CardDescription>Track your sales performance.</CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <BarChart />
              </CardContent>
            </Card>

            {/* Inventory Status Card */}
            <Card className="bg-white shadow-md rounded-lg overflow-hidden">
              <CardHeader className="p-4">
                <CardTitle className="text-lg font-semibold">Inventory Status</CardTitle>
                <CardDescription>Monitor your stock levels.</CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <span>Tomatoes</span>
                  <Badge variant="secondary">Low Stock</Badge>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span>Cucumbers</span>
                  <Badge variant="outline">In Stock</Badge>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span>Bell Peppers</span>
                  <Badge variant="destructive">Out of Stock</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Add Product Form */}
          <Card className="bg-white shadow-md rounded-lg overflow-hidden mt-6">
            <CardHeader className="p-4">
              <CardTitle className="text-lg font-semibold">Add New Product</CardTitle>
              <CardDescription>List a new product for sale.</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input type="text" id="name" placeholder="Product Name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Product Description" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vegetables">Vegetables</SelectItem>
                      <SelectItem value="fruits">Fruits</SelectItem>
                      <SelectItem value="dairy">Dairy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="price">Price</Label>
                  <Input type="number" id="price" placeholder="Price" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4">
              <Button className="w-full">Add Product</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FarmerDashboard;
