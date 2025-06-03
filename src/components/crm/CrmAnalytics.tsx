
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/custom/Card";
import TransitionWrapper from "@/components/ui/custom/TransitionWrapper";
import { PieChart } from "lucide-react";

const CrmAnalytics = () => {
  return (
    <TransitionWrapper animation="fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Analytics and Reporting</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <PieChart className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Gain Customer Insights</h3>
            <p className="text-muted-foreground max-w-md mb-6">
              Track popular dishes, peak times, customer retention, and revenue sources 
              to optimize your menu, staffing, and marketing strategies.
            </p>
          </div>
        </CardContent>
      </Card>
    </TransitionWrapper>
  );
};

export default CrmAnalytics;
