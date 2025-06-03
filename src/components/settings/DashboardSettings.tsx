
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/custom/Card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { LayoutDashboard, RefreshCw, Bell, Settings, PlusSquare } from "lucide-react";

const DashboardSettings = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LayoutDashboard className="h-5 w-5" />
            <span>Widget Configuration</span>
          </CardTitle>
          <CardDescription>
            Choose which widgets to display on your dashboard and their arrangement.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Checkbox id="salesWidget" defaultChecked />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="salesWidget">Sales Today (₹)</Label>
                <p className="text-sm text-muted-foreground">
                  Display today's total sales amount
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Checkbox id="topItems" defaultChecked />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="topItems">Top 5 Menu Items</Label>
                <p className="text-sm text-muted-foreground">
                  Show your best-selling menu items
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Checkbox id="pendingOrders" defaultChecked />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="pendingOrders">Pending Orders</Label>
                <p className="text-sm text-muted-foreground">
                  List of orders that need attention
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Checkbox id="inventoryAlerts" defaultChecked />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="inventoryAlerts">Inventory Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Notifications for low or out-of-stock items
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Checkbox id="staffActivity" />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="staffActivity">Staff Activity</Label>
                <p className="text-sm text-muted-foreground">
                  Track staff performance and attendance
                </p>
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t mt-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="refreshRate">Widget Refresh Rate</Label>
              <div className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4 text-muted-foreground" />
                <Select defaultValue="5">
                  <SelectTrigger id="refreshRate" className="w-32">
                    <SelectValue placeholder="Select refresh rate" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 minute</SelectItem>
                    <SelectItem value="5">5 minutes</SelectItem>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div className="pt-4">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <PlusSquare className="h-4 w-4" />
              <span>Add Custom Widget</span>
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              Create your own widget with custom data sources
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            <span>Filter Settings</span>
          </CardTitle>
          <CardDescription>
            Configure default filters for your dashboard metrics and reports.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="defaultTimeframe">Default Time Frame</Label>
              <Select defaultValue="today">
                <SelectTrigger id="defaultTimeframe">
                  <SelectValue placeholder="Select default time frame" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="yesterday">Yesterday</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="defaultLocation">Default Location</Label>
              <Select defaultValue="all">
                <SelectTrigger id="defaultLocation">
                  <SelectValue placeholder="Select default location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="mumbai">Mumbai Branch</SelectItem>
                  <SelectItem value="delhi">Delhi Branch</SelectItem>
                  <SelectItem value="bangalore">Bangalore Branch</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2 pt-4">
            <Label>Remember Filters</Label>
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Save and apply the last used filters when reopening the dashboard
              </p>
              <Switch id="rememberFilters" defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            <span>Alert Configuration</span>
          </CardTitle>
          <CardDescription>
            Set up notifications and alerts for important dashboard events.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="salesAlerts">Sales Milestone Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified when sales exceed ₹10,000 today
                </p>
              </div>
              <Switch id="salesAlerts" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="inventoryAlerts">Low Stock Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified when inventory items fall below threshold
                </p>
              </div>
              <Switch id="inventoryAlerts" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="orderAlerts">Pending Order Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified when orders are waiting for more than 15 minutes
                </p>
              </div>
              <Switch id="orderAlerts" />
            </div>
          </div>
          
          <div className="space-y-2 pt-4 border-t mt-4">
            <Label htmlFor="alertDelivery">Alert Delivery Method</Label>
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <Checkbox id="inAppAlerts" defaultChecked />
                <Label htmlFor="inAppAlerts">In-App Notifications</Label>
              </div>
              
              <div className="flex items-center gap-4">
                <Checkbox id="emailAlerts" defaultChecked />
                <Label htmlFor="emailAlerts">Email Alerts</Label>
              </div>
              
              <div className="flex items-center gap-4">
                <Checkbox id="smsAlerts" />
                <Label htmlFor="smsAlerts">SMS Alerts</Label>
              </div>
            </div>
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

export default DashboardSettings;
