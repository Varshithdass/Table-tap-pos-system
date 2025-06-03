
import React, { useState } from "react";
import Header from "@/components/layout/Header";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import StaffList from "@/components/staff/StaffList";
import StaffForm from "@/components/staff/StaffForm";
import AttendanceTracker from "@/components/staff/AttendanceTracker";
import PayrollManagement from "@/components/staff/PayrollManagement";
import { useLanguage } from "@/context/LanguageContext";

const Staff = () => {
  const [activeTab, setActiveTab] = useState("staff-list");
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { t } = useLanguage();

  const handleSuccess = () => {
    setRefreshTrigger(prev => prev + 1);
    setActiveTab("staff-list");
  };

  return (
    <div className="min-h-screen">
      <Header title={t('staff.title')} />
      <div className="p-6">
        <div className="glass-card p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="staff-list">{t('staff.staffList')}</TabsTrigger>
              <TabsTrigger value="add-staff">{t('staff.addStaff')}</TabsTrigger>
              <TabsTrigger value="attendance">{t('staff.attendance')}</TabsTrigger>
              <TabsTrigger value="payroll">{t('staff.payroll')}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="staff-list" className="mt-0">
              <StaffList key={refreshTrigger} />
            </TabsContent>
            
            <TabsContent value="add-staff" className="mt-0">
              <StaffForm onSuccess={handleSuccess} />
            </TabsContent>
            
            <TabsContent value="attendance" className="mt-0">
              <AttendanceTracker />
            </TabsContent>
            
            <TabsContent value="payroll" className="mt-0">
              <PayrollManagement />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Staff;
