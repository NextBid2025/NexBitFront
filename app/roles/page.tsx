import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RoleSelector } from "@/components/role-selector"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

export default function RolesPage() {
  const roles = [
    {
      id: "1",
      name: "Administrator",
      description: "Full access to all resources",
      users: 3,
      permissions: [
        "Create auctions",
        "Edit auctions",
        "Delete auctions",
        "Manage users",
        "Manage roles",
        "View reports",
        "Export reports",
        "Manage payments",
        "Manage claims",
      ],
    },
    {
      id: "2",
      name: "Moderator",
      description: "Can manage auctions and users",
      users: 5,
      permissions: ["Create auctions", "Edit auctions", "Manage users", "View reports", "Manage claims"],
    },
    {
      id: "3",
      name: "Seller",
      description: "Can create and manage own auctions",
      users: 24,
      permissions: ["Create auctions", "Edit own auctions"],
    },
    {
      id: "4",
      name: "Bidder",
      description: "Can bid on auctions",
      users: 156,
      permissions: ["Bid on auctions", "View auctions"],
    },
  ]

  const users = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "Administrator",
      lastActive: "2 hours ago",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Moderator",
      lastActive: "1 day ago",
    },
    {
      id: "3",
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "Seller",
      lastActive: "3 hours ago",
    },
    {
      id: "4",
      name: "Alice Williams",
      email: "alice@example.com",
      role: "Bidder",
      lastActive: "Just now",
    },
    {
      id: "5",
      name: "Charlie Brown",
      email: "charlie@example.com",
      role: "Seller",
      lastActive: "5 days ago",
    },
  ]

  const permissions = [
    {
      id: "auctions",
      name: "Auctions",
      permissions: [
        { id: "create_auctions", name: "Create auctions" },
        { id: "edit_auctions", name: "Edit auctions" },
        { id: "delete_auctions", name: "Delete auctions" },
        { id: "view_auctions", name: "View auctions" },
      ],
    },
    {
      id: "users",
      name: "Users",
      permissions: [
        { id: "manage_users", name: "Manage users" },
        { id: "view_users", name: "View users" },
      ],
    },
    {
      id: "reports",
      name: "Reports",
      permissions: [
        { id: "view_reports", name: "View reports" },
        { id: "export_reports", name: "Export reports" },
      ],
    },
    {
      id: "payments",
      name: "Payments",
      permissions: [
        { id: "manage_payments", name: "Manage payments" },
        { id: "view_payments", name: "View payments" },
      ],
    },
    {
      id: "claims",
      name: "Claims",
      permissions: [
        { id: "manage_claims", name: "Manage claims" },
        { id: "view_claims", name: "View claims" },
      ],
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Roles & Permissions</h1>
          <p className="text-muted-foreground">Manage user roles and permissions</p>
        </div>
        <Button>Create New Role</Button>
      </div>

      <Tabs defaultValue="roles" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="roles">Roles</TabsTrigger>
          <TabsTrigger value="users">User Assignments</TabsTrigger>
        </TabsList>

        <TabsContent value="roles" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roles.map((role) => (
              <Card key={role.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {role.name}
                    <Badge variant="outline">{role.users} users</Badge>
                  </CardTitle>
                  <CardDescription>{role.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Permissions:</h4>
                    <ul className="text-sm space-y-1">
                      {role.permissions.slice(0, 4).map((permission, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          <span>{permission}</span>
                        </li>
                      ))}
                      {role.permissions.length > 4 && (
                        <li className="text-sm text-muted-foreground pl-3.5">+{role.permissions.length - 4} more</li>
                      )}
                    </ul>
                    <div className="pt-2 flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Edit Role: Administrator</CardTitle>
              <CardDescription>Modify role details and permissions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="role-name">Role Name</Label>
                  <Input id="role-name" defaultValue="Administrator" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role-description">Description</Label>
                  <Input id="role-description" defaultValue="Full access to all resources" />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Permissions</h3>
                <div className="space-y-6">
                  {permissions.map((group) => (
                    <div key={group.id} className="space-y-3">
                      <h4 className="font-medium">{group.name}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {group.permissions.map((permission) => (
                          <div key={permission.id} className="flex items-center space-x-2">
                            <Checkbox id={permission.id} defaultChecked />
                            <Label htmlFor={permission.id}>{permission.name}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button>Save Changes</Button>
                <Button variant="outline">Cancel</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Assign Role to User</CardTitle>
              <CardDescription>Select a user and assign them a role</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="user-email">User Email</Label>
                <Input id="user-email" placeholder="Enter user email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <RoleSelector roles={roles.map((r) => ({ id: r.id, name: r.name, description: r.description }))} />
              </div>
              <Button>Assign Role</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Role Assignments</CardTitle>
              <CardDescription>View and manage user roles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-4 p-4 font-medium border-b">
                  <div>User</div>
                  <div>Email</div>
                  <div>Current Role</div>
                  <div>Actions</div>
                </div>
                <div className="divide-y">
                  {users.map((user) => (
                    <div key={user.id} className="grid grid-cols-4 p-4">
                      <div>{user.name}</div>
                      <div>{user.email}</div>
                      <div>
                        <Badge variant="outline">{user.role}</Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Change Role
                        </Button>
                      </div>
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
