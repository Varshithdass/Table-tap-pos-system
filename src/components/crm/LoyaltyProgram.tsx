
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/custom/Card";
import TransitionWrapper from "@/components/ui/custom/TransitionWrapper";
import { Star } from "lucide-react";

const LoyaltyProgram = () => {
  return (
    <TransitionWrapper animation="fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Loyalty Program Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Star className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Reward Your Loyal Customers</h3>
            <p className="text-muted-foreground max-w-md mb-6">
              Implement points systems, rewards, festive bonuses, and tiered programs 
              to retain customers in a competitive market.
            </p>
          </div>
        </CardContent>
      </Card>
    </TransitionWrapper>
  );
};

export default LoyaltyProgram;
