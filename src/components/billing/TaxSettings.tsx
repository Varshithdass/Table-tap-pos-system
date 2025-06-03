
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/custom/Card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Save, Trash2, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from "@/components/ui/table";

interface TaxCategory {
  id: string;
  name: string;
  hsnCode: string;
  rate: number;
  description: string;
}

const TaxSettings = () => {
  // Sample tax categories based on Indian GST
  const defaultTaxCategories: TaxCategory[] = [
    {
      id: "1",
      name: "GST 0%",
      hsnCode: "Various",
      rate: 0,
      description: "Essential items, fresh produce, milk, etc."
    },
    {
      id: "2",
      name: "GST 5%",
      hsnCode: "1006, 1905",
      rate: 5,
      description: "Essential packaged food items, tea, sugar, etc."
    },
    {
      id: "3",
      name: "GST 12%",
      hsnCode: "2106, 2202",
      rate: 12,
      description: "Processed food, beverages, etc."
    },
    {
      id: "4",
      name: "GST 18%",
      hsnCode: "Various",
      rate: 18,
      description: "Standard rate for most items"
    },
    {
      id: "5",
      name: "GST 28%",
      hsnCode: "Various",
      rate: 28,
      description: "Luxury items"
    }
  ];

  const [taxCategories, setTaxCategories] = useState<TaxCategory[]>(defaultTaxCategories);
  const [newCategory, setNewCategory] = useState<TaxCategory>({
    id: "",
    name: "",
    hsnCode: "",
    rate: 0,
    description: ""
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [businessInfo, setBusinessInfo] = useState({
    gstin: "27AADCB2230M1ZT",
    gstType: "Regular",
    panNumber: "AADCB2230M",
    businessName: "Biryani Palace",
    address: "123 Main Street, Mumbai, Maharashtra",
    placeOfSupply: "Maharashtra"
  });
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleAddCategory = () => {
    if (!newCategory.name || newCategory.rate < 0) return;
    
    const newId = String(Date.now());
    setTaxCategories([...taxCategories, {...newCategory, id: newId}]);
    setNewCategory({
      id: "",
      name: "",
      hsnCode: "",
      rate: 0,
      description: ""
    });
  };

  const handleEditCategory = (category: TaxCategory) => {
    setEditingId(category.id);
    setNewCategory({...category});
  };

  const handleUpdateCategory = () => {
    if (!editingId) return;
    
    setTaxCategories(taxCategories.map(cat => 
      cat.id === editingId ? newCategory : cat
    ));
    setEditingId(null);
    setNewCategory({
      id: "",
      name: "",
      hsnCode: "",
      rate: 0,
      description: ""
    });
  };

  const handleDeleteCategory = (id: string) => {
    setTaxCategories(taxCategories.filter(cat => cat.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setNewCategory({
        id: "",
        name: "",
        hsnCode: "",
        rate: 0,
        description: ""
      });
    }
  };

  const handleSaveSettings = () => {
    // In a real app, this would save to your database
    console.log("Saving tax settings:", { taxCategories, businessInfo });
    
    // Show success message
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {saveSuccess && (
        <Alert className="bg-green-50 border-green-200 text-green-800">
          <AlertDescription>
            Tax settings saved successfully!
          </AlertDescription>
        </Alert>
      )}
      
      <Card>
        <CardHeader>
          <CardTitle>Business GST Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="gstin">GSTIN</Label>
              <Input 
                id="gstin" 
                value={businessInfo.gstin}
                onChange={(e) => setBusinessInfo({...businessInfo, gstin: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="gst-type">GST Registration Type</Label>
              <select
                id="gst-type"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={businessInfo.gstType}
                onChange={(e) => setBusinessInfo({...businessInfo, gstType: e.target.value})}
              >
                <option value="Regular">Regular</option>
                <option value="Composition">Composition</option>
                <option value="Unregistered">Unregistered</option>
              </select>
            </div>
            <div>
              <Label htmlFor="pan">PAN Number</Label>
              <Input 
                id="pan" 
                value={businessInfo.panNumber}
                onChange={(e) => setBusinessInfo({...businessInfo, panNumber: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="business-name">Legal Business Name</Label>
              <Input 
                id="business-name" 
                value={businessInfo.businessName}
                onChange={(e) => setBusinessInfo({...businessInfo, businessName: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="business-address">Business Address</Label>
              <Input 
                id="business-address" 
                value={businessInfo.address}
                onChange={(e) => setBusinessInfo({...businessInfo, address: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="place-of-supply">Default Place of Supply</Label>
              <select
                id="place-of-supply"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={businessInfo.placeOfSupply}
                onChange={(e) => setBusinessInfo({...businessInfo, placeOfSupply: e.target.value})}
              >
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Delhi">Delhi</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Telangana">Telangana</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="West Bengal">West Bengal</option>
                {/* Add other Indian states */}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tax Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 rounded-md bg-blue-50 border border-blue-200 p-4">
            <div className="flex">
              <Info className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
              <div className="text-blue-800 text-sm">
                <p className="font-medium mb-1">GST Information</p>
                <p>For intra-state transactions, the total GST rate is split equally into CGST and SGST.</p>
                <p>For inter-state transactions, the full rate is applied as IGST.</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {/* Add/Edit Tax Category Form */}
            <div className="border rounded-md p-4">
              <h3 className="text-base font-medium mb-4">
                {editingId ? "Edit Tax Category" : "Add New Tax Category"}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor="tax-name">Category Name</Label>
                  <Input 
                    id="tax-name" 
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                    placeholder="e.g., GST 5%"
                  />
                </div>
                <div>
                  <Label htmlFor="tax-hsn">HSN/SAC Codes</Label>
                  <Input 
                    id="tax-hsn" 
                    value={newCategory.hsnCode}
                    onChange={(e) => setNewCategory({...newCategory, hsnCode: e.target.value})}
                    placeholder="e.g., 1006, 2106"
                  />
                </div>
                <div>
                  <Label htmlFor="tax-rate">Tax Rate (%)</Label>
                  <Input 
                    id="tax-rate" 
                    type="number"
                    value={newCategory.rate}
                    onChange={(e) => setNewCategory({...newCategory, rate: parseFloat(e.target.value)})}
                    min="0"
                    max="100"
                    step="0.01"
                  />
                </div>
                <div>
                  <Label htmlFor="tax-desc">Description</Label>
                  <Input 
                    id="tax-desc" 
                    value={newCategory.description}
                    onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                    placeholder="Items covered under this tax category"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                {editingId ? (
                  <div className="space-x-2">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setEditingId(null);
                        setNewCategory({
                          id: "",
                          name: "",
                          hsnCode: "",
                          rate: 0,
                          description: ""
                        });
                      }}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleUpdateCategory}>
                      Update Category
                    </Button>
                  </div>
                ) : (
                  <Button onClick={handleAddCategory}>
                    <Plus className="h-4 w-4 mr-1" /> Add Category
                  </Button>
                )}
              </div>
            </div>

            {/* Tax Categories List */}
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category Name</TableHead>
                    <TableHead>HSN/SAC Codes</TableHead>
                    <TableHead>Rate</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {taxCategories.map(category => (
                    <TableRow key={category.id}>
                      <TableCell className="font-medium">{category.name}</TableCell>
                      <TableCell>{category.hsnCode}</TableCell>
                      <TableCell>{category.rate}%</TableCell>
                      <TableCell>{category.description}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleEditCategory(category)}
                          >
                            Edit
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="text-destructive"
                            onClick={() => handleDeleteCategory(category.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="ml-auto" onClick={handleSaveSettings}>
            <Save className="h-4 w-4 mr-2" /> Save Tax Settings
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TaxSettings;
