
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/custom/Card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PackageOpen, AlertTriangle, RefreshCcw, FileText } from "lucide-react";

const InventorySettings = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PackageOpen className="h-5 w-5" />
            <span>Inventory Tracking</span>
          </CardTitle>
          <CardDescription>
            Configure how inventory is tracked and updated.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="enableInventory">Enable Inventory Tracking</Label>
              <p className="text-sm text-muted-foreground">
                Track stock levels and update based on sales
              </p>
            </div>
            <Switch id="enableInventory" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between pt-4">
            <div className="space-y-0.5">
              <Label htmlFor="autoDeduct">Auto-Deduct Inventory</Label>
              <p className="text-sm text-muted-foreground">
                Automatically reduce stock when items are sold
              </p>
            </div>
            <Switch id="autoDeduct" defaultChecked />
          </div>
          
          <div className="space-y-2 pt-4 border-t mt-4">
            <Label>Default Units of Measurement</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-1">
                <Label htmlFor="unit1" className="text-sm">Weight</Label>
                <Select defaultValue="kg">
                  <SelectTrigger id="unit1">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">Kilogram (kg)</SelectItem>
                    <SelectItem value="g">Gram (g)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="unit2" className="text-sm">Volume</Label>
                <Select defaultValue="l">
                  <SelectTrigger id="unit2">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="l">Liter (L)</SelectItem>
                    <SelectItem value="ml">Milliliter (ml)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="unit3" className="text-sm">Quantity</Label>
                <Select defaultValue="pcs">
                  <SelectTrigger id="unit3">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pcs">Pieces (pcs)</SelectItem>
                    <SelectItem value="dz">Dozen (dz)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="unit4" className="text-sm">Length</Label>
                <Select defaultValue="m">
                  <SelectTrigger id="unit4">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="m">Meter (m)</SelectItem>
                    <SelectItem value="cm">Centimeter (cm)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            <span>Stock Alerts</span>
          </CardTitle>
          <CardDescription>
            Configure alerts for low stock and out-of-stock items.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="enableAlerts">Enable Stock Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Get notified when items fall below threshold
              </p>
            </div>
            <Switch id="enableAlerts" defaultChecked />
          </div>
          
          <div className="space-y-2 pt-4">
            <Label htmlFor="defaultThreshold">Default Low Stock Threshold</Label>
            <div className="flex items-center gap-2">
              <span className="text-sm">Alert when item quantity falls below</span>
              <Input id="defaultThreshold" className="w-20" defaultValue="5" />
              <span className="text-sm">units</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Individual thresholds can be set per item
            </p>
          </div>
          
          <div className="flex items-center justify-between pt-4">
            <div className="space-y-0.5">
              <Label htmlFor="syncMenuStatus">Sync with Menu</Label>
              <p className="text-sm text-muted-foreground">
                Automatically mark menu items as "Out of Stock"
              </p>
            </div>
            <Switch id="syncMenuStatus" defaultChecked />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            <span>Inventory Reports</span>
          </CardTitle>
          <CardDescription>
            Configure inventory reporting preferences.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="reportSchedule">Scheduled Reports</Label>
            <Select defaultValue="weekly">
              <SelectTrigger id="reportSchedule">
                <SelectValue placeholder="Select schedule" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="never">Never</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2 pt-4">
            <Label>Report Types</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="report1" className="rounded text-primary" defaultChecked />
                <Label htmlFor="report1">Stock Summary</Label>
              </div>
              
              <div className="flex items-center gap-2">
                <input type="checkbox" id="report2" className="rounded text-primary" defaultChecked />
                <Label htmlFor="report2">Usage by Item</Label>
              </div>
              
              <div className="flex items-center gap-2">
                <input type="checkbox" id="report3" className="rounded text-primary" defaultChecked />
                <Label htmlFor="report3">Low Stock List</Label>
              </div>
              
              <div className="flex items-center gap-2">
                <input type="checkbox" id="report4" className="rounded text-primary" />
                <Label htmlFor="report4">Valuation Report</Label>
              </div>
            </div>
          </div>
          
          <div className="pt-4">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <RefreshCcw className="h-4 w-4" />
              <span>Generate Sample Report</span>
            </Button>
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

export default InventorySettings;
