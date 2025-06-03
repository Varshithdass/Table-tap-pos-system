
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/custom/Card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import TransitionWrapper from "@/components/ui/custom/TransitionWrapper";

interface InventoryItem {
  id: string;
  name: string;
  stock: number;
  total: number;
  percentage: number;
  status: "normal" | "warning" | "critical";
}

const inventoryItems: InventoryItem[] = [
  {
    id: "item1",
    name: "Chicken Breast",
    stock: 8,
    total: 10,
    percentage: 80,
    status: "normal",
  },
  {
    id: "item2",
    name: "Tomatoes",
    stock: 3,
    total: 10,
    percentage: 30,
    status: "warning",
  },
  {
    id: "item3",
    name: "Onions",
    stock: 7,
    total: 10,
    percentage: 70,
    status: "normal",
  },
  {
    id: "item4",
    name: "Cooking Oil",
    stock: 1,
    total: 10,
    percentage: 10,
    status: "critical",
  },
  {
    id: "item5",
    name: "Rice",
    stock: 6,
    total: 10,
    percentage: 60,
    status: "normal",
  },
];

const getProgressColor = (status: InventoryItem["status"]) => {
  switch (status) {
    case "critical":
      return "bg-red-500";
    case "warning":
      return "bg-yellow-500";
    case "normal":
    default:
      return "bg-green-500";
  }
};

const InventoryStatus = () => {
  return (
    <TransitionWrapper animation="fade-in" delay={400}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Inventory Status</CardTitle>
          <button className="text-sm text-primary hover:underline">View All</button>
        </CardHeader>
        <CardContent>
          <div className="space-y-5">
            {inventoryItems.map((item) => (
              <div key={item.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="font-medium">{item.name}</div>
                  <div className={cn(
                    "text-sm font-medium",
                    item.status === "critical" && "text-red-500",
                    item.status === "warning" && "text-yellow-500",
                    item.status === "normal" && "text-green-500"
                  )}>
                    {item.stock}/{item.total} kg
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Progress 
                    value={item.percentage} 
                    className={cn("h-2", getProgressColor(item.status))} 
                  />
                  <span className="text-xs text-muted-foreground w-8">{item.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </TransitionWrapper>
  );
};

export default InventoryStatus;
