
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import RestaurantSelector from "@/components/auth/RestaurantSelector";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { User, LogOut } from "lucide-react";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const [currentRestaurantId, setCurrentRestaurantId] = useState(user?.restaurant_id || "1");

  const handleRestaurantChange = (restaurantId: string) => {
    setCurrentRestaurantId(restaurantId);
    // In a real app, this would update the context and reload data for the selected restaurant
  };

  return (
    <header className="bg-white border-b sticky top-0 z-30">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <h1 className="text-xl font-bold">{title}</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          {user?.role === "owner" && (
            <RestaurantSelector 
              currentRestaurantId={currentRestaurantId}
              onRestaurantChange={handleRestaurantChange}
            />
          )}
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="ml-auto">
                <User className="h-4 w-4 mr-2" />
                {user?.name || "User"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{t('header.myAccount')}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem disabled>
                {user?.role.charAt(0).toUpperCase() + user?.role.slice(1) || "User"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                {t('header.logout')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
