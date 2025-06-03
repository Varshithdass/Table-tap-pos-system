
import React, { useState } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Trash2, Search, UserCheck, DollarSign } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import TransitionWrapper from "@/components/ui/custom/TransitionWrapper";

// Sample staff data (in a real app, this would come from an API or database)
const initialStaffData = [
  {
    id: "ST001",
    name: "Rahul Sharma",
    role: "Chef",
    joined: "2024-03-01",
    shift: "9:00 AM - 6:00 PM",
    salary: 25000,
    attendance: "Present",
    leaves: 2,
    contact: "9876543210"
  },
  {
    id: "ST002",
    name: "Priya Patel",
    role: "Cashier",
    joined: "2024-02-15",
    shift: "10:00 AM - 7:00 PM",
    salary: 18000,
    attendance: "Present",
    leaves: 1,
    contact: "9876543211"
  },
  {
    id: "ST003",
    name: "Ahmed Khan",
    role: "Delivery Staff",
    joined: "2024-01-20",
    shift: "11:00 AM - 8:00 PM",
    salary: 15000,
    attendance: "Absent",
    leaves: 3,
    contact: "9876543212"
  },
  {
    id: "ST004",
    name: "Anjali Gupta",
    role: "Kitchen Helper",
    joined: "2024-02-01",
    shift: "8:00 AM - 5:00 PM",
    salary: 16000,
    attendance: "Present",
    leaves: 0,
    contact: "9876543213"
  },
  {
    id: "ST005",
    name: "Vikram Singh",
    role: "Operations Head",
    joined: "2023-12-15",
    shift: "9:00 AM - 6:00 PM",
    salary: 40000,
    attendance: "Present",
    leaves: 1,
    contact: "9876543214"
  }
];

const StaffList = () => {
  const [staffData, setStaffData] = useState(initialStaffData);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStaff = staffData.filter(staff => 
    staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to remove this staff member?")) {
      setStaffData(staffData.filter(staff => staff.id !== id));
    }
  };

  return (
    <TransitionWrapper animation="fade-in">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search staff by name, role or ID..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="rounded-md border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Shift</TableHead>
                <TableHead>Salary (₹)</TableHead>
                <TableHead>Attendance</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStaff.length > 0 ? (
                filteredStaff.map((staff) => (
                  <TableRow key={staff.id}>
                    <TableCell>{staff.id}</TableCell>
                    <TableCell>{staff.name}</TableCell>
                    <TableCell>{staff.role}</TableCell>
                    <TableCell>{new Date(staff.joined).toLocaleDateString()}</TableCell>
                    <TableCell>{staff.shift}</TableCell>
                    <TableCell>{staff.salary.toLocaleString()}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        staff.attendance === "Present" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-red-100 text-red-800"
                      }`}>
                        {staff.attendance}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Edit Staff</p>
                          </TooltipContent>
                        </Tooltip>
                        
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={() => handleDelete(staff.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Delete Staff</p>
                          </TooltipContent>
                        </Tooltip>
                        
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <UserCheck className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Manage Attendance</p>
                          </TooltipContent>
                        </Tooltip>
                        
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <DollarSign className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Manage Salary</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-6">
                    No staff members found matching your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </TransitionWrapper>
  );
};

export default StaffList;
