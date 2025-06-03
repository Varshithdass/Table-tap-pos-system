
import React from "react";
import Header from "@/components/layout/Header";
import { useLanguage } from "@/context/LanguageContext";

const Kitchen = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen">
      <Header title={t('kitchen.title')} />
      <div className="p-6">
        <div className="glass-card p-10 flex items-center justify-center">
          <h2 className="text-2xl font-medium">{t('kitchen.title')} {t('coming_soon')}</h2>
        </div>
      </div>
    </div>
  );
};

export default Kitchen;
