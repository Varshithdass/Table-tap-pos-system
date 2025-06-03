
import React from "react";
import { Card } from "@/components/ui/custom/Card";
import { ArrowUpRight, ArrowDownRight, TrendingUp, Users, ShoppingBag, DollarSign } from "lucide-react";
import TransitionWrapper from "@/components/ui/custom/TransitionWrapper";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

interface StatCardProps {
  title: string;
  value: string;
  change: {
    value: string;
    positive: boolean;
  };
  icon: React.ElementType;
  delay?: number;
}

const StatCard = ({
  title,
  value,
  change,
  icon: Icon,
  delay = 0
}: StatCardProps) => {
  const { t } = useLanguage();
  
  return (
    <TransitionWrapper animation="scale-in" delay={delay} className="h-full">
      <Card className="h-full" hasHover>
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            
            <div className={cn("flex items-center mt-2 text-xs font-medium", change.positive ? "text-green-500" : "text-red-500")}>
              {change.positive ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
              <span>{change.value} {t('stats.fromLastWeek')}</span>
            </div>
          </div>
          
          <div className={cn("p-3 rounded-full", "bg-primary/10 text-primary")}>
            <Icon className="h-5 w-5 rounded-3xl" />
          </div>
        </div>
      </Card>
    </TransitionWrapper>
  );
};

const DashboardStats = () => {
  const { t } = useLanguage();
  
  const stats = [
    {
      title: t('stats.totalRevenue'),
      value: "₹43,500",
      change: {
        value: "+12.3%",
        positive: true
      },
      icon: DollarSign
    },
    {
      title: t('stats.ordersToday'),
      value: "42",
      change: {
        value: "+8.5%",
        positive: true
      },
      icon: ShoppingBag
    },
    {
      title: t('stats.avgOrderValue'),
      value: "₹1,035",
      change: {
        value: "+3.2%",
        positive: true
      },
      icon: TrendingUp
    },
    {
      title: t('stats.onlineCustomers'),
      value: "235",
      change: {
        value: "-5.1%",
        positive: false
      },
      icon: Users
    }
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard 
          key={stat.title} 
          title={stat.title} 
          value={stat.value} 
          change={stat.change} 
          icon={stat.icon} 
          delay={index * 100} 
        />
      ))}
    </div>
  );
};

export default DashboardStats;
