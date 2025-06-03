import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { LanguageProvider } from "@/context/LanguageContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Sidebar from "./components/layout/Sidebar";
import Index from "./pages/Index";
import Orders from "./pages/Orders";
import Inventory from "./pages/Inventory";
import Kitchen from "./pages/Kitchen";
import Analytics from "./pages/Analytics";
import Staff from "./pages/Staff";
import Billing from "./pages/Billing";
import Settings from "./pages/Settings";
import MenuManagement from "./pages/MenuManagement";
import CustomerRelationship from "./pages/CustomerRelationship";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Unauthorized from "./pages/Unauthorized";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              
              {/* Protected routes */}
              <Route path="/" element={
                <ProtectedRoute>
                  <div className="min-h-screen flex">
                    <Sidebar />
                    <main className="flex-1 md:ml-16 lg:ml-64 transition-all duration-300 ease-in-out">
                      <Index />
                    </main>
                  </div>
                </ProtectedRoute>
              } />
              
              <Route path="/orders" element={
                <ProtectedRoute>
                  <div className="min-h-screen flex">
                    <Sidebar />
                    <main className="flex-1 md:ml-16 lg:ml-64 transition-all duration-300 ease-in-out">
                      <Orders />
                    </main>
                  </div>
                </ProtectedRoute>
              } />
              
              <Route path="/inventory" element={
                <ProtectedRoute allowedRoles={["owner", "manager"]}>
                  <div className="min-h-screen flex">
                    <Sidebar />
                    <main className="flex-1 md:ml-16 lg:ml-64 transition-all duration-300 ease-in-out">
                      <Inventory />
                    </main>
                  </div>
                </ProtectedRoute>
              } />
              
              <Route path="/kitchen" element={
                <ProtectedRoute>
                  <div className="min-h-screen flex">
                    <Sidebar />
                    <main className="flex-1 md:ml-16 lg:ml-64 transition-all duration-300 ease-in-out">
                      <Kitchen />
                    </main>
                  </div>
                </ProtectedRoute>
              } />
              
              <Route path="/analytics" element={
                <ProtectedRoute allowedRoles={["owner", "manager"]}>
                  <div className="min-h-screen flex">
                    <Sidebar />
                    <main className="flex-1 md:ml-16 lg:ml-64 transition-all duration-300 ease-in-out">
                      <Analytics />
                    </main>
                  </div>
                </ProtectedRoute>
              } />
              
              <Route path="/staff" element={
                <ProtectedRoute allowedRoles={["owner", "manager"]}>
                  <div className="min-h-screen flex">
                    <Sidebar />
                    <main className="flex-1 md:ml-16 lg:ml-64 transition-all duration-300 ease-in-out">
                      <Staff />
                    </main>
                  </div>
                </ProtectedRoute>
              } />
              
              <Route path="/billing" element={
                <ProtectedRoute>
                  <div className="min-h-screen flex">
                    <Sidebar />
                    <main className="flex-1 md:ml-16 lg:ml-64 transition-all duration-300 ease-in-out">
                      <Billing />
                    </main>
                  </div>
                </ProtectedRoute>
              } />
              
              <Route path="/menu" element={
                <ProtectedRoute allowedRoles={["owner", "manager"]}>
                  <div className="min-h-screen flex">
                    <Sidebar />
                    <main className="flex-1 md:ml-16 lg:ml-64 transition-all duration-300 ease-in-out">
                      <MenuManagement />
                    </main>
                  </div>
                </ProtectedRoute>
              } />
              
              <Route path="/crm" element={
                <ProtectedRoute allowedRoles={["owner", "manager"]}>
                  <div className="min-h-screen flex">
                    <Sidebar />
                    <main className="flex-1 md:ml-16 lg:ml-64 transition-all duration-300 ease-in-out">
                      <CustomerRelationship />
                    </main>
                  </div>
                </ProtectedRoute>
              } />
              
              <Route path="/settings" element={
                <ProtectedRoute allowedRoles={["owner"]}>
                  <div className="min-h-screen flex">
                    <Sidebar />
                    <main className="flex-1 md:ml-16 lg:ml-64 transition-all duration-300 ease-in-out">
                      <Settings />
                    </main>
                  </div>
                </ProtectedRoute>
              } />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
