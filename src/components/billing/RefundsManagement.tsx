
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/custom/Card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from "@/components/ui/table";
import { Search, RefreshCw, ArrowRight, Check, AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Sample refunds data
const sampleRefunds = [
  {
    id: "REF-20240501001",
    invoiceId: "INV-20240430002",
    customerName: "Priya Enterprises",
    date: "2024-05-01",
    amount: 780.00,
    reason: "Item returned",
    status: "completed"
  },
  {
    id: "REF-20240430001",
    invoiceId: "INV-20240429003",
    customerName: "Shivam Patel",
    date: "2024-04-30",
    amount: 192.00,
    reason: "Wrong order",
    status: "completed"
  },
  {
    id: "REF-20240428001",
    invoiceId: "INV-20240427001",
    customerName: "Meera Shah",
    date: "2024-04-28",
    amount: 540.50,
    reason: "Quality issue",
    status: "completed"
  }
];

const RefundsManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [invoiceId, setInvoiceId] = useState("");
  const [invoiceDetails, setInvoiceDetails] = useState<any>(null);
  const [refundAmount, setRefundAmount] = useState("");
  const [refundReason, setRefundReason] = useState("");
  const [refundMethod, setRefundMethod] = useState("");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Filter refunds based on search term
  const filteredRefunds = sampleRefunds.filter(refund => 
    refund.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    refund.invoiceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    refund.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = () => {
    if (!invoiceId) {
      setError("Please enter an invoice number");
      setInvoiceDetails(null);
      return;
    }

    // Simulate API call
    setProcessing(true);
    setTimeout(() => {
      // Mockup invoice data
      if (invoiceId.startsWith("INV-")) {
        setInvoiceDetails({
          id: invoiceId,
          customerName: "Arjun Mehta",
          date: "2024-04-28",
          amount: 2450.75,
          items: [
            { id: 1, name: "Butter Chicken", price: 480.00, quantity: 2 },
            { id: 2, name: "Garlic Naan", price: 60.00, quantity: 4 },
            { id: 3, name: "Pulao Rice", price: 180.00, quantity: 2 },
            { id: 4, name: "Sweet Lassi", price: 110.00, quantity: 3 }
          ],
          paymentMethod: "UPI"
        });
        setError(null);
      } else {
        setInvoiceDetails(null);
        setError("Invoice not found. Please check the number and try again.");
      }
      setProcessing(false);
    }, 1000);
  };

  const handleRefund = () => {
    if (!refundAmount || !refundReason || !refundMethod) {
      setError("Please fill in all refund details");
      return;
    }

    if (parseFloat(refundAmount) > invoiceDetails.amount) {
      setError("Refund amount cannot be greater than the invoice amount");
      return;
    }

    setProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
      setError(null);
      
      // Reset form after successful refund
      setTimeout(() => {
        setInvoiceDetails(null);
        setInvoiceId("");
        setRefundAmount("");
        setRefundReason("");
        setRefundMethod("");
        setSuccess(false);
      }, 3000);
    }, 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Column - Process New Refund */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Process New Refund</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Error Message */}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Success Message */}
            {success && (
              <Alert className="bg-green-50 border-green-200 text-green-800">
                <Check className="h-4 w-4 text-green-600" />
                <AlertDescription>
                  Refund processed successfully! Reference ID: REF-{Date.now().toString().substring(6)}
                </AlertDescription>
              </Alert>
            )}

            {/* Invoice Search */}
            <div className="flex space-x-2">
              <div className="flex-1">
                <Label htmlFor="invoice-id">Invoice Number</Label>
                <Input
                  id="invoice-id"
                  placeholder="Enter invoice number (e.g., INV-20240501001)"
                  value={invoiceId}
                  onChange={(e) => setInvoiceId(e.target.value)}
                />
              </div>
              <div className="flex items-end">
                <Button onClick={handleSearch} disabled={processing || !invoiceId}>
                  {processing ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Search className="h-4 w-4" />
                  )}
                  <span className="ml-2">Search</span>
                </Button>
              </div>
            </div>

            {/* Invoice Details */}
            {invoiceDetails && (
              <div className="border rounded-md p-4 space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Invoice Number</p>
                    <p className="font-medium">{invoiceDetails.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-medium">{invoiceDetails.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Customer</p>
                    <p className="font-medium">{invoiceDetails.customerName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Amount</p>
                    <p className="font-medium">₹{invoiceDetails.amount.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Payment Method</p>
                    <p className="font-medium">{invoiceDetails.paymentMethod}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Items</p>
                  <div className="max-h-40 overflow-y-auto border rounded-md">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Item</TableHead>
                          <TableHead>Qty</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Total</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {invoiceDetails.items.map((item: any) => (
                          <TableRow key={item.id}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>₹{item.price.toFixed(2)}</TableCell>
                            <TableCell>₹{(item.price * item.quantity).toFixed(2)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm font-medium mb-4">Refund Details</p>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="refund-amount">Refund Amount (₹)</Label>
                      <Input
                        id="refund-amount"
                        type="number"
                        placeholder="Enter amount to refund"
                        value={refundAmount}
                        onChange={(e) => setRefundAmount(e.target.value)}
                        min="0"
                        max={invoiceDetails.amount}
                        step="0.01"
                      />
                    </div>
                    <div>
                      <Label htmlFor="refund-reason">Reason for Refund</Label>
                      <Input
                        id="refund-reason"
                        placeholder="Enter reason for refund"
                        value={refundReason}
                        onChange={(e) => setRefundReason(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="refund-method">Refund Method</Label>
                      <select
                        id="refund-method"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        value={refundMethod}
                        onChange={(e) => setRefundMethod(e.target.value)}
                      >
                        <option value="">Select refund method</option>
                        <option value="original">Original Payment Method ({invoiceDetails.paymentMethod})</option>
                        <option value="cash">Cash</option>
                        <option value="upi">UPI</option>
                        <option value="bank">Bank Transfer</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          {invoiceDetails && (
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={handleRefund}
                disabled={processing || success || !refundAmount || !refundReason || !refundMethod}
              >
                {processing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing Refund...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Process Refund
                  </>
                )}
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>

      {/* Right Column - Refund History */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Refund History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <Label htmlFor="search-refunds">Search Refunds</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                <Input
                  id="search-refunds"
                  className="pl-10"
                  placeholder="Search by refund ID, invoice ID, or customer name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Refund ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRefunds.length > 0 ? (
                    filteredRefunds.map(refund => (
                      <TableRow key={refund.id}>
                        <TableCell className="font-medium">{refund.id}</TableCell>
                        <TableCell>{refund.date}</TableCell>
                        <TableCell>₹{refund.amount.toFixed(2)}</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800">
                            {refund.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            View <ArrowRight className="ml-1 h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-6">
                        No refunds found matching your search criteria
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RefundsManagement;
