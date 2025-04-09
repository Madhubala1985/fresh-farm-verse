import React from 'react';
import { CalendarDays, Card, CheckCheck, ChevronDown, FileText, LayoutDashboard, ListChecks, LucideIcon, Settings } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface ListItemProps {
  icon: LucideIcon;
  label: string;
  description?: string;
}

const ListItem: React.FC<ListItemProps> = ({ icon: Icon, label, description }) => {
  return (
    <div className="grid gap-1">
      <div className="font-semibold">{label}</div>
      {description && (
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
};

const UserProfile = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <div className="container relative pb-6">
          <div className="mx-auto w-full max-w-screen-xl space-y-8 p-4 md:p-8 lg:p-12">
            <Card className="w-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-2xl font-semibold">My Account</CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="ml-auto h-8 w-32">
                      Actions
                      <ChevronDown className="ml-2.5 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <FileText className="mr-2 h-4 w-4" />
                      <span>View invoices</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="/avatars/01.png" alt="Image" />
                      <AvatarFallback>AK</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">Aron Kennedy</p>
                      <p className="text-sm text-muted-foreground">aron.kennedy@example.com</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-lg font-medium tracking-tight">Profile Information</h2>
                    <p className="text-sm text-muted-foreground">
                      Here you can update your profile information.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" defaultValue="Aron Kennedy" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="aron.kennedy@example.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea id="bio" defaultValue="I'm a software engineer based in New York City." />
                  </div>
                  <Button>Update Profile</Button>
                </div>
              </CardContent>
            </Card>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="col-span-1 lg:col-span-2">
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>Here are your most recent orders.</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[300px] w-full overflow-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">Invoice</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">INV20231009</TableCell>
                          <TableCell>
                            <Badge variant="secondary">Shipped</Badge>
                          </TableCell>
                          <TableCell>October 9, 2023</TableCell>
                          <TableCell className="text-right">$199.00</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">INV20231002</TableCell>
                          <TableCell>
                            <Badge variant="secondary">Processing</Badge>
                          </TableCell>
                          <TableCell>October 2, 2023</TableCell>
                          <TableCell className="text-right">$250.00</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">INV20230925</TableCell>
                          <TableCell>
                            <Badge variant="secondary">Shipped</Badge>
                          </TableCell>
                          <TableCell>September 25, 2023</TableCell>
                          <TableCell className="text-right">$99.00</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">INV20230918</TableCell>
                          <TableCell>
                            <Badge variant="secondary">Delivered</Badge>
                          </TableCell>
                          <TableCell>September 18, 2023</TableCell>
                          <TableCell className="text-right">$120.00</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">INV20230911</TableCell>
                          <TableCell>
                            <Badge variant="secondary">Shipped</Badge>
                          </TableCell>
                          <TableCell>September 11, 2023</TableCell>
                          <TableCell className="text-right">$350.00</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </CardContent>
              </Card>
              <Card className="col-span-1 lg:col-span-1">
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                  <CardDescription>Your account overview</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <ListItem
                      icon={LayoutDashboard}
                      label="Account"
                      description="View your account settings"
                    />
                    <Separator />
                    <ListItem
                      icon={CalendarDays}
                      label="Subscription"
                      description="Manage your subscription"
                    />
                    <Separator />
                    <ListItem
                      icon={ListChecks}
                      label="Billing"
                      description="View your billing history"
                    />
                    <Separator />
                    <ListItem
                      icon={CheckCheck}
                      label="Security"
                      description="Update your password"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>
                  Here you can manage your account settings.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Personal Information</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Name</Label>
                          <Input id="name" defaultValue="Aron Kennedy" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" defaultValue="aron.kennedy@example.com" />
                        </div>
                      </div>
                      <div className="space-y-2 mt-4">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea id="bio" defaultValue="I'm a software engineer based in New York City." />
                      </div>
                      <Button className="mt-4">Update Profile</Button>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Password</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" />
                      </div>
                      <div className="space-y-2 mt-4">
                        <Label htmlFor="confirm-password">Confirm Password</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                      <Button className="mt-4">Update Password</Button>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Notifications</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                        <Input id="email-notifications" type="checkbox" />
                      </div>
                      <div className="space-y-2 mt-4">
                        <Label htmlFor="push-notifications">Push Notifications</Label>
                        <Input id="push-notifications" type="checkbox" />
                      </div>
                      <Button className="mt-4">Update Notifications</Button>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;
