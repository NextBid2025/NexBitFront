"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Settings, Bell, Shield, Clock, DollarSign, Server } from "lucide-react"

export default function SystemSettings() {
  const [settings, setSettings] = useState({
    // General Settings
    siteName: "AuctionPlatform",
    siteDescription: "Real-time auction platform",
    maintenanceMode: false,
    registrationEnabled: true,

    // Auction Settings
    defaultAuctionDuration: "7",
    minBidIncrement: "5",
    maxAuctionDuration: "30",
    autoExtendTime: "5",

    // Payment Settings
    paymentTimeout: "24",
    commissionRate: "5",
    refundPolicy: "7",

    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,

    // Security Settings
    twoFactorRequired: false,
    sessionTimeout: "30",
    maxLoginAttempts: "5",

    // Integration Settings
    rabbitMqUrl: "amqp://localhost:5672",
    hangfireEnabled: true,
    keycloakUrl: "http://localhost:8080",
    firebaseEnabled: true,
  })

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const saveSettings = () => {
    // Aquí se enviarían los settings al backend
    console.log("Saving settings:", settings)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">System Settings</h1>
          <p className="text-muted-foreground">Configure platform settings and integrations</p>
        </div>
        <Button onClick={saveSettings}>Save All Changes</Button>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="auctions">Auctions</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                General Settings
              </CardTitle>
              <CardDescription>Basic platform configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="siteName">Site Name</Label>
                <Input
                  id="siteName"
                  value={settings.siteName}
                  onChange={(e) => handleSettingChange("siteName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea
                  id="siteDescription"
                  value={settings.siteDescription}
                  onChange={(e) => handleSettingChange("siteDescription", e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">Temporarily disable the platform for maintenance</p>
                </div>
                <Switch
                  checked={settings.maintenanceMode}
                  onCheckedChange={(checked) => handleSettingChange("maintenanceMode", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>User Registration</Label>
                  <p className="text-sm text-muted-foreground">Allow new users to register</p>
                </div>
                <Switch
                  checked={settings.registrationEnabled}
                  onCheckedChange={(checked) => handleSettingChange("registrationEnabled", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="auctions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Auction Settings
              </CardTitle>
              <CardDescription>Configure auction behavior and rules</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="defaultDuration">Default Duration (days)</Label>
                  <Select
                    value={settings.defaultAuctionDuration}
                    onValueChange={(value) => handleSettingChange("defaultAuctionDuration", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 day</SelectItem>
                      <SelectItem value="3">3 days</SelectItem>
                      <SelectItem value="7">7 days</SelectItem>
                      <SelectItem value="14">14 days</SelectItem>
                      <SelectItem value="30">30 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxDuration">Maximum Duration (days)</Label>
                  <Input
                    id="maxDuration"
                    type="number"
                    value={settings.maxAuctionDuration}
                    onChange={(e) => handleSettingChange("maxAuctionDuration", e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="minBidIncrement">Min Bid Increment ($)</Label>
                  <Input
                    id="minBidIncrement"
                    type="number"
                    value={settings.minBidIncrement}
                    onChange={(e) => handleSettingChange("minBidIncrement", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="autoExtend">Auto-extend Time (minutes)</Label>
                  <Input
                    id="autoExtend"
                    type="number"
                    value={settings.autoExtendTime}
                    onChange={(e) => handleSettingChange("autoExtendTime", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Payment Settings
              </CardTitle>
              <CardDescription>Configure payment processing and policies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="paymentTimeout">Payment Timeout (hours)</Label>
                  <Input
                    id="paymentTimeout"
                    type="number"
                    value={settings.paymentTimeout}
                    onChange={(e) => handleSettingChange("paymentTimeout", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="commissionRate">Commission Rate (%)</Label>
                  <Input
                    id="commissionRate"
                    type="number"
                    value={settings.commissionRate}
                    onChange={(e) => handleSettingChange("commissionRate", e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="refundPolicy">Refund Policy (days)</Label>
                <Input
                  id="refundPolicy"
                  type="number"
                  value={settings.refundPolicy}
                  onChange={(e) => handleSettingChange("refundPolicy", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Settings
              </CardTitle>
              <CardDescription>Configure notification channels and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Send notifications via email</p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">Send notifications via SMS</p>
                </div>
                <Switch
                  checked={settings.smsNotifications}
                  onCheckedChange={(checked) => handleSettingChange("smsNotifications", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Send push notifications to mobile apps</p>
                </div>
                <Switch
                  checked={settings.pushNotifications}
                  onCheckedChange={(checked) => handleSettingChange("pushNotifications", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription>Configure security policies and authentication</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Require Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Force all users to enable 2FA</p>
                </div>
                <Switch
                  checked={settings.twoFactorRequired}
                  onCheckedChange={(checked) => handleSettingChange("twoFactorRequired", checked)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={settings.sessionTimeout}
                    onChange={(e) => handleSettingChange("sessionTimeout", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                  <Input
                    id="maxLoginAttempts"
                    type="number"
                    value={settings.maxLoginAttempts}
                    onChange={(e) => handleSettingChange("maxLoginAttempts", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                System Integrations
              </CardTitle>
              <CardDescription>Configure external services and microservices</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="rabbitMq">RabbitMQ URL</Label>
                <Input
                  id="rabbitMq"
                  value={settings.rabbitMqUrl}
                  onChange={(e) => handleSettingChange("rabbitMqUrl", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="keycloak">Keycloak URL</Label>
                <Input
                  id="keycloak"
                  value={settings.keycloakUrl}
                  onChange={(e) => handleSettingChange("keycloakUrl", e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Hangfire Background Jobs</Label>
                  <p className="text-sm text-muted-foreground">Enable background job processing</p>
                </div>
                <Switch
                  checked={settings.hangfireEnabled}
                  onCheckedChange={(checked) => handleSettingChange("hangfireEnabled", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Firebase Integration</Label>
                  <p className="text-sm text-muted-foreground">Enable Firebase storage and messaging</p>
                </div>
                <Switch
                  checked={settings.firebaseEnabled}
                  onCheckedChange={(checked) => handleSettingChange("firebaseEnabled", checked)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Service Status</CardTitle>
              <CardDescription>Current status of integrated services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>RabbitMQ</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Connected
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>PostgreSQL</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Connected
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>MongoDB</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Connected
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Keycloak</span>
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                    Checking...
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Firebase</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Connected
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Hangfire</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Running
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
