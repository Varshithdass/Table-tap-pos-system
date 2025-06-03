
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  ChefHat,
  BarChart3,
  ShoppingBasket,
  Package,
  Users,
  Settings,
  CreditCard,
  Menu,
  X,
  Home,
  LogOut,
  BookOpen,
  Users as UsersIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import TransitionWrapper from "@/components/ui/custom/TransitionWrapper";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useLanguage } from "@/context/LanguageContext";

interface SidebarLinkProps {
  to: string;
  icon: React.ElementType;
  label: string;
  active: boolean;
  collapsed: boolean;
  onClick?: () => void;
}

const SidebarLink = ({ to, icon: Icon, label, active, collapsed, onClick }: SidebarLinkProps) => {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            to={to}
            className={cn(
              "flex items-center px-3 py-3 my-1 rounded-lg transition-all duration-200 group",
              active 
                ? "bg-primary/10 text-primary" 
                : "text-foreground/60 hover:text-foreground hover:bg-foreground/5"
            )}
            onClick={onClick}
          >
            <Icon className={cn("h-5 w-5", active ? "text-primary" : "text-foreground/60 group-hover:text-foreground")} />
            {!collapsed && (
              <span className="ml-3 font-medium text-sm">{label}</span>
            )}
          </Link>
        </TooltipTrigger>
        {collapsed && (
          <TooltipContent side="right">
            <p>{label}</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  
  const toggleMobile = () => {
    setMobileOpen(!mobileOpen);
  };
  
  const closeMobileSidebar = () => {
    if (mobileOpen) setMobileOpen(false);
  };

  const links = [
    { to: "/", icon: Home, label: t('dashboard.title') },
    { to: "/orders", icon: ShoppingBasket, label: t('orders.title') },
    { to: "/inventory", icon: Package, label: t('inventory.title') },
    { to: "/kitchen", icon: ChefHat, label: t('kitchen.title') },
    { to: "/menu", icon: BookOpen, label: t('menu.title') },
    { to: "/crm", icon: UsersIcon, label: t('crm.title') },
    { to: "/analytics", icon: BarChart3, label: t('analytics.title') },
    { to: "/staff", icon: Users, label: t('staff.title') },
    { to: "/billing", icon: CreditCard, label: t('billing.title') },
    { to: "/settings", icon: Settings, label: t('settings.title') },
  ];

  return (
    <>
      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button 
          variant="outline" 
          size="icon" 
          className="glass-button rounded-full h-10 w-10"
          onClick={toggleMobile}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Overlay for mobile */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
          onClick={closeMobileSidebar}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 bottom-0 left-0 z-50 flex flex-col",
          "glass-morphism border-r border-white/10",
          "transition-all duration-300 ease-in-out",
          "md:translate-x-0",
          collapsed ? "md:w-16" : "md:w-64",
          mobileOpen ? "translate-x-0 w-64" : "-translate-x-full",
          className
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-white/10 bg-gradient-to-r from-red-600 to-red-700">
          {!collapsed && (
            <TransitionWrapper animation="fade-in" duration="fast">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-lg">
                    <span className="text-red-600 font-bold text-lg">T</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                </div>
                <h1 className="font-playfair font-bold text-xl text-white tracking-wide">
                  Table<span className="text-red-200">Tap</span>
                </h1>
              </div>
            </TransitionWrapper>
          )}
          
          {collapsed && (
            <div className="flex items-center justify-center w-full">
              <div className="relative">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-red-600 font-bold text-lg">T</span>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          )}
          
          {/* Close button for mobile */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={closeMobileSidebar}
              className="text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Collapse button for desktop */}
          <div className="hidden md:block">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="text-white hover:bg-white/20"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="flex-1 px-3 py-4 overflow-y-auto scrollbar-none">
          <nav className="flex flex-col space-y-1">
            {links.map((link) => (
              <SidebarLink
                key={link.to}
                to={link.to}
                icon={link.icon}
                label={link.label}
                active={location.pathname === link.to}
                collapsed={collapsed}
                onClick={closeMobileSidebar}
              />
            ))}
          </nav>
        </div>

        <div className="p-3 border-t border-white/10">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start text-foreground/60 hover:text-foreground",
                    collapsed && "justify-center"
                  )}
                >
                  <LogOut className="h-5 w-5" />
                  {!collapsed && <span className="ml-3 text-sm">{t('header.logout')}</span>}
                </Button>
              </TooltipTrigger>
              {collapsed && (
                <TooltipContent side="right">
                  <p>{t('header.logout')}</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
