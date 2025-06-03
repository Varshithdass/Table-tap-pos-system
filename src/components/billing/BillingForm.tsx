
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from "@/components/ui/table";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent,
  CardFooter 
} from "@/components/ui/custom/Card";
import { Search, Plus, Trash2, Calculator } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface BillItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  hsnCode: string;
  taxRate: number;
  discount: number;
}

const BillingForm = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState<BillItem[]>([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    email: "",
    gstin: ""
  });
  const [invoiceNumber, setInvoiceNumber] = useState(`INV-${Date.now().toString().slice(-8)}`);

  // Sample product data (in a real app, this would come from your inventory)
  const sampleProducts = [
    { id: "1", name: "Veg Biryani", price: 220, hsnCode: "1006", taxRate: 5 },
    { id: "2", name: "Chicken Biryani", price: 280, hsnCode: "1006", taxRate: 5 },
    { id: "3", name: "Paneer Butter Masala", price: 240, hsnCode: "2106", taxRate: 12 },
    { id: "4", name: "Naan", price: 40, hsnCode: "1905", taxRate: 5 },
    { id: "5", name: "Lassi", price: 80, hsnCode: "2202", taxRate: 12 }
  ];

  const addItemToBill = (product: any) => {
    const existingItem = items.find(item => item.id === product.id);
    
    if (existingItem) {
      setItems(items.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ));
    } else {
      setItems([...items, { 
        ...product, 
        quantity: 1,
        discount: 0
      }]);
    }
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItemQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) return;
    
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const updateItemDiscount = (id: string, discount: number) => {
    if (discount < 0 || discount > 100) return;
    
    setItems(items.map(item => 
      item.id === id ? { ...item, discount } : item
    ));
  };

  // Calculate subtotal
  const subtotal = items.reduce((sum, item) => 
    sum + (item.price * item.quantity * (1 - item.discount / 100)), 0);

  // Calculate tax amounts (CGST and SGST)
  const taxDetails = items.reduce((result, item) => {
    const itemTotal = item.price * item.quantity * (1 - item.discount / 100);
    const taxAmount = itemTotal * (item.taxRate / 100);
    
    // Split total tax into CGST and SGST (for intra-state)
    const halfTax = taxAmount / 2;
    
    result.cgst += halfTax;
    result.sgst += halfTax;
    result.totalTax += taxAmount;
    
    return result;
  }, { cgst: 0, sgst: 0, totalTax: 0 });

  // Calculate grand total
  const grandTotal = subtotal + taxDetails.totalTax;
  
  // Round to nearest rupee
  const roundedTotal = Math.round(grandTotal);
  const roundingAdjustment = roundedTotal - grandTotal;

  const handleGenerateBill = () => {
    // In a real app, this would save the bill to database and redirect to payment
    console.log({
      invoiceNumber,
      customerInfo,
      items,
      subtotal,
      taxes: taxDetails,
      grandTotal: roundedTotal,
      timestamp: new Date(),
      restaurant_id: user?.restaurant_id
    });
    
    // Reset form after generating bill (in a real app, you'd redirect to payment)
    alert("Bill generated successfully! Invoice #: " + invoiceNumber);
    setItems([]);
    setCustomerInfo({ name: "", phone: "", email: "", gstin: "" });
    setInvoiceNumber(`INV-${Date.now().toString().slice(-8)}`);
  };

  // Filter products based on search term
  const filteredProducts = sampleProducts.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column - Product Search and Selection */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Create New Bill</CardTitle>
            <CardDescription>
              Search items and add them to the current bill
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {/* Customer Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <Label htmlFor="customer-name">Customer Name</Label>
                <Input 
                  id="customer-name" 
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                  placeholder="Optional" 
                />
              </div>
              <div>
                <Label htmlFor="customer-phone">Phone Number</Label>
                <Input 
                  id="customer-phone" 
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                  placeholder="Optional" 
                />
              </div>
              <div>
                <Label htmlFor="customer-email">Email Address</Label>
                <Input 
                  id="customer-email" 
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                  placeholder="Optional" 
                />
              </div>
              <div>
                <Label htmlFor="customer-gstin">GSTIN (B2B Only)</Label>
                <Input 
                  id="customer-gstin" 
                  value={customerInfo.gstin}
                  onChange={(e) => setCustomerInfo({...customerInfo, gstin: e.target.value})}
                  placeholder="Optional" 
                />
              </div>
            </div>
            
            {/* Search Products */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input
                className="pl-10"
                placeholder="Search menu items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Product Results */}
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item Name</TableHead>
                    <TableHead>HSN/SAC</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Tax Rate</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                      <TableRow key={product.id}>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.hsnCode}</TableCell>
                        <TableCell>₹{product.price.toFixed(2)}</TableCell>
                        <TableCell>{product.taxRate}%</TableCell>
                        <TableCell>
                          <Button 
                            size="sm" 
                            onClick={() => addItemToBill(product)}
                            variant="ghost"
                          >
                            <Plus className="h-4 w-4 mr-1" /> Add
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4">
                        No items found. Try a different search term.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Right Column - Current Bill */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Current Bill</CardTitle>
            <CardDescription>
              Invoice #{invoiceNumber}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {/* Bill Items */}
            {items.length > 0 ? (
              <div className="space-y-4">
                {items.map(item => (
                  <div key={item.id} className="flex flex-col p-3 border rounded-md">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          HSN: {item.hsnCode} | Tax: {item.taxRate}%
                        </p>
                      </div>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => removeItem(item.id)}
                        className="text-destructive h-7 px-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      <div>
                        <Label htmlFor={`qty-${item.id}`} className="text-xs">Qty</Label>
                        <Input
                          id={`qty-${item.id}`}
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateItemQuantity(item.id, parseInt(e.target.value))}
                          className="h-8"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`disc-${item.id}`} className="text-xs">Disc %</Label>
                        <Input
                          id={`disc-${item.id}`}
                          type="number"
                          min="0"
                          max="100"
                          value={item.discount}
                          onChange={(e) => updateItemDiscount(item.id, parseInt(e.target.value))}
                          className="h-8"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Amount</Label>
                        <div className="h-8 flex items-center">
                          ₹{((item.price * item.quantity) * (1 - item.discount / 100)).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              
                {/* Bill Summary */}
                <div className="mt-6 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>CGST:</span>
                    <span>₹{taxDetails.cgst.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>SGST:</span>
                    <span>₹{taxDetails.sgst.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rounding:</span>
                    <span>₹{roundingAdjustment.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-medium pt-2 border-t">
                    <span>Total Amount:</span>
                    <span>₹{roundedTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center text-muted-foreground">
                No items added to bill yet. Search and add items from the left panel.
              </div>
            )}
          </CardContent>
          
          <CardFooter>
            <Button 
              className="w-full" 
              size="lg"
              disabled={items.length === 0}
              onClick={handleGenerateBill}
            >
              <Calculator className="mr-2 h-5 w-5" /> Generate Bill
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default BillingForm;
