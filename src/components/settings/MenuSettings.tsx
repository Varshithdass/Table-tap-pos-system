
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/custom/Card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { MenuSquare, IndianRupee, Plus, Image, Clock } from "lucide-react";

const MenuSettings = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MenuSquare className="h-5 w-5" />
            <span>Menu Categories</span>
          </CardTitle>
          <CardDescription>
            Configure how menu categories are organized and displayed.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Active Categories</Label>
            <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                <span className="text-sm font-medium">Starters</span>
                <span className="ml-auto text-xs text-muted-foreground">7 items</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                <span className="text-sm font-medium">Main Course</span>
                <span className="ml-auto text-xs text-muted-foreground">12 items</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                <span className="text-sm font-medium">Tandoor Specialties</span>
                <span className="ml-auto text-xs text-muted-foreground">5 items</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                <span className="text-sm font-medium">Drinks & Beverages</span>
                <span className="ml-auto text-xs text-muted-foreground">8 items</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                <span className="text-sm font-medium">Desserts</span>
                <span className="ml-auto text-xs text-muted-foreground">4 items</span>
              </div>
            </div>
          </div>
          
          <div className="pt-4">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>Add New Category</span>
            </Button>
          </div>
          
          <div className="flex items-center justify-between pt-4">
            <div className="space-y-0.5">
              <Label htmlFor="categorySorting">Custom Category Order</Label>
              <p className="text-sm text-muted-foreground">
                Enable manual sorting of categories on the POS screen
              </p>
            </div>
            <Switch id="categorySorting" defaultChecked />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IndianRupee className="h-5 w-5" />
            <span>Pricing & Display</span>
          </CardTitle>
          <CardDescription>
            Configure how menu prices are calculated and displayed.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="includeTax">Include Tax in Displayed Price</Label>
              <p className="text-sm text-muted-foreground">
                Show prices with GST included (e.g., ₹200 vs ₹236 incl. GST)
              </p>
            </div>
            <Switch id="includeTax" />
          </div>
          
          <div className="space-y-2 pt-4">
            <Label htmlFor="rounding">Price Rounding</Label>
            <Select defaultValue="1">
              <SelectTrigger id="rounding">
                <SelectValue placeholder="Select rounding option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">To nearest ₹1</SelectItem>
                <SelectItem value="5">To nearest ₹5</SelectItem>
                <SelectItem value="10">To nearest ₹10</SelectItem>
                <SelectItem value="0">No rounding</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="defaultPrice">Default Price Tier</Label>
              <Select defaultValue="regular">
                <SelectTrigger id="defaultPrice">
                  <SelectValue placeholder="Select default tier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="regular">Regular Price</SelectItem>
                  <SelectItem value="happy">Happy Hour Price</SelectItem>
                  <SelectItem value="festival">Festival Price</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="multiTier">Enable Multiple Price Tiers</Label>
                <p className="text-sm text-muted-foreground">
                  Set different prices (e.g., Half/Full)
                </p>
              </div>
              <Switch id="multiTier" defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="h-5 w-5" />
            <span>Item Images & Details</span>
          </CardTitle>
          <CardDescription>
            Configure how menu item images and details are handled.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="displayImages">Display Item Images</Label>
              <p className="text-sm text-muted-foreground">
                Show images on the POS screen when available
              </p>
            </div>
            <Switch id="displayImages" defaultChecked />
          </div>
          
          <div className="space-y-2 pt-4">
            <Label htmlFor="imageSize">Image Size</Label>
            <Select defaultValue="medium">
              <SelectTrigger id="imageSize">
                <SelectValue placeholder="Select image size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small (Thumbnail)</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="large">Large</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2 pt-4">
            <Label htmlFor="maxSize">Maximum Upload Size</Label>
            <div className="flex items-center gap-2">
              <Input id="maxSize" className="w-20" defaultValue="5" />
              <span className="text-sm">MB per image</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            <span>Availability & Specials</span>
          </CardTitle>
          <CardDescription>
            Configure item availability and special menu items.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="defaultAvailability">Default Availability</Label>
              <p className="text-sm text-muted-foreground">
                Set new items as available by default
              </p>
            </div>
            <Switch id="defaultAvailability" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between pt-4">
            <div className="space-y-0.5">
              <Label htmlFor="enableSchedule">Enable Scheduled Availability</Label>
              <p className="text-sm text-muted-foreground">
                Set specific times when items are available
              </p>
            </div>
            <Switch id="enableSchedule" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between pt-4">
            <div className="space-y-0.5">
              <Label htmlFor="enableSpecials">Enable Daily Specials</Label>
              <p className="text-sm text-muted-foreground">
                Allow quick addition of limited-time items
              </p>
            </div>
            <Switch id="enableSpecials" defaultChecked />
          </div>
          
          <div className="space-y-2 pt-4">
            <Label htmlFor="specialDuration">Default Special Duration</Label>
            <Select defaultValue="1">
              <SelectTrigger id="specialDuration">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 day</SelectItem>
                <SelectItem value="3">3 days</SelectItem>
                <SelectItem value="7">1 week</SelectItem>
                <SelectItem value="manual">Manual expiry</SelectItem>
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

export default MenuSettings;
