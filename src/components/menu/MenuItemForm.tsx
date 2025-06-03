
import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/custom/Card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle, Minus, X, Image as ImageIcon, IndianRupee } from "lucide-react";
import TransitionWrapper from "@/components/ui/custom/TransitionWrapper";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { useLocation, useNavigate } from "react-router-dom";

const categories = [
  "North Indian",
  "South Indian",
  "Chinese",
  "Rice Dishes",
  "Beverages",
  "Desserts",
];

const taxRates = [
  { label: "GST 5%", value: "5" },
  { label: "GST 12%", value: "12" },
  { label: "GST 18%", value: "18" },
  { label: "No Tax", value: "0" },
];

// Sample menu items data for editing (normally would be fetched from API)
const menuItems = [
  {
    id: "1",
    name: "Paneer Tikka Masala",
    price: 250,
    category: "North Indian",
    available: true,
    image: null,
    description: "Succulent paneer in spicy tomato gravy",
    hasModifiers: true,
    tax: "5",
    modifiers: [
      {
        id: "mod1",
        name: "Extra Cheese",
        price: 30,
        type: "single",
        required: false,
      },
      {
        id: "mod2",
        name: "Spice Level",
        price: 0,
        type: "single",
        required: true,
      }
    ]
  },
  {
    id: "2",
    name: "Chicken Biryani",
    price: 220,
    category: "Rice Dishes",
    available: true,
    image: null,
    description: "Fragrant rice with tender chicken pieces",
    hasModifiers: true,
    tax: "5",
    modifiers: []
  },
  {
    id: "3",
    name: "Masala Dosa",
    price: 150,
    category: "South Indian",
    available: true,
    image: null,
    description: "Crispy dosa filled with spiced potato mixture",
    hasModifiers: false,
    tax: "5",
    modifiers: []
  },
];

const MenuItemForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    price: "",
    category: "",
    description: "",
    tax: "",
    available: true,
    image: null as File | null,
    imagePreview: null as string | null,
  });

  const [modifiers, setModifiers] = useState<any[]>([]);
  const [showModifierForm, setShowModifierForm] = useState(false);
  const [newModifier, setNewModifier] = useState({
    name: "",
    price: "",
    type: "single",
    required: false,
  });
  
  const [isEditMode, setIsEditMode] = useState(false);

  // Parse URL parameters to check if we're editing an item
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const editId = searchParams.get('editId');
    
    if (editId) {
      // Find the item we're editing
      const itemToEdit = menuItems.find(item => item.id === editId);
      
      if (itemToEdit) {
        setIsEditMode(true);
        setFormData({
          id: itemToEdit.id,
          name: itemToEdit.name,
          price: itemToEdit.price.toString(),
          category: itemToEdit.category,
          description: itemToEdit.description || "",
          tax: itemToEdit.tax || "",
          available: itemToEdit.available,
          image: null,
          imagePreview: null,
        });
        
        // Set modifiers if any
        if (itemToEdit.modifiers) {
          setModifiers(itemToEdit.modifiers);
        }
      }
    }
  }, [location]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, available: checked }));
  };

  const handleAddModifier = () => {
    if (!newModifier.name) {
      toast({
        title: "Error",
        description: "Modifier name is required",
        variant: "destructive",
      });
      return;
    }
    
    setModifiers([
      ...modifiers,
      {
        ...newModifier,
        id: Date.now().toString(),
        price: newModifier.price ? parseFloat(newModifier.price) : 0,
      },
    ]);
    
    setNewModifier({
      name: "",
      price: "",
      type: "single",
      required: false,
    });
    
    setShowModifierForm(false);
  };

  const removeModifier = (id: string) => {
    setModifiers(modifiers.filter(mod => mod.id !== id));
  };

  const handleImageClick = () => {
    // Trigger file input click
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a preview URL
      const previewUrl = URL.createObjectURL(file);
      setFormData(prev => ({
        ...prev,
        image: file,
        imagePreview: previewUrl,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally save the data
    
    toast({
      title: "Success",
      description: isEditMode 
        ? "Menu item updated successfully" 
        : "Menu item added successfully",
    });
    
    // Reset form and navigate back to items list
    setTimeout(() => {
      navigate('/menu-management?tab=items');
    }, 1500);
  };

  return (
    <TransitionWrapper animation="fade-in">
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>{isEditMode ? "Edit Menu Item" : "Add New Menu Item"}</CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Basic Information</h3>
              
              <div className="space-y-2">
                <Label htmlFor="name">Item Name</Label>
                <Input 
                  id="name" 
                  placeholder="e.g., Paneer Tikka Masala" 
                  required 
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (₹)</Label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input 
                      id="price" 
                      type="number" 
                      min="0" 
                      step="0.01" 
                      className="pl-10" 
                      placeholder="250.00" 
                      required
                      value={formData.price}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => handleSelectChange("category", value)}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the item in a few words"
                  className="resize-none"
                  maxLength={200}
                  value={formData.description}
                  onChange={handleInputChange}
                />
                <p className="text-xs text-muted-foreground">Max 200 characters</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tax">Tax</Label>
                  <Select 
                    value={formData.tax}
                    onValueChange={(value) => handleSelectChange("tax", value)}
                  >
                    <SelectTrigger id="tax">
                      <SelectValue placeholder="Select tax rate" />
                    </SelectTrigger>
                    <SelectContent>
                      {taxRates.map((tax) => (
                        <SelectItem key={tax.value} value={tax.value}>
                          {tax.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="available">Available</Label>
                    <Switch 
                      id="available" 
                      checked={formData.available}
                      onCheckedChange={handleSwitchChange}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Toggle if the item is currently available</p>
                </div>
              </div>
            </div>
            
            <Separator />
            
            {/* Image Upload */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Item Image</h3>
              
              <div 
                className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center bg-muted/50 cursor-pointer"
                onClick={handleImageClick}
              >
                {formData.imagePreview ? (
                  <div className="flex flex-col items-center">
                    <img 
                      src={formData.imagePreview} 
                      alt="Item preview" 
                      className="max-h-48 max-w-full object-contain mb-3"
                    />
                    <p className="text-sm text-center text-muted-foreground">
                      Click to change image
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="mb-3">
                      <ImageIcon className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-center text-muted-foreground mb-3">
                      Drag & drop your image here, or click to browse
                    </p>
                    <p className="text-xs text-center text-muted-foreground mb-4">
                      Supported formats: JPG, PNG, WEBP (max 5MB)
                    </p>
                    <Button type="button" variant="outline" size="sm">
                      Browse Files
                    </Button>
                  </>
                )}
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
            </div>
            
            <Separator />
            
            {/* Add-ons (Modifiers) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Add-ons (Modifiers)</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowModifierForm(true)}
                  className={showModifierForm ? "hidden" : ""}
                >
                  <PlusCircle className="h-4 w-4 mr-1" />
                  Add Modifier
                </Button>
              </div>
              
              {showModifierForm && (
                <Card className="border border-blue-200 bg-blue-50/50">
                  <CardContent className="pt-4 space-y-3">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">New Modifier</h4>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowModifierForm(false)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="modifierName">Name</Label>
                      <Input
                        id="modifierName"
                        placeholder="e.g., Extra Cheese"
                        value={newModifier.name}
                        onChange={(e) => setNewModifier({ ...newModifier, name: e.target.value })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="modifierPrice">Price (₹)</Label>
                      <div className="relative">
                        <IndianRupee className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="modifierPrice"
                          type="number"
                          min="0"
                          step="0.01"
                          className="pl-10"
                          placeholder="50.00"
                          value={newModifier.price}
                          onChange={(e) => setNewModifier({ ...newModifier, price: e.target.value })}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="modifierType">Type</Label>
                      <Select
                        value={newModifier.type}
                        onValueChange={(value) => setNewModifier({ ...newModifier, type: value })}
                      >
                        <SelectTrigger id="modifierType">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="single">Single Select (Choose One)</SelectItem>
                          <SelectItem value="multi">Multi Select (Choose Many)</SelectItem>
                          <SelectItem value="text">Free Text (Custom Notes)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Switch
                        id="modifierRequired"
                        checked={newModifier.required}
                        onCheckedChange={(checked) => setNewModifier({ ...newModifier, required: checked })}
                      />
                      <Label htmlFor="modifierRequired">Required</Label>
                    </div>
                    
                    <div className="flex justify-end pt-2">
                      <Button type="button" onClick={handleAddModifier}>
                        Add Modifier
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {modifiers.length > 0 ? (
                <div className="space-y-3">
                  {modifiers.map((mod) => (
                    <div key={mod.id} className="flex items-center justify-between bg-background rounded-md border p-3">
                      <div>
                        <div className="font-medium">{mod.name}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <span>
                            {mod.type === "single"
                              ? "Single Select"
                              : mod.type === "multi"
                              ? "Multi Select"
                              : "Free Text"}
                          </span>
                          {mod.required && <span className="text-xs text-primary">(Required)</span>}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="font-medium text-primary flex items-center">
                          {mod.price > 0 ? (
                            <>
                              <IndianRupee className="h-3.5 w-3.5 mr-0.5" />
                              {mod.price.toFixed(2)}
                            </>
                          ) : (
                            <span className="text-muted-foreground text-sm">No charge</span>
                          )}
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive"
                          onClick={() => removeModifier(mod.id)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-muted-foreground border border-dashed rounded-md">
                  No modifiers added yet
                </div>
              )}
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-end gap-3">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => navigate('/menu-management?tab=items')}
            >
              Cancel
            </Button>
            <Button type="submit">
              {isEditMode ? "Save Changes" : "Add Menu Item"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </TransitionWrapper>
  );
};

export default MenuItemForm;
