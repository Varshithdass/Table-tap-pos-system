
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/custom/Card";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import TransitionWrapper from "@/components/ui/custom/TransitionWrapper";

const MenuCombos = () => {
  return (
    <TransitionWrapper animation="fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Combos & Bundles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <PlusCircle className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No Combos Added Yet</h3>
            <p className="text-muted-foreground max-w-md mb-6">
              Create combo meals and bundles to offer your customers special deals that combine multiple menu items at a discounted price.
            </p>
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              Create New Combo
            </Button>
          </div>
        </CardContent>
      </Card>
    </TransitionWrapper>
  );
};

export default MenuCombos;
