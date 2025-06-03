
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/custom/Card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from "@/components/ui/table";
import { 
  Search, 
  Calendar, 
  Download, 
  FileText, 
  Share2,
  ChevronDown
} from "lucide-react";

// Sample invoices data
const sampleInvoices = [
  {
    id: "INV-20240501001",
    customerName: "Rahul Kumar",
    date: "2024-05-01",
    amount: 1245.50,
    status: "paid",
    paymentMethod: "UPI",
    gstin: ""
  },
  {
    id: "INV-20240430002",
    customerName: "Priya Enterprises",
    date: "2024-04-30",
    amount: 4780.00,
    status: "paid",
    paymentMethod: "Card",
    gstin: "27AADCB2230M1ZT"
  },
  {
    id: "INV-20240430001",
    customerName: "Walk-in Customer",
    date: "2024-04-30",
    amount: 680.25,
    status: "paid",
    paymentMethod: "Cash",
    gstin: ""
  },
  {
    id: "INV-20240429003",
    customerName: "Shivam Patel",
    date: "2024-04-29",
    amount: 1892.00,
    status: "paid",
    paymentMethod: "UPI",
    gstin: ""
  },
  {
    id: "INV-20240429002",
    customerName: "Tech Solutions Pvt Ltd",
    date: "2024-04-29",
    amount: 3250.00,
    status: "paid",
    paymentMethod: "Bank Transfer",
    gstin: "06AABCT1332L1ZT"
  },
  {
    id: "INV-20240429001",
    customerName: "Nisha Jain",
    date: "2024-04-29",
    amount: 925.75,
    status: "paid",
    paymentMethod: "Card",
    gstin: ""
  }
];

const InvoiceHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null);

  // Filter invoices based on search term and date range
  const filteredInvoices = sampleInvoices.filter(invoice => {
    const matchesSearch = 
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDateRange = 
      (!startDate || invoice.date >= startDate) && 
      (!endDate || invoice.date <= endDate);
    
    return matchesSearch && matchesDateRange;
  });

  const handleViewInvoice = (invoiceId: string) => {
    setSelectedInvoice(invoiceId === selectedInvoice ? null : invoiceId);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Invoice History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input
                className="pl-10"
                placeholder="Search invoices by ID or customer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input
                className="pl-10"
                type="date"
                placeholder="Start date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input
                className="pl-10"
                type="date"
                placeholder="End date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice #</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.length > 0 ? (
                  filteredInvoices.map(invoice => (
                    <React.Fragment key={invoice.id}>
                      <TableRow>
                        <TableCell>{invoice.id}</TableCell>
                        <TableCell>{new Date(invoice.date).toLocaleDateString("en-IN")}</TableCell>
                        <TableCell>{invoice.customerName}</TableCell>
                        <TableCell>₹{invoice.amount.toFixed(2)}</TableCell>
                        <TableCell>{invoice.paymentMethod}</TableCell>
                        <TableCell>{invoice.gstin ? "B2B" : "B2C"}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleViewInvoice(invoice.id)}
                            >
                              <FileText className="h-4 w-4 mr-1" />
                              View
                              <ChevronDown className="h-4 w-4 ml-1" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      {selectedInvoice === invoice.id && (
                        <TableRow>
                          <TableCell colSpan={7} className="bg-muted/30">
                            <div className="p-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                                <div>
                                  <p className="text-sm font-medium">Invoice Details</p>
                                  <p className="text-sm">Invoice #: {invoice.id}</p>
                                  <p className="text-sm">Date: {new Date(invoice.date).toLocaleDateString("en-IN")}</p>
                                  <p className="text-sm">Status: {invoice.status}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Customer Information</p>
                                  <p className="text-sm">Name: {invoice.customerName}</p>
                                  {invoice.gstin && (
                                    <p className="text-sm">GSTIN: {invoice.gstin}</p>
                                  )}
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Payment Information</p>
                                  <p className="text-sm">Amount: ₹{invoice.amount.toFixed(2)}</p>
                                  <p className="text-sm">Method: {invoice.paymentMethod}</p>
                                  <p className="text-sm">Type: {invoice.gstin ? "B2B" : "B2C"}</p>
                                </div>
                              </div>
                              <div className="flex justify-end space-x-2 mt-4">
                                <Button size="sm" variant="outline">
                                  <Download className="h-4 w-4 mr-1" />
                                  Download
                                </Button>
                                <Button size="sm">
                                  <Share2 className="h-4 w-4 mr-1" />
                                  Share
                                </Button>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6">
                      No invoices found matching your search criteria
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>GST Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-auto py-8 flex flex-col items-center justify-center space-y-2">
              <div className="text-xl font-semibold">GSTR-1</div>
              <div className="text-sm text-muted-foreground">Outward Supplies</div>
            </Button>
            <Button className="h-auto py-8 flex flex-col items-center justify-center space-y-2" variant="outline">
              <div className="text-xl font-semibold">GSTR-3B</div>
              <div className="text-sm text-muted-foreground">Summary Return</div>
            </Button>
            <Button className="h-auto py-8 flex flex-col items-center justify-center space-y-2" variant="outline">
              <div className="text-xl font-semibold">HSN Summary</div>
              <div className="text-sm text-muted-foreground">Item-wise Summary</div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvoiceHistory;
