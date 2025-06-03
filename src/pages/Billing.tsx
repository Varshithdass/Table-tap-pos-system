
import React, { useState } from "react";
import Header from "@/components/layout/Header";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import BillingForm from "@/components/billing/BillingForm";
import PaymentProcessing from "@/components/billing/PaymentProcessing";
import InvoiceHistory from "@/components/billing/InvoiceHistory";
import RefundsManagement from "@/components/billing/RefundsManagement";
import TaxSettings from "@/components/billing/TaxSettings";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";

const Billing = () => {
  const [activeTab, setActiveTab] = useState("billing");
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <Header title={t('billing.title')} />
      <div className="p-6">
        <Button 
          variant="outline" 
          size="sm" 
          className="mb-4"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          {t('action.goBack')}
        </Button>
        
        <Tabs defaultValue="billing" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="mb-6 w-full max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-5">
            <TabsTrigger value="billing">{t('billing.createBill')}</TabsTrigger>
            <TabsTrigger value="payments">{t('billing.payments')}</TabsTrigger>
            <TabsTrigger value="invoices">{t('billing.invoices')}</TabsTrigger>
            <TabsTrigger value="refunds">{t('billing.refunds')}</TabsTrigger>
            <TabsTrigger value="settings">{t('billing.taxSettings')}</TabsTrigger>
          </TabsList>

          <TabsContent value="billing" className="mt-4">
            <BillingForm />
          </TabsContent>

          <TabsContent value="payments" className="mt-4">
            <PaymentProcessing />
          </TabsContent>

          <TabsContent value="invoices" className="mt-4">
            <InvoiceHistory />
          </TabsContent>

          <TabsContent value="refunds" className="mt-4">
            <RefundsManagement />
          </TabsContent>

          <TabsContent value="settings" className="mt-4">
            <TaxSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Billing;
