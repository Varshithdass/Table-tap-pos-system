
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/custom/Card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PlusCircle, Edit, Trash } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import TransitionWrapper from "@/components/ui/custom/TransitionWrapper";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const initialCategories = [
  { id: "1", name: "North Indian", count: 12 },
  { id: "2", name: "South Indian", count: 8 },
  { id: "3", name: "Chinese", count: 6 },
  { id: "4", name: "Rice Dishes", count: 4 },
  { id: "5", name: "Beverages", count: 10 },
  { id: "6", name: "Desserts", count: 5 },
];

const MenuCategories = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [newCategory, setNewCategory] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  const handleAddCategory = () => {
    if (!newCategory.trim()) {
      toast({
        title: "Error",
        description: "Category name cannot be empty",
        variant: "destructive",
      });
      return;
    }

    if (categories.some(cat => cat.name.toLowerCase() === newCategory.toLowerCase())) {
      toast({
        title: "Error",
        description: "Category with this name already exists",
        variant: "destructive",
      });
      return;
    }

    setCategories([
      ...categories,
      { id: Date.now().toString(), name: newCategory, count: 0 },
    ]);
    setNewCategory("");
    toast({
      title: "Success",
      description: "Category added successfully",
    });
  };

  const startEditing = (category: { id: string; name: string; count: number }) => {
    setEditingId(category.id);
    setEditName(category.name);
  };

  const saveEdit = () => {
    if (!editName.trim()) {
      toast({
        title: "Error",
        description: "Category name cannot be empty",
        variant: "destructive",
      });
      return;
    }

    if (
      categories.some(
        cat => cat.name.toLowerCase() === editName.toLowerCase() && cat.id !== editingId
      )
    ) {
      toast({
        title: "Error",
        description: "Category with this name already exists",
        variant: "destructive",
      });
      return;
    }

    setCategories(
      categories.map(cat =>
        cat.id === editingId ? { ...cat, name: editName } : cat
      )
    );
    setEditingId(null);
    toast({
      title: "Success",
      description: "Category updated successfully",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const deleteCategory = (id: string) => {
    const category = categories.find(cat => cat.id === id);
    
    if (category && category.count > 0) {
      toast({
        title: "Cannot Delete",
        description: `This category has ${category.count} menu items. Remove or reassign them first.`,
        variant: "destructive",
      });
      return;
    }

    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter(cat => cat.id !== id));
      toast({
        title: "Success",
        description: "Category deleted successfully",
      });
    }
  };

  return (
    <TransitionWrapper animation="fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Manage Menu Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-4 mb-6">
            <div className="flex-1">
              <Label htmlFor="newCategory" className="mb-2 block">
                Add New Category
              </Label>
              <Input
                id="newCategory"
                value={newCategory}
                onChange={e => setNewCategory(e.target.value)}
                placeholder="Enter category name"
              />
            </div>
            <Button onClick={handleAddCategory}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          </div>

          <div className="space-y-2">
            {categories.map(category => (
              <div
                key={category.id}
                className="border rounded-lg px-4 py-3 flex justify-between items-center"
              >
                {editingId === category.id ? (
                  <div className="flex-1 mr-4">
                    <Input
                      value={editName}
                      onChange={e => setEditName(e.target.value)}
                      autoFocus
                    />
                  </div>
                ) : (
                  <div className="flex-1">
                    <div className="font-medium">{category.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {category.count} items
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  {editingId === category.id ? (
                    <>
                      <Button size="sm" onClick={saveEdit}>
                        Save
                      </Button>
                      <Button size="sm" variant="outline" onClick={cancelEdit}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => startEditing(category)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Edit category</p>
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
                              onClick={() => deleteCategory(category.id)}
                              disabled={category.count > 0}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            {category.count > 0 
                              ? "Cannot delete (has items)" 
                              : "Delete category"}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </TransitionWrapper>
  );
};

export default MenuCategories;
