
import React from "react";
import Header from "@/components/layout/Header";
import DashboardStats from "@/components/dashboard/DashboardStats";
import RecentOrders from "@/components/dashboard/RecentOrders";
import InventoryStatus from "@/components/dashboard/InventoryStatus";
import { useLanguage } from "@/context/LanguageContext";

const Index = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen">
      <Header title={t('dashboard.title')} />
      <div className="p-6">
        <div className="mb-8">
          <DashboardStats />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RecentOrders />
          </div>
          <div>
            <InventoryStatus />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
