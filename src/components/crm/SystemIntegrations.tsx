
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/custom/Card";
import TransitionWrapper from "@/components/ui/custom/TransitionWrapper";
import { Link } from "lucide-react";

const SystemIntegrations = () => {
  return (
    <TransitionWrapper animation="fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Integration with Other Systems</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Link className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Connect Your Ecosystem</h3>
            <p className="text-muted-foreground max-w-md mb-6">
              Sync with delivery apps like Zomato and Swiggy, UPI payment platforms, 
              and online reservation systems for a unified customer experience.
            </p>
          </div>
        </CardContent>
      </Card>
    </TransitionWrapper>
  );
};

export default SystemIntegrations;
