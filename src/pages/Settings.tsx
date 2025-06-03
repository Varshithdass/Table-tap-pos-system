
import React, { useState } from "react";
import Header from "@/components/layout/Header";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import GeneralSettings from "@/components/settings/GeneralSettings";
import DashboardSettings from "@/components/settings/DashboardSettings";
import OrderSettings from "@/components/settings/OrderSettings";
import InventorySettings from "@/components/settings/InventorySettings";
import KitchenSettings from "@/components/settings/KitchenSettings";
import MenuSettings from "@/components/settings/MenuSettings";
import CrmSettings from "@/components/settings/CrmSettings";
import StaffSettings from "@/components/settings/StaffSettings";
import BillingSettings from "@/components/settings/BillingSettings";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="min-h-screen">
      <Header title="Settings" />
      <div className="p-6">
        <div className="glass-card p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6 w-full max-w-7xl mx-auto grid grid-cols-3 md:grid-cols-9 gap-1">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
              <TabsTrigger value="kitchen">Kitchen</TabsTrigger>
              <TabsTrigger value="menu">Menu</TabsTrigger>
              <TabsTrigger value="crm">CRM</TabsTrigger>
              <TabsTrigger value="staff">Staff</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="mt-4">
              <GeneralSettings />
            </TabsContent>

            <TabsContent value="dashboard" className="mt-4">
              <DashboardSettings />
            </TabsContent>

            <TabsContent value="orders" className="mt-4">
              <OrderSettings />
            </TabsContent>

            <TabsContent value="inventory" className="mt-4">
              <InventorySettings />
            </TabsContent>

            <TabsContent value="kitchen" className="mt-4">
              <KitchenSettings />
            </TabsContent>

            <TabsContent value="menu" className="mt-4">
              <MenuSettings />
            </TabsContent>

            <TabsContent value="crm" className="mt-4">
              <CrmSettings />
            </TabsContent>

            <TabsContent value="staff" className="mt-4">
              <StaffSettings />
            </TabsContent>

            <TabsContent value="billing" className="mt-4">
              <BillingSettings />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Settings;
