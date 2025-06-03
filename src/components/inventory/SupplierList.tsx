
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
import { Search, Filter, Truck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import TransitionWrapper from "@/components/ui/custom/TransitionWrapper";

// Define the Supplier interface
export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  items: string[];
  lastPurchaseDate: string;
}

// Sample suppliers data
const sampleSuppliers: Supplier[] = [
  {
    id: "sup1",
    name: "ABC Foods Pvt Ltd",
    contactPerson: "Rajesh Kumar",
    phone: "9876543210",
    email: "rajesh@abcfoods.com",
    address: "123, Food Market, Delhi",
    items: ["Basmati Rice", "Wheat Flour", "Pulses"],
    lastPurchaseDate: "2024-02-20"
  },
  {
    id: "sup2",
    name: "Fresh Meat Suppliers",
    contactPerson: "Ahmed Khan",
    phone: "8765432109",
    email: "ahmed@freshmeats.com",
    address: "45, Meat Market, Mumbai",
    items: ["Chicken Breast", "Mutton", "Fish"],
    lastPurchaseDate: "2024-02-25"
  },
  {
    id: "sup3",
    name: "Fresh Farms Ltd",
    contactPerson: "Priya Sharma",
    phone: "7654321098",
    email: "priya@freshfarms.com",
    address: "78, Vegetable Market, Bangalore",
    items: ["Tomatoes", "Onions", "Vegetables"],
    lastPurchaseDate: "2024-02-22"
  },
  {
    id: "sup4",
    name: "PackWell Industries",
    contactPerson: "Suresh Patel",
    phone: "6543210987",
    email: "suresh@packwell.com",
    address: "90, Industrial Area, Ahmedabad",
    items: ["Packaging Containers", "Napkins", "Cutlery"],
    lastPurchaseDate: "2024-02-15"
  },
  {
    id: "sup5",
    name: "Condiment Kings",
    contactPerson: "Meera Singh",
    phone: "5432109876",
    email: "meera@condimentkings.com",
    address: "12, Spice Market, Chennai",
    items: ["Mayonnaise", "Ketchup", "Sauces"],
    lastPurchaseDate: "2024-02-10"
  },
  {
    id: "sup6",
    name: "Bakers Paradise",
    contactPerson: "Thomas Joseph",
    phone: "4321098765",
    email: "thomas@bakersparadise.com",
    address: "34, Bakery Lane, Kochi",
    items: ["Chocolate Fondant", "Baking Powder", "Cream"],
    lastPurchaseDate: "2024-02-18"
  }
];

const SupplierList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suppliers] = useState<Supplier[]>(sampleSuppliers);
  
  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.items.some(item => item.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <TransitionWrapper animation="fade-in">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center">
            <Truck className="mr-2 h-5 w-5" />
            Suppliers
          </CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search suppliers..."
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
                  <TableHead>Supplier Name</TableHead>
                  <TableHead>Contact Person</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Items Supplied</TableHead>
                  <TableHead>Last Purchase</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSuppliers.length > 0 ? (
                  filteredSuppliers.map((supplier) => (
                    <TableRow key={supplier.id}>
                      <TableCell className="font-medium">{supplier.name}</TableCell>
                      <TableCell>{supplier.contactPerson}</TableCell>
                      <TableCell>{supplier.phone}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {supplier.items.slice(0, 2).map((item, index) => (
                            <span key={index} className="text-xs bg-secondary py-1 px-2 rounded-full">
                              {item}
                            </span>
                          ))}
                          {supplier.items.length > 2 && (
                            <span className="text-xs bg-secondary py-1 px-2 rounded-full">
                              +{supplier.items.length - 2} more
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{new Date(supplier.lastPurchaseDate).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <Users className="h-10 w-10 mb-2" />
                        <p>No suppliers found</p>
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

export default SupplierList;
