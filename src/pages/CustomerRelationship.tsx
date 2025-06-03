
import React, { useState } from "react";
import Header from "@/components/layout/Header";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CustomerDatabase from "@/components/crm/CustomerDatabase";
import TransactionHistory from "@/components/crm/TransactionHistory";
import LoyaltyProgram from "@/components/crm/LoyaltyProgram";
import CommunicationTools from "@/components/crm/CommunicationTools";
import MarketingCampaigns from "@/components/crm/MarketingCampaigns";
import CustomerFeedback from "@/components/crm/CustomerFeedback";
import CrmAnalytics from "@/components/crm/CrmAnalytics";
import PrivacyManagement from "@/components/crm/PrivacyManagement";
import SystemIntegrations from "@/components/crm/SystemIntegrations";
import { useLanguage } from "@/context/LanguageContext";

const CustomerRelationship = () => {
  const [activeTab, setActiveTab] = useState("customers");
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <Header title={t('crm.title')} />
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
        
        <Tabs defaultValue="customers" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="mb-6 w-full max-w-6xl mx-auto grid grid-cols-3 md:grid-cols-9 gap-1">
            <TabsTrigger value="customers">{t('crm.customers')}</TabsTrigger>
            <TabsTrigger value="transactions">{t('crm.transactions')}</TabsTrigger>
            <TabsTrigger value="loyalty">{t('crm.loyalty')}</TabsTrigger>
            <TabsTrigger value="communication">{t('crm.communication')}</TabsTrigger>
            <TabsTrigger value="marketing">{t('crm.marketing')}</TabsTrigger>
            <TabsTrigger value="feedback">{t('crm.feedback')}</TabsTrigger>
            <TabsTrigger value="analytics">{t('action.analytics')}</TabsTrigger>
            <TabsTrigger value="privacy">{t('crm.privacy')}</TabsTrigger>
            <TabsTrigger value="integrations">{t('crm.integrations')}</TabsTrigger>
          </TabsList>

          <TabsContent value="customers" className="mt-4">
            <CustomerDatabase />
          </TabsContent>

          <TabsContent value="transactions" className="mt-4">
            <TransactionHistory />
          </TabsContent>

          <TabsContent value="loyalty" className="mt-4">
            <LoyaltyProgram />
          </TabsContent>

          <TabsContent value="communication" className="mt-4">
            <CommunicationTools />
          </TabsContent>

          <TabsContent value="marketing" className="mt-4">
            <MarketingCampaigns />
          </TabsContent>

          <TabsContent value="feedback" className="mt-4">
            <CustomerFeedback />
          </TabsContent>

          <TabsContent value="analytics" className="mt-4">
            <CrmAnalytics />
          </TabsContent>

          <TabsContent value="privacy" className="mt-4">
            <PrivacyManagement />
          </TabsContent>

          <TabsContent value="integrations" className="mt-4">
            <SystemIntegrations />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CustomerRelationship;
