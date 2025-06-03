
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/custom/Card";
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
import { Search, UserPlus, Edit, Trash2, Phone, Mail } from "lucide-react";
import TransitionWrapper from "@/components/ui/custom/TransitionWrapper";
import { toast } from "@/hooks/use-toast";

// Sample customer data
const sampleCustomers = [
  {
    id: "CUST001",
    name: "Rajesh Kumar",
    phone: "+91 98765 43210",
    email: "rajesh.kumar@example.com",
    preferences: ["Vegetarian", "Spicy Food Lover"],
    language: "Hindi",
    lastVisit: "2024-05-02",
    specialDates: {
      birthday: "1985-08-15",
      anniversary: "2010-11-22"
    }
  },
  {
    id: "CUST002",
    name: "Priya Sharma",
    phone: "+91 87654 32109",
    email: "priya.s@example.com",
    preferences: ["Non-Veg", "North Indian"],
    language: "English",
    lastVisit: "2024-05-03",
    specialDates: {
      birthday: "1990-04-10"
    }
  },
  {
    id: "CUST003",
    name: "Mohammed Ansari",
    phone: "+91 76543 21098",
    email: "m.ansari@example.com",
    preferences: ["Non-Veg", "Biryani Lover"],
    language: "Hindi",
    lastVisit: "2024-04-28",
    specialDates: {
      birthday: "1983-06-21",
      anniversary: "2008-12-05"
    }
  },
  {
    id: "CUST004",
    name: "Ananya Patel",
    phone: "+91 65432 10987",
    email: "ananya.p@example.com",
    preferences: ["Jain", "Sweet Tooth"],
    language: "Gujarati",
    lastVisit: "2024-05-01",
    specialDates: {
      birthday: "1992-01-30"
    }
  },
  {
    id: "CUST005",
    name: "Suresh Reddy",
    phone: "+91 54321 09876",
    email: "suresh.r@example.com",
    preferences: ["Non-Veg", "South Indian"],
    language: "Telugu",
    lastVisit: "2024-04-25",
    specialDates: {
      birthday: "1988-09-14",
      anniversary: "2015-02-28"
    }
  }
];

const CustomerDatabase = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter customers based on search term
  const filteredCustomers = sampleCustomers.filter(customer => {
    return (
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleMailClick = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  const handlePhoneClick = (phone: string) => {
    // Format the phone number for WhatsApp by removing spaces and special characters
    const formattedPhone = phone.replace(/\s+/g, '').replace(/[+]/g, '');
    window.open(`https://wa.me/${formattedPhone}`, '_blank');
  };

  return (
    <TransitionWrapper animation="fade-in">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Customer Database</CardTitle>
          <Button size="sm">
            <UserPlus className="h-4 w-4 mr-2" />
            Add Customer
          </Button>
        </CardHeader>
        <CardContent>
          <div className="mb-6 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              className="pl-10"
              placeholder="Search customers by name, phone or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="overflow-x-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Preferences</TableHead>
                  <TableHead>Last Visit</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map(customer => (
                    <TableRow key={customer.id}>
                      <TableCell>{customer.id}</TableCell>
                      <TableCell>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-xs text-muted-foreground">
                          Language: {customer.language}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div 
                          className="flex items-center text-sm cursor-pointer hover:text-primary transition-colors"
                          onClick={() => handlePhoneClick(customer.phone)}
                        >
                          <Phone className="h-3 w-3 mr-1" />
                          {customer.phone}
                        </div>
                        <div 
                          className="flex items-center text-sm mt-1 cursor-pointer hover:text-primary transition-colors"
                          onClick={() => handleMailClick(customer.email)}
                        >
                          <Mail className="h-3 w-3 mr-1" />
                          {customer.email}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {customer.preferences.map((pref, index) => (
                            <span 
                              key={index} 
                              className="inline-block px-2 py-1 text-xs bg-muted rounded-full"
                            >
                              {pref}
                            </span>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(customer.lastVisit).toLocaleDateString("en-IN")}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6">
                      No customers found matching your search criteria
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

export default CustomerDatabase;
