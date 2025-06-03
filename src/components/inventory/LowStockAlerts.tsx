
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/custom/Card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { PackageMinus, Truck, Clock, ReceiptText } from "lucide-react";
import { Button } from "@/components/ui/button";
import TransitionWrapper from "@/components/ui/custom/TransitionWrapper";
import { InventoryItem } from "./InventoryList";

const sampleLowStockItems: InventoryItem[] = [
  {
    id: "item2",
    name: "Chicken Breast",
    category: "Meat",
    quantity: 8,
    unit: "kg",
    supplier: "Fresh Meat Suppliers",
    purchaseDate: "2024-02-25",
    expiryDate: "2024-03-05",
    cost: 2400,
    status: "Low Stock"
  },
  {
    id: "item4",
    name: "Mayonnaise",
    category: "Sauce",
    quantity: 2,
    unit: "liters",
    supplier: "Condiment Kings",
    purchaseDate: "2024-02-10",
    expiryDate: "2024-05-10",
    cost: 800,
    status: "Low Stock"
  },
  {
    id: "item5",
    name: "Tomatoes",
    category: "Raw Ingredient",
    quantity: 0,
    unit: "kg",
    supplier: "Fresh Farms Ltd",
    purchaseDate: "2024-02-22",
    cost: 600,
    status: "Out of Stock"
  }
];

// Sample expiring items
const sampleExpiringItems = [
  {
    id: "item2",
    name: "Chicken Breast",
    expiryDate: "2024-03-05",
    daysLeft: 3
  }
];

const LowStockAlerts: React.FC = () => {
  return (
    <TransitionWrapper animation="fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PackageMinus className="mr-2 h-5 w-5" />
              Low & Out of Stock Items
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {sampleLowStockItems.map((item) => (
              <Alert key={item.id} variant={item.status === "Out of Stock" ? "destructive" : "default"}>
                <PackageMinus className="h-4 w-4" />
                <AlertTitle className="font-medium flex items-center justify-between">
                  {item.name}
                  <span className="text-sm font-normal">
                    {item.quantity} {item.unit} remaining
                  </span>
                </AlertTitle>
                <AlertDescription className="flex items-center justify-between mt-2">
                  <span className="text-sm">Supplier: {item.supplier}</span>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Truck className="h-3 w-3" />
                    Reorder
                  </Button>
                </AlertDescription>
              </Alert>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                Expiring Soon
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {sampleExpiringItems.length > 0 ? (
                sampleExpiringItems.map((item) => (
                  <Alert key={item.id} variant={item.daysLeft <= 2 ? "destructive" : "default"}>
                    <Clock className="h-4 w-4" />
                    <AlertTitle className="font-medium flex items-center justify-between">
                      {item.name}
                      <span className="text-sm font-normal">
                        Expires in {item.daysLeft} days
                      </span>
                    </AlertTitle>
                    <AlertDescription className="flex items-center justify-between mt-2">
                      <span className="text-sm">Expiry: {new Date(item.expiryDate).toLocaleDateString()}</span>
                    </AlertDescription>
                  </Alert>
                ))
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  <p>No items expiring soon</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ReceiptText className="mr-2 h-5 w-5" />
                Weekly Stock Report
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Button variant="outline" className="w-full">
                  Generate Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </TransitionWrapper>
  );
};

export default LowStockAlerts;
