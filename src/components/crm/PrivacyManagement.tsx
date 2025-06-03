
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/custom/Card";
import TransitionWrapper from "@/components/ui/custom/TransitionWrapper";
import { Shield } from "lucide-react";

const PrivacyManagement = () => {
  return (
    <TransitionWrapper animation="fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Privacy and Data Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Shield className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Secure Customer Information</h3>
            <p className="text-muted-foreground max-w-md mb-6">
              Ensure compliance with Indian laws including the Digital Personal Data 
              Protection Act (DPDP), with proper consent management and data security.
            </p>
          </div>
        </CardContent>
      </Card>
    </TransitionWrapper>
  );
};

export default PrivacyManagement;
