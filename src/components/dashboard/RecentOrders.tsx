
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/custom/Card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import TransitionWrapper from "@/components/ui/custom/TransitionWrapper";

interface Order {
  id: string;
  customer: string;
  items: number;
  total: string;
  status: "new" | "preparing" | "ready" | "delivered" | "cancelled";
  time: string;
  source: "swiggy" | "zomato" | "direct" | "pos";
}

const statusStyles = {
  new: {
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
    textColor: "text-blue-600 dark:text-blue-400",
  },
  preparing: {
    bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
    textColor: "text-yellow-700 dark:text-yellow-400",
  },
  ready: {
    bgColor: "bg-green-100 dark:bg-green-900/30",
    textColor: "text-green-600 dark:text-green-400",
  },
  delivered: {
    bgColor: "bg-gray-100 dark:bg-gray-800",
    textColor: "text-gray-600 dark:text-gray-400",
  },
  cancelled: {
    bgColor: "bg-red-100 dark:bg-red-900/30",
    textColor: "text-red-600 dark:text-red-400",
  },
};

const sourceStyles = {
  swiggy: {
    bgColor: "bg-orange-100 dark:bg-orange-900/30",
    textColor: "text-orange-600 dark:text-orange-400",
  },
  zomato: {
    bgColor: "bg-red-100 dark:bg-red-900/30",
    textColor: "text-red-600 dark:text-red-400",
  },
  direct: {
    bgColor: "bg-purple-100 dark:bg-purple-900/30",
    textColor: "text-purple-600 dark:text-purple-400",
  },
  pos: {
    bgColor: "bg-sky-100 dark:bg-sky-900/30",
    textColor: "text-sky-600 dark:text-sky-400",
  },
};

const orders: Order[] = [
  {
    id: "ORD-7293",
    customer: "Rahul Sharma",
    items: 3,
    total: "₹645",
    status: "new",
    time: "Just now",
    source: "swiggy",
  },
  {
    id: "ORD-7292",
    customer: "Priya Patel",
    items: 2,
    total: "₹450",
    status: "preparing",
    time: "10 min ago",
    source: "zomato",
  },
  {
    id: "ORD-7291",
    customer: "Amit Singh",
    items: 5,
    total: "₹1,200",
    status: "ready",
    time: "15 min ago",
    source: "direct",
  },
  {
    id: "ORD-7290",
    customer: "Neha Gupta",
    items: 1,
    total: "₹320",
    status: "delivered",
    time: "35 min ago",
    source: "pos",
  },
  {
    id: "ORD-7289",
    customer: "Vivek Kumar",
    items: 4,
    total: "₹780",
    status: "cancelled",
    time: "1 hour ago",
    source: "swiggy",
  },
];

const RecentOrders = () => {
  return (
    <TransitionWrapper animation="fade-in" delay={300}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Orders</CardTitle>
          <Badge variant="outline" className="text-xs">
            Last 24 hours
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left font-medium py-2 px-4">Order ID</th>
                  <th className="text-left font-medium py-2 px-4">Customer</th>
                  <th className="text-left font-medium py-2 px-4">Items</th>
                  <th className="text-left font-medium py-2 px-4">Total</th>
                  <th className="text-left font-medium py-2 px-4">Status</th>
                  <th className="text-left font-medium py-2 px-4">Source</th>
                  <th className="text-left font-medium py-2 px-4">Time</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr 
                    key={order.id} 
                    className="hover:bg-background/50 transition-colors duration-200 border-b border-border/50 last:border-0"
                  >
                    <td className="py-3 px-4 font-medium">{order.id}</td>
                    <td className="py-3 px-4">{order.customer}</td>
                    <td className="py-3 px-4">{order.items}</td>
                    <td className="py-3 px-4 font-medium">{order.total}</td>
                    <td className="py-3 px-4">
                      <Badge variant="secondary" className={cn(
                        "font-normal",
                        statusStyles[order.status].bgColor,
                        statusStyles[order.status].textColor
                      )}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="secondary" className={cn(
                        "font-normal",
                        sourceStyles[order.source].bgColor,
                        sourceStyles[order.source].textColor
                      )}>
                        {order.source.charAt(0).toUpperCase() + order.source.slice(1)}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{order.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </TransitionWrapper>
  );
};

export default RecentOrders;
