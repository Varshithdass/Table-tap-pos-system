
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/custom/Card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ChefHat, Timer, Volume2, Printer } from "lucide-react";

const KitchenSettings = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ChefHat className="h-5 w-5" />
            <span>Order Routing</span>
          </CardTitle>
          <CardDescription>
            Configure how orders are routed to different kitchen stations.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Kitchen Stations</Label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Main Kitchen</span>
                    <Switch id="station1" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Bar</span>
                    <Switch id="station2" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Tandoor Section</span>
                    <Switch id="station3" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Dessert Station</span>
                    <Switch id="station4" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Category Routing</Label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Main Course</span>
                    <Select defaultValue="main">
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="main">Main Kitchen</SelectItem>
                        <SelectItem value="tandoor">Tandoor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Beverages</span>
                    <Select defaultValue="bar">
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bar">Bar</SelectItem>
                        <SelectItem value="main">Main Kitchen</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pt-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enableRush">Enable Rush Orders</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow marking orders as urgent with priority display
                  </p>
                </div>
                <Switch id="enableRush" defaultChecked />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Timer className="h-5 w-5" />
            <span>Timing & Display</span>
          </CardTitle>
          <CardDescription>
            Configure kitchen display system timing and appearance.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="enableKds">Enable Kitchen Display System</Label>
              <p className="text-sm text-muted-foreground">
                Use digital screens to display orders in the kitchen
              </p>
            </div>
            <Switch id="enableKds" defaultChecked />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="fontSizeKds">Display Font Size</Label>
              <Select defaultValue="large">
                <SelectTrigger id="fontSizeKds">
                  <SelectValue placeholder="Select font size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                  <SelectItem value="xlarge">Extra Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="orderTimeout">Order Timeout</Label>
              <div className="flex items-center gap-2">
                <span className="text-sm">Mark as overdue after</span>
                <Input id="orderTimeout" className="w-16" defaultValue="15" />
                <span className="text-sm">minutes</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-4">
            <div className="space-y-0.5">
              <Label htmlFor="autoComplete">Auto-Complete Orders</Label>
              <p className="text-sm text-muted-foreground">
                Automatically mark items as ready if not updated
              </p>
            </div>
            <Switch id="autoComplete" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Volume2 className="h-5 w-5" />
            <span>Notifications</span>
          </CardTitle>
          <CardDescription>
            Configure alerts and sounds for the kitchen team.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="enableSound">Sound Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Play sound when new orders arrive
              </p>
            </div>
            <Switch id="enableSound" defaultChecked />
          </div>
          
          <div className="space-y-2 pt-4">
            <Label htmlFor="alertVolume">Alert Volume</Label>
            <div className="flex items-center gap-2">
              <Volume2 className="h-4 w-4 text-muted-foreground" />
              <input type="range" id="alertVolume" min="0" max="100" defaultValue="80" className="w-full" />
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-4">
            <div className="space-y-0.5">
              <Label htmlFor="enableFlash">Visual Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Flash screen or highlight when new orders arrive
              </p>
            </div>
            <Switch id="enableFlash" defaultChecked />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Printer className="h-5 w-5" />
            <span>Ticket Format</span>
          </CardTitle>
          <CardDescription>
            Configure how kitchen tickets are formatted and printed.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Ticket Information</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="tick1" className="rounded text-primary" defaultChecked />
                <Label htmlFor="tick1">Order Number</Label>
              </div>
              
              <div className="flex items-center gap-2">
                <input type="checkbox" id="tick2" className="rounded text-primary" defaultChecked />
                <Label htmlFor="tick2">Table Number/Name</Label>
              </div>
              
              <div className="flex items-center gap-2">
                <input type="checkbox" id="tick3" className="rounded text-primary" defaultChecked />
                <Label htmlFor="tick3">Item Modifiers</Label>
              </div>
              
              <div className="flex items-center gap-2">
                <input type="checkbox" id="tick4" className="rounded text-primary" defaultChecked />
                <Label htmlFor="tick4">Timestamp</Label>
              </div>
              
              <div className="flex items-center gap-2">
                <input type="checkbox" id="tick5" className="rounded text-primary" defaultChecked />
                <Label htmlFor="tick5">Server Name</Label>
              </div>
              
              <div className="flex items-center gap-2">
                <input type="checkbox" id="tick6" className="rounded text-primary" />
                <Label htmlFor="tick6">Special Instructions</Label>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-4">
            <div className="space-y-0.5">
              <Label htmlFor="printDuplicates">Print Duplicate Tickets</Label>
              <p className="text-sm text-muted-foreground">
                Print an extra copy of each ticket
              </p>
            </div>
            <Switch id="printDuplicates" />
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

export default KitchenSettings;
