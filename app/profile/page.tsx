import { ProfileForm } from "@/components/profile-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PaymentMethodForm } from "@/components/payment-method-form"
import { NotificationBanner } from "@/components/notification-banner"

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Profile Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <NotificationBanner
        title="Complete your profile"
        description="Add a payment method to start bidding on auctions."
        variant="warning"
        action={{
          label: "Add Payment Method",
          onClick: () => {},
        }}
      />

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="payment">Payment Methods</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-6">
            <ProfileForm />

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Picture</CardTitle>
                  <CardDescription>Upload a profile picture to personalize your account</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-4">
                  <div className="h-32 w-32 rounded-full bg-muted flex items-center justify-center text-2xl font-medium">
                    JD
                  </div>
                  <Button variant="outline">Upload Picture</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Account Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Member since</span>
                    <span>Jan 15, 2023</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Auctions won</span>
                    <span>6</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Bids placed</span>
                    <span>42</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Account type</span>
                    <span className="font-medium">Standard</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="payment" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-6">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Saved Payment Methods</CardTitle>
                  <CardDescription>Manage your saved payment methods</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between border rounded-md p-4">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-16 bg-muted rounded" />
                      <div>
                        <p className="font-medium">Visa •••• 4242</p>
                        <p className="text-sm text-muted-foreground">Expires 12/25</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        Remove
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border rounded-md p-4">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-16 bg-muted rounded" />
                      <div>
                        <p className="font-medium">Mastercard •••• 5678</p>
                        <p className="text-sm text-muted-foreground">Expires 08/24</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        Remove
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <PaymentMethodForm />
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Billing Address</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="font-medium">John Doe</p>
                  <p>123 Main Street</p>
                  <p>Apt 4B</p>
                  <p>San Francisco, CA 94103</p>
                  <p>United States</p>
                  <Button variant="outline" className="mt-2">
                    Edit Address
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment History</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">May 15, 2023</span>
                    <span className="font-medium">$329.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">May 5, 2023</span>
                    <span className="font-medium">$199.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Apr 28, 2023</span>
                    <span className="font-medium">$749.00</span>
                  </div>
                  <Button variant="link" className="mt-2 p-0 h-auto">
                    View All Transactions
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your password to keep your account secure</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="current-password" className="text-sm font-medium">
                  Current Password
                </label>
                <input
                  id="current-password"
                  type="password"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="new-password" className="text-sm font-medium">
                  New Password
                </label>
                <input
                  id="new-password"
                  type="password"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="confirm-password" className="text-sm font-medium">
                  Confirm New Password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
              <Button>Update Password</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>Add an extra layer of security to your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Two-Factor Authentication</p>
                  <p className="text-sm text-muted-foreground">
                    Protect your account with an additional security layer
                  </p>
                </div>
                <Button variant="outline">Enable</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Login Sessions</CardTitle>
              <CardDescription>Manage your active login sessions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-md p-4">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">Current Session</p>
                    <p className="text-sm text-muted-foreground">San Francisco, CA • Chrome on macOS</p>
                  </div>
                  <div className="text-sm text-green-500 font-medium">Active</div>
                </div>
              </div>
              <div className="border rounded-md p-4">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">Previous Session</p>
                    <p className="text-sm text-muted-foreground">New York, NY • Safari on iOS</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Revoke
                  </Button>
                </div>
              </div>
              <Button variant="outline">Logout of All Sessions</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
