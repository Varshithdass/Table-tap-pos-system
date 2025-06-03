
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/custom/Card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Users, Gift, Medal, MessageCircle, FileText } from "lucide-react";

const CrmSettings = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            <span>Customer Profiles</span>
          </CardTitle>
          <CardDescription>
            Configure how customer information is collected and stored.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="enableCustomerProfiles">Enable Customer Profiles</Label>
              <p className="text-sm text-muted-foreground">
                Store customer information for future orders
              </p>
            </div>
            <Switch id="enableCustomerProfiles" defaultChecked />
          </div>
          
          <div className="space-y-2 pt-4">
            <Label>Required Customer Fields</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="field1" className="rounded text-primary" defaultChecked />
                <Label htmlFor="field1">Name</Label>
              </div>
              
              <div className="flex items-center gap-2">
                <input type="checkbox" id="field2" className="rounded text-primary" defaultChecked />
                <Label htmlFor="field2">Phone Number</Label>
              </div>
              
              <div className="flex items-center gap-2">
                <input type="checkbox" id="field3" className="rounded text-primary" />
                <Label htmlFor="field3">Email</Label>
              </div>
              
              <div className="flex items-center gap-2">
                <input type="checkbox" id="field4" className="rounded text-primary" />
                <Label htmlFor="field4">Address</Label>
              </div>
              
              <div className="flex items-center gap-2">
                <input type="checkbox" id="field5" className="rounded text-primary" />
                <Label htmlFor="field5">Birthday</Label>
              </div>
              
              <div className="flex items-center gap-2">
                <input type="checkbox" id="field6" className="rounded text-primary" />
                <Label htmlFor="field6">Anniversary</Label>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-4">
            <div className="space-y-0.5">
              <Label htmlFor="autoCapture">Auto-Capture Customer Details</Label>
              <p className="text-sm text-muted-foreground">
                Automatically save customer details from orders (e.g., phone from UPI)
              </p>
            </div>
            <Switch id="autoCapture" defaultChecked />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5" />
            <span>Loyalty Program</span>
          </CardTitle>
          <CardDescription>
            Configure loyalty program settings and rewards.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="enableLoyalty">Enable Loyalty Program</Label>
              <p className="text-sm text-muted-foreground">
                Allow customers to earn and redeem points
              </p>
            </div>
            <Switch id="enableLoyalty" defaultChecked />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="pointsPerRupee">Points Per ₹ Spent</Label>
              <div className="flex items-center gap-2">
                <Input id="pointsPerRupee" className="w-20" defaultValue="1" />
                <span className="text-sm">point per</span>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2">₹</span>
                  <Input className="pl-7 w-20" defaultValue="100" />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="redemptionValue">Redemption Value</Label>
              <div className="flex items-center gap-2">
                <Input id="redemptionValue" className="w-20" defaultValue="10" />
                <span className="text-sm">points =</span>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2">₹</span>
                  <Input className="pl-7 w-20" defaultValue="50" />
                </div>
                <span className="text-sm">off</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-2 pt-4">
            <Label htmlFor="pointsExpiry">Points Expiry</Label>
            <div className="flex items-center gap-2">
              <span className="text-sm">Points expire after</span>
              <Input id="pointsExpiry" className="w-20" defaultValue="6" />
              <Select defaultValue="months">
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Time period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="days">Days</SelectItem>
                  <SelectItem value="months">Months</SelectItem>
                  <SelectItem value="years">Years</SelectItem>
                  <SelectItem value="never">Never</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Medal className="h-5 w-5" />
            <span>Customer Tiers</span>
          </CardTitle>
          <CardDescription>
            Configure special recognition for different customer levels.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="enableTiers">Enable Customer Tiers</Label>
              <p className="text-sm text-muted-foreground">
                Categorize customers into different loyalty tiers
              </p>
            </div>
            <Switch id="enableTiers" defaultChecked />
          </div>
          
          <div className="space-y-2 pt-4">
            <Label>Active Tiers</Label>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-gray-400"></span>
                <span className="text-sm font-medium">Regular</span>
                <span className="ml-auto text-xs text-muted-foreground">Default</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                <span className="text-sm font-medium">Silver</span>
                <span className="ml-auto text-xs text-muted-foreground">Min ₹5,000 spent</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                <span className="text-sm font-medium">Gold</span>
                <span className="ml-auto text-xs text-muted-foreground">Min ₹10,000 spent</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                <span className="text-sm font-medium">Premium</span>
                <span className="ml-auto text-xs text-muted-foreground">Min ₹25,000 spent</span>
              </div>
            </div>
          </div>
          
          <div className="pt-4">
            <Button variant="outline" size="sm">Add New Tier</Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            <span>Communication</span>
          </CardTitle>
          <CardDescription>
            Configure customer communication preferences.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Communication Channels</Label>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="channel1" className="rounded text-primary" defaultChecked />
                  <Label htmlFor="channel1">WhatsApp</Label>
                </div>
                <Button variant="outline" size="sm">Configure</Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="channel2" className="rounded text-primary" defaultChecked />
                  <Label htmlFor="channel2">SMS</Label>
                </div>
                <Button variant="outline" size="sm">Configure</Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="channel3" className="rounded text-primary" />
                  <Label htmlFor="channel3">Email</Label>
                </div>
                <Button variant="outline" size="sm">Configure</Button>
              </div>
            </div>
          </div>
          
          <div className="space-y-2 pt-4">
            <Label>Automated Messages</Label>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="orderConfirmation">Order Confirmation</Label>
                  <p className="text-sm text-muted-foreground">
                    Send message after order is placed
                  </p>
                </div>
                <Switch id="orderConfirmation" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="orderReady">Order Ready</Label>
                  <p className="text-sm text-muted-foreground">
                    Send message when order is ready for pickup
                  </p>
                </div>
                <Switch id="orderReady" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="birthdayOffer">Birthday Offers</Label>
                  <p className="text-sm text-muted-foreground">
                    Send special offers on customer's birthday
                  </p>
                </div>
                <Switch id="birthdayOffer" defaultChecked />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            <span>Feedback & Analytics</span>
          </CardTitle>
          <CardDescription>
            Configure customer feedback collection and analytics.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="enableFeedback">Enable Feedback Collection</Label>
              <p className="text-sm text-muted-foreground">
                Collect customer feedback after orders
              </p>
            </div>
            <Switch id="enableFeedback" defaultChecked />
          </div>
          
          <div className="space-y-2 pt-4">
            <Label htmlFor="feedbackMethod">Feedback Collection Method</Label>
            <Select defaultValue="whatsapp">
              <SelectTrigger id="feedbackMethod">
                <SelectValue placeholder="Select method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="whatsapp">WhatsApp Survey</SelectItem>
                <SelectItem value="qr">QR Code on Bill</SelectItem>
                <SelectItem value="email">Email Survey</SelectItem>
                <SelectItem value="sms">SMS Link</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2 pt-4">
            <Label htmlFor="feedbackDelay">Feedback Request Delay</Label>
            <div className="flex items-center gap-2">
              <span className="text-sm">Send feedback request</span>
              <Input id="feedbackDelay" className="w-20" defaultValue="30" />
              <span className="text-sm">minutes after order completion</span>
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

export default CrmSettings;
