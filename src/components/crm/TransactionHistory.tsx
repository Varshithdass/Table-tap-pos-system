
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/custom/Card";
import TransitionWrapper from "@/components/ui/custom/TransitionWrapper";
import { List, ShoppingBasket } from "lucide-react";

const TransactionHistory = () => {
  return (
    <TransitionWrapper animation="fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Transaction History Tracking</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <List className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Track Customer Transactions</h3>
            <p className="text-muted-foreground max-w-md mb-6">
              Log all customer orders across dine-in, takeaway, and delivery channels. 
              Track items ordered, frequency, payment modes, and spending patterns.
            </p>
          </div>
        </CardContent>
      </Card>
    </TransitionWrapper>
  );
};

export default TransactionHistory;
