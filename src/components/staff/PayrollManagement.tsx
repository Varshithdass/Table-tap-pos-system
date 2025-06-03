
import React, { useState } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { CalendarClock, DollarSign, FileText, Download, CheckCircle2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import TransitionWrapper from "@/components/ui/custom/TransitionWrapper";

// Sample payroll data
const initialPayrollData = [
  {
    id: "ST001",
    name: "Rahul Sharma",
    role: "Chef",
    salary: 25000,
    daysWorked: 22,
    overtime: 8,
    deductions: 1200,
    bonus: 2000,
    netSalary: 25800,
    status: "pending"
  },
  {
    id: "ST002",
    name: "Priya Patel",
    role: "Cashier",
    salary: 18000,
    daysWorked: 23,
    overtime: 0,
    deductions: 800,
    bonus: 0,
    netSalary: 17200,
    status: "paid"
  },
  {
    id: "ST003",
    name: "Ahmed Khan",
    role: "Delivery Staff",
    salary: 15000,
    daysWorked: 19,
    overtime: 12,
    deductions: 1000,
    bonus: 1500,
    netSalary: 15500,
    status: "pending"
  },
  {
    id: "ST004",
    name: "Anjali Gupta",
    role: "Kitchen Helper",
    salary: 16000,
    daysWorked: 24,
    overtime: 5,
    deductions: 500,
    bonus: 1000,
    netSalary: 16500,
    status: "pending"
  },
  {
    id: "ST005",
    name: "Vikram Singh",
    role: "Operations Head",
    salary: 40000,
    daysWorked: 22,
    overtime: 0,
    deductions: 2000,
    bonus: 5000,
    netSalary: 43000,
    status: "paid"
  },
];

const PayrollManagement = () => {
  const [payrollData, setPayrollData] = useState(initialPayrollData);
  const [currentMonth, setCurrentMonth] = useState("March 2024");

  const handlePaymentStatus = (staffId: string, status: "paid" | "pending") => {
    setPayrollData(prev => 
      prev.map(staff => 
        staff.id === staffId 
          ? { ...staff, status } 
          : staff
      )
    );
  };

  const monthOptions = [
    "January 2024",
    "February 2024",
    "March 2024",
    "April 2024",
  ];

  return (
    <TransitionWrapper animation="fade-in">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Monthly Payroll Management</h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <CalendarClock className="h-4 w-4 text-muted-foreground" />
              <Select value={currentMonth} onValueChange={setCurrentMonth}>
                <SelectTrigger className="w-40">
                  <SelectValue>{currentMonth}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {monthOptions.map(month => (
                    <SelectItem key={month} value={month}>{month}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Export Payroll
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Export payroll data to Excel</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        <div className="rounded-md border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Days Worked</TableHead>
                <TableHead>Base Salary (₹)</TableHead>
                <TableHead>Deductions (₹)</TableHead>
                <TableHead>Bonus (₹)</TableHead>
                <TableHead>Net Salary (₹)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payrollData.map((staff) => (
                <TableRow key={staff.id}>
                  <TableCell>{staff.id}</TableCell>
                  <TableCell>{staff.name}</TableCell>
                  <TableCell>{staff.role}</TableCell>
                  <TableCell>{staff.daysWorked}</TableCell>
                  <TableCell>{staff.salary.toLocaleString()}</TableCell>
                  <TableCell className="text-red-500">-{staff.deductions.toLocaleString()}</TableCell>
                  <TableCell className="text-green-500">+{staff.bonus.toLocaleString()}</TableCell>
                  <TableCell className="font-medium">{staff.netSalary.toLocaleString()}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      staff.status === "paid" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {staff.status === "paid" ? "Paid" : "Pending"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {staff.status === "pending" ? (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="h-8"
                              onClick={() => handlePaymentStatus(staff.id, "paid")}
                            >
                              <DollarSign className="h-3 w-3 mr-1" />
                              Mark Paid
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Mark salary as paid</p>
                          </TooltipContent>
                        </Tooltip>
                      ) : (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="h-8"
                              onClick={() => handlePaymentStatus(staff.id, "pending")}
                            >
                              <CheckCircle2 className="h-3 w-3 mr-1 text-green-500" />
                              Paid
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Mark as pending</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>View salary slip</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </TransitionWrapper>
  );
};

export default PayrollManagement;
