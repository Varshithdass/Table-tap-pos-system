
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/custom/Card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ClipboardList, AlarmClock, Receipt, CreditCard, Tag, Split } from "lucide-react";

const OrderSettings = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5" />
            <span>Order Creation</span>
          </CardTitle>
          <CardDescription>
            Configure how orders are created and numbered in the system.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="orderPrefix">Order Number Prefix</Label>
              <Input id="orderPrefix" placeholder="e.g. TOI-" />
              <p className="text-xs text-muted-foreground">
                Example: TOI-001, TOI-002, etc.
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="digitCount">Digit Count</Label>
              <Select defaultValue="3">
                <SelectTrigger id="digitCount">
                  <SelectValue placeholder="Select digit count" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 digits (01-99)</SelectItem>
                  <SelectItem value="3">3 digits (001-999)</SelectItem>
                  <SelectItem value="4">4 digits (0001-9999)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-4">
            <div className="space-y-0.5">
              <Label htmlFor="autosave">Auto-Save Incomplete Orders</Label>
              <p className="text-sm text-muted-foreground">
                Automatically save orders as drafts if left incomplete
              </p>
            </div>
            <Switch id="autosave" defaultChecked />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlarmClock className="h-5 w-5" />
            <span>Order Status</span>
          </CardTitle>
          <CardDescription>
            Define order statuses and their behavior.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Active Order Statuses</Label>
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <Checkbox id="statusPending" defaultChecked />
                <Label htmlFor="statusPending" className="font-medium">Pending</Label>
                <div className="w-3 h-3 rounded-full bg-yellow-400 ml-auto"></div>
              </div>
              
              <div className="flex items-center gap-4">
                <Checkbox id="statusInProgress" defaultChecked />
                <Label htmlFor="statusInProgress" className="font-medium">In Progress</Label>
                <div className="w-3 h-3 rounded-full bg-blue-500 ml-auto"></div>
              </div>
              
              <div className="flex items-center gap-4">
                <Checkbox id="statusReady" defaultChecked />
                <Label htmlFor="statusReady" className="font-medium">Ready</Label>
                <div className="w-3 h-3 rounded-full bg-green-500 ml-auto"></div>
              </div>
              
              <div className="flex items-center gap-4">
                <Checkbox id="statusCompleted" defaultChecked />
                <Label htmlFor="statusCompleted" className="font-medium">Completed</Label>
                <div className="w-3 h-3 rounded-full bg-purple-500 ml-auto"></div>
              </div>
              
              <div className="flex items-center gap-4">
                <Checkbox id="statusCancelled" defaultChecked />
                <Label htmlFor="statusCancelled" className="font-medium">Cancelled</Label>
                <div className="w-3 h-3 rounded-full bg-red-500 ml-auto"></div>
              </div>
              
              <div className="flex items-center gap-4">
                <Checkbox id="statusAwaitingPayment" />
                <Label htmlFor="statusAwaitingPayment" className="font-medium">Awaiting Payment</Label>
                <div className="w-3 h-3 rounded-full bg-orange-500 ml-auto"></div>
              </div>
            </div>
          </div>
          
          <div className="pt-4">
            <Button variant="outline" size="sm">Add Custom Status</Button>
          </div>
          
          <div className="space-y-2 pt-4">
            <Label htmlFor="orderTimeout">Order Timeout</Label>
            <div className="flex items-center gap-2">
              <span className="text-sm">Auto-cancel pending orders after</span>
              <Select defaultValue="30">
                <SelectTrigger id="orderTimeout" className="w-24">
                  <SelectValue placeholder="Minutes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 min</SelectItem>
                  <SelectItem value="30">30 min</SelectItem>
                  <SelectItem value="45">45 min</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="0">Never</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tag className="h-5 w-5" />
            <span>Modifiers & Discounts</span>
          </CardTitle>
          <CardDescription>
            Configure order modifiers and discount settings.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="requireModifiers">Require Modifiers</Label>
              <p className="text-sm text-muted-foreground">
                Prompt for modifiers on applicable items
              </p>
            </div>
            <Switch id="requireModifiers" defaultChecked />
          </div>
          
          <div className="space-y-2 pt-4">
            <Label htmlFor="discountApproval">Discount Approval</Label>
            <div className="flex items-center gap-2">
              <span className="text-sm">Require approval for discounts above</span>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2">₹</span>
                <Input id="discountApproval" className="pl-7" defaultValue="100" />
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-4">
            <div className="space-y-0.5">
              <Label htmlFor="enableSplitBill">Enable Split Billing</Label>
              <p className="text-sm text-muted-foreground">
                Allow splitting bills by items or amount
              </p>
            </div>
            <Switch id="enableSplitBill" defaultChecked />
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

export default OrderSettings;
