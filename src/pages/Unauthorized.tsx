
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, AlertTriangle } from "lucide-react";
import TransitionWrapper from "@/components/ui/custom/TransitionWrapper";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <TransitionWrapper animation="fade-in">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="h-20 w-20 bg-red-100 rounded-full flex items-center justify-center">
              <Shield className="h-10 w-10 text-red-500" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
          
          <div className="flex items-center justify-center mb-4 text-amber-600">
            <AlertTriangle className="h-4 w-4 mr-2" />
            <p>You don't have permission to access this page.</p>
          </div>
          
          <p className="text-gray-600 mb-6">
            Your current role doesn't allow you to view this content. Please contact your administrator if you believe this is an error.
          </p>
          
          <div className="space-y-3">
            <Button onClick={() => navigate("/")} className="w-full">
              Return to Dashboard
            </Button>
          </div>
        </div>
      </TransitionWrapper>
    </div>
  );
};

export default Unauthorized;
