
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/custom/Card";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  PackageCheck, 
  PackageMinus,
  AlertTriangle 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import TransitionWrapper from "@/components/ui/custom/TransitionWrapper";

// Define the InventoryItem interface
export interface InventoryItem {
  id: string;
  name: string;
  category: "Meat" | "Raw Ingredient" | "Packaging" | "Sauce" | "Bakery";
  quantity: number;
  unit: string;
  supplier: string;
  purchaseDate: string;
  expiryDate?: string;
  cost: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
}

// Sample inventory data
const sampleInventory: InventoryItem[] = [
  {
    id: "item1",
    name: "Basmati Rice",
    category: "Raw Ingredient",
    quantity: 45,
    unit: "kg",
    supplier: "ABC Foods Pvt Ltd",
    purchaseDate: "2024-02-20",
    cost: 4000,
    status: "In Stock"
  },
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
    id: "item3",
    name: "Packaging Containers",
    category: "Packaging",
    quantity: 350,
    unit: "pieces",
    supplier: "PackWell Industries",
    purchaseDate: "2024-02-15",
    cost: 3500,
    status: "In Stock"
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
  },
  {
    id: "item6",
    name: "Chocolate Fondant",
    category: "Bakery",
    quantity: 5,
    unit: "kg",
    supplier: "Bakers Paradise",
    purchaseDate: "2024-02-18",
    expiryDate: "2024-04-18",
    cost: 1500,
    status: "In Stock"
  }
];

const InventoryList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [inventory] = useState<InventoryItem[]>(sampleInventory);
  
  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.supplier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: InventoryItem["status"]) => {
    switch (status) {
      case "In Stock":
        return <Badge className="bg-green-500">{status}</Badge>;
      case "Low Stock":
        return <Badge className="bg-yellow-500">{status}</Badge>;
      case "Out of Stock":
        return <Badge className="bg-red-500">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <TransitionWrapper animation="fade-in">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center">
            <PackageCheck className="mr-2 h-5 w-5" />
            Inventory Items
          </CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search inventory..."
                className="w-[200px] sm:w-[300px] pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Purchase Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInventory.length > 0 ? (
                  filteredInventory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>
                        {item.quantity} {item.unit}
                        {item.expiryDate && (
                          <div className="text-xs text-muted-foreground mt-1 flex items-center">
                            <AlertTriangle className="h-3 w-3 mr-1 text-yellow-500" />
                            Expires: {new Date(item.expiryDate).toLocaleDateString()}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>{item.supplier}</TableCell>
                      <TableCell>{new Date(item.purchaseDate).toLocaleDateString()}</TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <PackageMinus className="h-10 w-10 mb-2" />
                        <p>No inventory items found</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </TransitionWrapper>
  );
};

export default InventoryList;
