
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/custom/Card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PackagePlus } from "lucide-react";
import TransitionWrapper from "@/components/ui/custom/TransitionWrapper";

interface InventoryFormProps {
  onSuccess: () => void;
}

const InventoryForm: React.FC<InventoryFormProps> = ({ onSuccess }) => {
  const [category, setCategory] = useState<string>("");
  const [showExpiryDate, setShowExpiryDate] = useState(false);

  // Handle category change
  const handleCategoryChange = (value: string) => {
    setCategory(value);
    // Show expiry date field for perishable items
    setShowExpiryDate(
      value === "Meat" || 
      value === "Sauce" || 
      value === "Bakery" || 
      value === "Raw Ingredient"
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here we would normally save the data to state or database
    console.log("Form submitted");
    onSuccess();
    // Reset form
    const form = e.currentTarget as HTMLFormElement;
    form.reset();
    setCategory("");
    setShowExpiryDate(false);
  };

  return (
    <TransitionWrapper animation="slide-in">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <PackagePlus className="mr-2 h-5 w-5" />
            Add Inventory
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="itemName">Item Name</Label>
              <Input id="itemName" placeholder="Enter item name" required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select required onValueChange={handleCategoryChange}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Meat">Meat</SelectItem>
                  <SelectItem value="Raw Ingredient">Raw Ingredient</SelectItem>
                  <SelectItem value="Packaging">Packaging</SelectItem>
                  <SelectItem value="Sauce">Sauce</SelectItem>
                  <SelectItem value="Bakery">Bakery</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input id="quantity" type="number" min="0" step="0.01" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="unit">Unit</Label>
                <Select required>
                  <SelectTrigger id="unit">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">kg</SelectItem>
                    <SelectItem value="liters">liters</SelectItem>
                    <SelectItem value="grams">grams</SelectItem>
                    <SelectItem value="pieces">pieces</SelectItem>
                    <SelectItem value="packets">packets</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="supplier">Supplier</Label>
              <Select required>
                <SelectTrigger id="supplier">
                  <SelectValue placeholder="Select supplier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ABC Foods Pvt Ltd">ABC Foods Pvt Ltd</SelectItem>
                  <SelectItem value="Fresh Meat Suppliers">Fresh Meat Suppliers</SelectItem>
                  <SelectItem value="Fresh Farms Ltd">Fresh Farms Ltd</SelectItem>
                  <SelectItem value="PackWell Industries">PackWell Industries</SelectItem>
                  <SelectItem value="Condiment Kings">Condiment Kings</SelectItem>
                  <SelectItem value="Bakers Paradise">Bakers Paradise</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="purchaseDate">Purchase Date</Label>
                <Input id="purchaseDate" type="date" required />
              </div>
              
              {showExpiryDate && (
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input id="expiryDate" type="date" />
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cost">Total Cost (₹)</Label>
              <Input id="cost" type="number" min="0" step="0.01" required />
            </div>
          </CardContent>
          
          <CardFooter>
            <Button type="submit" className="w-full">
              Add to Inventory
            </Button>
          </CardFooter>
        </form>
      </Card>
    </TransitionWrapper>
  );
};

export default InventoryForm;
