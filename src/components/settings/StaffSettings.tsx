
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/custom/Card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { UsersRound, ShieldCheck, Clock, TrendingUp } from "lucide-react";

const StaffSettings = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UsersRound className="h-5 w-5" />
            <span>Staff Roles</span>
          </CardTitle>
          <CardDescription>
            Configure staff roles and their responsibilities.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Active Roles</Label>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                <span className="text-sm font-medium">Admin</span>
                <span className="ml-auto text-xs text-muted-foreground">Full Access</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                <span className="text-sm font-medium">Manager</span>
                <span className="ml-auto text-xs text-muted-foreground">Limited Administrative Access</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                <span className="text-sm font-medium">Cashier</span>
                <span className="ml-auto text-xs text-muted-foreground">Order & Payment Access</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                <span className="text-sm font-medium">Server</span>
                <span className="ml-auto text-xs text-muted-foreground">Order Entry Access</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                <span className="text-sm font-medium">Kitchen Staff</span>
                <span className="ml-auto text-xs text-muted-foreground">Kitchen Display Access</span>
              </div>
            </div>
          </div>
          
          <div className="pt-4">
            <Button variant="outline" size="sm">Add Custom Role</Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5" />
            <span>User Setup & Security</span>
          </CardTitle>
          <CardDescription>
            Configure user accounts and access control.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pinDigits">PIN Digits</Label>
            <Select defaultValue="4">
              <SelectTrigger id="pinDigits">
                <SelectValue placeholder="Select PIN length" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="4">4 digits</SelectItem>
                <SelectItem value="5">5 digits</SelectItem>
                <SelectItem value="6">6 digits</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center justify-between pt-4">
            <div className="space-y-0.5">
              <Label htmlFor="pinExpiry">PIN Expiry</Label>
              <p className="text-sm text-muted-foreground">
                Require PIN change after a specific period
              </p>
            </div>
            <Switch id="pinExpiry" />
          </div>
          
          <div className="flex items-center justify-between pt-4">
            <div className="space-y-0.5">
              <Label htmlFor="loginTimeout">Login Timeout</Label>
              <p className="text-sm text-muted-foreground">
                Automatically log out after inactivity
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Input id="loginTimeout" className="w-16" defaultValue="5" />
              <span className="text-sm">minutes</span>
            </div>
          </div>
          
          <div className="space-y-2 pt-4">
            <Label>Permission Groups</Label>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="permOrders" className="text-sm font-medium">Order Management</Label>
                  <Select defaultValue="manager">
                    <SelectTrigger id="permOrders" className="w-32">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Staff</SelectItem>
                      <SelectItem value="manager">Manager+</SelectItem>
                      <SelectItem value="admin">Admin Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-xs text-muted-foreground">
                  Void orders, apply large discounts, etc.
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="permRefunds" className="text-sm font-medium">Refunds</Label>
                  <Select defaultValue="manager">
                    <SelectTrigger id="permRefunds" className="w-32">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Staff</SelectItem>
                      <SelectItem value="manager">Manager+</SelectItem>
                      <SelectItem value="admin">Admin Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-xs text-muted-foreground">
                  Process refunds and returns
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="permReports" className="text-sm font-medium">Reports & Analytics</Label>
                  <Select defaultValue="manager">
                    <SelectTrigger id="permReports" className="w-32">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Staff</SelectItem>
                      <SelectItem value="manager">Manager+</SelectItem>
                      <SelectItem value="admin">Admin Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-xs text-muted-foreground">
                  View sales reports and financial data
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            <span>Shift Management</span>
          </CardTitle>
          <CardDescription>
            Configure staff shift tracking and management.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="enableShifts">Enable Shift Tracking</Label>
              <p className="text-sm text-muted-foreground">
                Track staff clock-in and clock-out times
              </p>
            </div>
            <Switch id="enableShifts" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between pt-4">
            <div className="space-y-0.5">
              <Label htmlFor="requireClockIn">Require Clock In/Out</Label>
              <p className="text-sm text-muted-foreground">
                Staff must clock in before accessing POS
              </p>
            </div>
            <Switch id="requireClockIn" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between pt-4">
            <div className="space-y-0.5">
              <Label htmlFor="shiftAlerts">Shift Change Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Send notifications to managers on shift changes
              </p>
            </div>
            <Switch id="shiftAlerts" />
          </div>
          
          <div className="space-y-2 pt-4">
            <Label htmlFor="overtimeThreshold">Overtime Threshold</Label>
            <div className="flex items-center gap-2">
              <span className="text-sm">Mark as overtime after</span>
              <Input id="overtimeThreshold" className="w-16" defaultValue="8" />
              <span className="text-sm">hours per shift</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            <span>Performance Tracking</span>
          </CardTitle>
          <CardDescription>
            Configure performance metrics for staff.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="enableTracking">Enable Performance Tracking</Label>
              <p className="text-sm text-muted-foreground">
                Track sales, orders handled, and other metrics by staff
              </p>
            </div>
            <Switch id="enableTracking" defaultChecked />
          </div>
          
          <div className="space-y-2 pt-4">
            <Label>Tracked Metrics</Label>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="metric1" className="rounded text-primary" defaultChecked />
                <Label htmlFor="metric1">Total Sales (₹)</Label>
              </div>
              
              <div className="flex items-center gap-2">
                <input type="checkbox" id="metric2" className="rounded text-primary" defaultChecked />
                <Label htmlFor="metric2">Orders Handled</Label>
              </div>
              
              <div className="flex items-center gap-2">
                <input type="checkbox" id="metric3" className="rounded text-primary" defaultChecked />
                <Label htmlFor="metric3">Average Order Value</Label>
              </div>
              
              <div className="flex items-center gap-2">
                <input type="checkbox" id="metric4" className="rounded text-primary" />
                <Label htmlFor="metric4">Tips Earned</Label>
              </div>
              
              <div className="flex items-center gap-2">
                <input type="checkbox" id="metric5" className="rounded text-primary" />
                <Label htmlFor="metric5">Customer Feedback Ratings</Label>
              </div>
            </div>
          </div>
          
          <div className="space-y-2 pt-4">
            <Label htmlFor="reportFrequency">Performance Report Frequency</Label>
            <Select defaultValue="weekly">
              <SelectTrigger id="reportFrequency">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-end gap-4 pt-6">
        <Button variant="outline">Reset to Defaults</Button>
        <Button>Save Settings</Button>
      </div>
    </div>
  );
};

export default StaffSettings;
