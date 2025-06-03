
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/custom/Card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Receipt, CreditCard, Calculator, Percent } from "lucide-react";

const BillingSettings = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            <span>Payment Methods</span>
          </CardTitle>
          <CardDescription>
            Configure the payment methods available for customer transactions.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="cashPayment">Cash Payment</Label>
              <p className="text-sm text-muted-foreground">
                Allow payments using cash
              </p>
            </div>
            <Switch id="cashPayment" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="upiPayment">UPI Payment</Label>
              <p className="text-sm text-muted-foreground">
                Enable payments via UPI (PhonePe, Google Pay, etc.)
              </p>
            </div>
            <Switch id="upiPayment" defaultChecked />
          </div>
          
          <div className="space-y-2 pt-2">
            <Label htmlFor="upiId">Business UPI ID</Label>
            <Input id="upiId" placeholder="yourrestaurant@upi" />
          </div>
          
          <div className="flex items-center justify-between pt-4">
            <div className="space-y-0.5">
              <Label htmlFor="cardPayment">Card Payment</Label>
              <p className="text-sm text-muted-foreground">
                Enable credit/debit card payments
              </p>
            </div>
            <Switch id="cardPayment" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between pt-4">
            <div className="space-y-0.5">
              <Label htmlFor="walletPayment">Digital Wallets</Label>
              <p className="text-sm text-muted-foreground">
                Enable payments via digital wallets (Paytm, Amazon Pay, etc.)
              </p>
            </div>
            <Switch id="walletPayment" defaultChecked />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Percent className="h-5 w-5" />
            <span>Tax Configuration</span>
          </CardTitle>
          <CardDescription>
            Configure tax rates and settings for billing.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="gstNumber">GST Number</Label>
            <Input id="gstNumber" placeholder="27AAAAA0000A1Z5" />
          </div>
          
          <div className="space-y-2 pt-4">
            <Label>Tax Rules</Label>
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <Checkbox id="gst5" defaultChecked />
                <Label htmlFor="gst5" className="font-medium">GST 5%</Label>
                <span className="text-sm text-muted-foreground ml-2">(Food Items)</span>
              </div>
              
              <div className="flex items-center gap-4">
                <Checkbox id="gst18" defaultChecked />
                <Label htmlFor="gst18" className="font-medium">GST 18%</Label>
                <span className="text-sm text-muted-foreground ml-2">(Beverages)</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-4">
            <div className="space-y-0.5">
              <Label htmlFor="displayTaxBreakdown">Display Tax Breakdown</Label>
              <p className="text-sm text-muted-foreground">
                Show tax breakdown on bills and receipts
              </p>
            </div>
            <Switch id="displayTaxBreakdown" defaultChecked />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            <span>Receipt Customization</span>
          </CardTitle>
          <CardDescription>
            Configure the format and content of customer receipts.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="receiptHeader">Receipt Header</Label>
            <Input id="receiptHeader" placeholder="Business name, address, contact" />
          </div>
          
          <div className="space-y-2 pt-4">
            <Label htmlFor="receiptFooter">Receipt Footer</Label>
            <Input id="receiptFooter" placeholder="Thank you message or special notes" />
          </div>
          
          <div className="space-y-2 pt-4">
            <Label htmlFor="fssaiNumber">FSSAI Number</Label>
            <Input id="fssaiNumber" placeholder="123456789012345" />
          </div>
          
          <div className="flex items-center justify-between pt-4">
            <div className="space-y-0.5">
              <Label htmlFor="digitalReceipt">Digital Receipt</Label>
              <p className="text-sm text-muted-foreground">
                Send receipts via SMS or email
              </p>
            </div>
            <Switch id="digitalReceipt" defaultChecked />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            <span>Additional Settings</span>
          </CardTitle>
          <CardDescription>
            Configure other billing-related options.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="roundingAmount">Round Total Amount</Label>
              <p className="text-sm text-muted-foreground">
                Round bill total to nearest rupee
              </p>
            </div>
            <Switch id="roundingAmount" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between pt-4">
            <div className="space-y-0.5">
              <Label htmlFor="tipsEnable">Enable Tips</Label>
              <p className="text-sm text-muted-foreground">
                Allow adding tips to bills
              </p>
            </div>
            <Switch id="tipsEnable" />
          </div>
          
          <div className="space-y-2 pt-4">
            <Label htmlFor="tipSuggestions">Suggested Tip Amounts (₹)</Label>
            <Input id="tipSuggestions" placeholder="20,50,100" />
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

export default BillingSettings;
