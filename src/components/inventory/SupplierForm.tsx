
import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/custom/Card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import TransitionWrapper from "@/components/ui/custom/TransitionWrapper";

interface SupplierFormProps {
  onSuccess: () => void;
}

const SupplierForm: React.FC<SupplierFormProps> = ({ onSuccess }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here we would normally save the data to state or database
    console.log("Supplier form submitted");
    onSuccess();
    // Reset form
    e.currentTarget.reset();
  };

  return (
    <TransitionWrapper animation="fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <UserPlus className="mr-2 h-5 w-5" />
            Add Supplier
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="supplierName">Supplier Name</Label>
              <Input id="supplierName" placeholder="Enter supplier name" required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="contactPerson">Contact Person</Label>
              <Input id="contactPerson" placeholder="Enter contact person name" required />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="Enter phone number" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter email address" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea id="address" placeholder="Enter supplier address" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="items">Items Supplied (comma separated)</Label>
              <Input id="items" placeholder="Rice, Chicken, Oil, etc." required />
            </div>
          </CardContent>
          
          <CardFooter>
            <Button type="submit" className="w-full">
              Add Supplier
            </Button>
          </CardFooter>
        </form>
      </Card>
    </TransitionWrapper>
  );
};

export default SupplierForm;
