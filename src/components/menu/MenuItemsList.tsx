import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/custom/Card";
import { Search, Edit, Trash, Coffee, Pizza, Utensils, Image, IndianRupee } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import TransitionWrapper from "@/components/ui/custom/TransitionWrapper";
import { useNavigate } from "react-router-dom";

// Sample menu items data
const initialMenuItems = [
  {
    id: "1",
    name: "Paneer Tikka Masala",
    price: 250,
    category: "North Indian",
    available: true,
    image: "/placeholder.svg",
    description: "Succulent paneer in spicy tomato gravy",
    hasModifiers: true,
    tax: "GST 5%",
  },
  {
    id: "2",
    name: "Chicken Biryani",
    price: 220,
    category: "Rice Dishes",
    available: true,
    image: "/placeholder.svg",
    description: "Fragrant rice with tender chicken pieces",
    hasModifiers: true,
    tax: "GST 5%",
  },
  {
    id: "3",
    name: "Masala Dosa",
    price: 150,
    category: "South Indian",
    available: true,
    image: "/placeholder.svg",
    description: "Crispy dosa filled with spiced potato mixture",
    hasModifiers: false,
    tax: "GST 5%",
  },
];

const MenuItemsList = () => {
  const [menuItems, setMenuItems] = useState(initialMenuItems);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();
  
  // Get unique categories
  const categories = ["All", ...new Set(menuItems.map(item => item.category))];
  
  // Filter menu items based on search and category
  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  // Toggle item availability
  const toggleAvailability = (id: string) => {
    setMenuItems(menuItems.map(item => 
      item.id === id ? { ...item, available: !item.available } : item
    ));
  };
  
  // Delete item (with confirmation in a real app)
  const deleteItem = (id: string) => {
    if (window.confirm("Are you sure you want to delete this item? This action cannot be undone.")) {
      setMenuItems(menuItems.filter(item => item.id !== id));
    }
  };

  // Edit item - navigate to edit form
  const editItem = (id: string) => {
    navigate('/menu-management?tab=add&editId=' + id);
  };

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "North Indian":
      case "South Indian":
        return <Utensils className="h-4 w-4 mr-1" />;
      case "Rice Dishes":
        return <Coffee className="h-4 w-4 mr-1" />;
      default:
        return <Pizza className="h-4 w-4 mr-1" />;
    }
  };

  return (
    <TransitionWrapper animation="fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Menu Items</span>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-2.5 top-2.5 text-muted-foreground" />
                <Input
                  placeholder="Search items..."
                  className="pl-8 w-[200px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map(category => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
          
          <div className="space-y-4">
            {filteredItems.length > 0 ? (
              filteredItems.map(item => (
                <div key={item.id} className="border rounded-lg p-4 flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex gap-3">
                    <div className="h-16 w-16 rounded bg-gray-100 flex items-center justify-center">
                      <Image className="h-8 w-8 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{item.name}</h3>
                        {item.hasModifiers && (
                          <Badge variant="outline" className="text-xs">Has Add-ons</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        {getCategoryIcon(item.category)}
                        {item.category}
                      </div>
                      <div className="flex items-center mt-1 font-medium text-primary">
                        <IndianRupee className="h-3.5 w-3.5 mr-0.5" />
                        {item.price.toFixed(2)}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">{item.tax}</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row items-center gap-3">
                    <div className="flex items-center gap-2">
                      <Switch
                        id={`available-${item.id}`}
                        checked={item.available}
                        onCheckedChange={() => toggleAvailability(item.id)}
                      />
                      <Label htmlFor={`available-${item.id}`} className="text-sm">
                        {item.available ? "Available" : "Unavailable"}
                      </Label>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              size="icon" 
                              variant="outline"
                              onClick={() => editItem(item.id)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Edit item</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              size="icon" 
                              variant="outline" 
                              className="text-destructive hover:text-destructive"
                              onClick={() => deleteItem(item.id)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Delete item</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No menu items found. Try adjusting your search or category filter.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </TransitionWrapper>
  );
};

export default MenuItemsList;
