
import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/custom/Card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { UserPlus } from "lucide-react";
import TransitionWrapper from "@/components/ui/custom/TransitionWrapper";
import { useToast } from "@/hooks/use-toast";

interface StaffFormProps {
  onSuccess: () => void;
}

const StaffForm: React.FC<StaffFormProps> = ({ onSuccess }) => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // In a real app, we would save this to a database
    console.log("Staff form submitted");
    
    toast({
      title: "Staff Added",
      description: "New staff member has been added successfully.",
    });
    
    onSuccess();
    
    // Reset form - using HTMLFormElement
    e.currentTarget.reset();
  };

  return (
    <TransitionWrapper animation="fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <UserPlus className="mr-2 h-5 w-5" />
            Add New Staff Member
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="employeeId">Employee ID</Label>
                <Input id="employeeId" placeholder="ST001" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" placeholder="Enter full name" required />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select name="role" defaultValue="chef">
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="chef">Chef</SelectItem>
                    <SelectItem value="helper">Kitchen Helper</SelectItem>
                    <SelectItem value="cleaner">Cleaner</SelectItem>
                    <SelectItem value="cashier">Cashier</SelectItem>
                    <SelectItem value="orderManager">Order Manager</SelectItem>
                    <SelectItem value="delivery">Delivery Staff</SelectItem>
                    <SelectItem value="kitchenManager">Kitchen Manager</SelectItem>
                    <SelectItem value="operationsHead">Operations Head</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="joiningDate">Date of Joining</Label>
                <Input id="joiningDate" type="date" required />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="shiftStart">Shift Start</Label>
                <Input id="shiftStart" type="time" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="shiftEnd">Shift End</Label>
                <Input id="shiftEnd" type="time" required />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="salary">Monthly Salary (₹)</Label>
                <Input id="salary" type="number" placeholder="25000" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Contact Number</Label>
                <Input id="phone" placeholder="9876543210" required />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="emergencyContact">Emergency Contact</Label>
                <Input id="emergencyContact" placeholder="9876543211" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="upiId">UPI ID / Bank Details</Label>
                <Input id="upiId" placeholder="name@upi" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" placeholder="Enter full address" required />
            </div>
          </CardContent>
          
          <CardFooter>
            <Button type="submit" className="w-full">
              Add Staff Member
            </Button>
          </CardFooter>
        </form>
      </Card>
    </TransitionWrapper>
  );
};

export default StaffForm;
