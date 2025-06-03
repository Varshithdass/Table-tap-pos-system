
import React, { useState } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, Check, X } from "lucide-react";
import TransitionWrapper from "@/components/ui/custom/TransitionWrapper";

// Sample attendance data
const initialAttendanceData = [
  {
    id: "ST001",
    name: "Rahul Sharma",
    role: "Chef",
    date: "2024-03-01",
    status: "present",
    checkIn: "09:05",
    checkOut: "18:10",
    hours: 9.1,
  },
  {
    id: "ST002",
    name: "Priya Patel",
    role: "Cashier",
    date: "2024-03-01",
    status: "present",
    checkIn: "10:00",
    checkOut: "19:05",
    hours: 9.1,
  },
  {
    id: "ST003",
    name: "Ahmed Khan",
    role: "Delivery Staff",
    date: "2024-03-01",
    status: "absent",
    checkIn: "",
    checkOut: "",
    hours: 0,
  },
  {
    id: "ST004",
    name: "Anjali Gupta",
    role: "Kitchen Helper",
    date: "2024-03-01",
    status: "present",
    checkIn: "08:00",
    checkOut: "17:05",
    hours: 9.1,
  },
  {
    id: "ST005",
    name: "Vikram Singh",
    role: "Operations Head",
    date: "2024-03-01",
    status: "present",
    checkIn: "09:00",
    checkOut: "18:15",
    hours: 9.3,
  },
];

const AttendanceTracker = () => {
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceData, setAttendanceData] = useState(initialAttendanceData);

  const handleStatusChange = (staffId: string, status: string) => {
    setAttendanceData(prev => 
      prev.map(staff => 
        staff.id === staffId 
          ? { 
              ...staff, 
              status,
              checkIn: status === "present" ? staff.checkIn || getCurrentTime() : "",
              checkOut: status === "present" ? staff.checkOut : "",
              hours: status === "present" ? staff.hours : 0
            } 
          : staff
      )
    );
  };

  const getCurrentTime = () => {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  };

  const handleCheckIn = (staffId: string) => {
    setAttendanceData(prev => 
      prev.map(staff => 
        staff.id === staffId 
          ? { ...staff, checkIn: getCurrentTime(), status: "present" } 
          : staff
      )
    );
  };

  const handleCheckOut = (staffId: string) => {
    const checkInTime = attendanceData.find(staff => staff.id === staffId)?.checkIn;
    
    if (!checkInTime) return;
    
    const checkOut = getCurrentTime();
    
    // Calculate hours (simple calculation, not accounting for overnight shifts)
    const [checkInHour, checkInMin] = checkInTime.split(':').map(Number);
    const [checkOutHour, checkOutMin] = checkOut.split(':').map(Number);
    
    const totalHours = (checkOutHour - checkInHour) + (checkOutMin - checkInMin) / 60;
    
    setAttendanceData(prev => 
      prev.map(staff => 
        staff.id === staffId 
          ? { ...staff, checkOut, hours: Math.round(totalHours * 10) / 10 } 
          : staff
      )
    );
  };

  return (
    <TransitionWrapper animation="fade-in">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Daily Attendance Tracker</h3>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <Input
              type="date"
              value={currentDate}
              onChange={(e) => setCurrentDate(e.target.value)}
              className="w-40"
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
                <TableHead>Status</TableHead>
                <TableHead>Check In</TableHead>
                <TableHead>Check Out</TableHead>
                <TableHead>Hours</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendanceData.map((staff) => (
                <TableRow key={staff.id}>
                  <TableCell>{staff.id}</TableCell>
                  <TableCell>{staff.name}</TableCell>
                  <TableCell>{staff.role}</TableCell>
                  <TableCell>
                    <Select
                      value={staff.status}
                      onValueChange={(value) => handleStatusChange(staff.id, value)}
                    >
                      <SelectTrigger className="w-28">
                        <SelectValue>
                          {staff.status === "present" ? (
                            <span className="flex items-center gap-1">
                              <span className="h-2 w-2 rounded-full bg-green-500"></span>
                              Present
                            </span>
                          ) : (
                            <span className="flex items-center gap-1">
                              <span className="h-2 w-2 rounded-full bg-red-500"></span>
                              Absent
                            </span>
                          )}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="present">
                          <span className="flex items-center gap-1">
                            <Check className="h-3 w-3 text-green-500" />
                            Present
                          </span>
                        </SelectItem>
                        <SelectItem value="absent">
                          <span className="flex items-center gap-1">
                            <X className="h-3 w-3 text-red-500" />
                            Absent
                          </span>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    {staff.status === "present" ? (
                      staff.checkIn || (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleCheckIn(staff.id)}
                          className="h-8 px-2"
                        >
                          <Clock className="h-3 w-3 mr-1" />
                          Check In
                        </Button>
                      )
                    ) : "-"}
                  </TableCell>
                  <TableCell>
                    {staff.status === "present" ? (
                      staff.checkOut || (
                        staff.checkIn && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleCheckOut(staff.id)}
                            className="h-8 px-2"
                          >
                            <Clock className="h-3 w-3 mr-1" />
                            Check Out
                          </Button>
                        )
                      )
                    ) : "-"}
                  </TableCell>
                  <TableCell>{staff.hours > 0 ? `${staff.hours}h` : "-"}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        View History
                      </Button>
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

export default AttendanceTracker;
