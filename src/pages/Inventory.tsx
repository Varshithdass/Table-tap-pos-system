
import React, { useState } from "react";
import Header from "@/components/layout/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InventoryList from "@/components/inventory/InventoryList";
import InventoryForm from "@/components/inventory/InventoryForm";
import SupplierList from "@/components/inventory/SupplierList";
import SupplierForm from "@/components/inventory/SupplierForm";
import LowStockAlerts from "@/components/inventory/LowStockAlerts";
import { Card } from "@/components/ui/custom/Card";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/LanguageContext";

const Inventory = () => {
  const [activeTab, setActiveTab] = useState("inventory");
  const { toast } = useToast();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <Header title={t('inventory.title')} />
      <div className="p-6">
        <div className="mb-6">
          <Tabs defaultValue="inventory" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="inventory">{t('inventory.items')}</TabsTrigger>
              <TabsTrigger value="suppliers">{t('inventory.suppliers')}</TabsTrigger>
              <TabsTrigger value="low-stock">{t('inventory.lowStock')}</TabsTrigger>
              <TabsTrigger value="reports">{t('inventory.reports')}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="inventory" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <InventoryList />
                </div>
                <div>
                  <InventoryForm 
                    onSuccess={() => {
                      toast({
                        title: t('inventory.updated'),
                        description: t('inventory.updateSuccess'),
                      });
                    }}
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="suppliers" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <SupplierList />
                </div>
                <div>
                  <SupplierForm 
                    onSuccess={() => {
                      toast({
                        title: t('inventory.supplierAdded'),
                        description: t('inventory.supplierAddSuccess'),
                      });
                    }}
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="low-stock" className="space-y-6">
              <LowStockAlerts />
            </TabsContent>
            
            <TabsContent value="reports" className="space-y-6">
              <Card>
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">{t('inventory.reports')}</h2>
                  <p className="text-muted-foreground">
                    {t('inventory.reportsDescription')}
                  </p>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
