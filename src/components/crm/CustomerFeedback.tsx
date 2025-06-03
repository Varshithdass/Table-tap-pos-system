
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/custom/Card";
import TransitionWrapper from "@/components/ui/custom/TransitionWrapper";
import { ThumbsUp } from "lucide-react";

const CustomerFeedback = () => {
  return (
    <TransitionWrapper animation="fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Customer Feedback Collection</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <ThumbsUp className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Gather Valuable Feedback</h3>
            <p className="text-muted-foreground max-w-md mb-6">
              Collect feedback via WhatsApp surveys, QR codes on bills, and follow-up 
              communications to improve food and service quality.
            </p>
          </div>
        </CardContent>
      </Card>
    </TransitionWrapper>
  );
};

export default CustomerFeedback;
