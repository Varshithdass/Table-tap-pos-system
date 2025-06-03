
import React, { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import MenuItemsList from "@/components/menu/MenuItemsList";
import MenuItemForm from "@/components/menu/MenuItemForm";
import MenuCategories from "@/components/menu/MenuCategories";
import MenuCombos from "@/components/menu/MenuCombos";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";

const MenuManagement = () => {
  const [activeTab, setActiveTab] = useState("items");
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  // Parse URL parameters
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [location]);

  return (
    <div className="min-h-screen">
      <Header title={t('menu.title')} />
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
        
        <Tabs value={activeTab} className="w-full" onValueChange={setActiveTab}>
          <TabsList className="mb-6 w-full max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="items">{t('menu.items')}</TabsTrigger>
            <TabsTrigger value="add">{t('menu.addNew')}</TabsTrigger>
            <TabsTrigger value="categories">{t('menu.categories')}</TabsTrigger>
            <TabsTrigger value="combos">{t('menu.combos')}</TabsTrigger>
          </TabsList>

          <TabsContent value="items" className="mt-4">
            <MenuItemsList />
          </TabsContent>

          <TabsContent value="add" className="mt-4">
            <MenuItemForm />
          </TabsContent>

          <TabsContent value="categories" className="mt-4">
            <MenuCategories />
          </TabsContent>

          <TabsContent value="combos" className="mt-4">
            <MenuCombos />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MenuManagement;
