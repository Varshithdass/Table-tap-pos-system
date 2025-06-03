
import React from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Building } from "lucide-react";

// Sample restaurants for demonstration
const sampleRestaurants = [
  {
    id: "1",
    name: "Biryani Palace - Main Branch",
    location: "123 Main St, Bangalore",
  },
  {
    id: "2",
    name: "Biryani Palace - Downtown",
    location: "456 Downtown Ave, Bangalore",
  }
];

interface RestaurantSelectorProps {
  currentRestaurantId: string;
  onRestaurantChange: (restaurantId: string) => void;
}

const RestaurantSelector: React.FC<RestaurantSelectorProps> = ({ 
  currentRestaurantId, 
  onRestaurantChange 
}) => {
  const { toast } = useToast();

  const handleRestaurantChange = (value: string) => {
    onRestaurantChange(value);
    
    const selectedRestaurant = sampleRestaurants.find(r => r.id === value);
    if (selectedRestaurant) {
      toast({
        title: "Restaurant Changed",
        description: `Now viewing ${selectedRestaurant.name}`
      });
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Building className="h-4 w-4 text-muted-foreground" />
      <Select value={currentRestaurantId} onValueChange={handleRestaurantChange}>
        <SelectTrigger className="w-[250px]">
          <SelectValue placeholder="Select restaurant" />
        </SelectTrigger>
        <SelectContent>
          {sampleRestaurants.map(restaurant => (
            <SelectItem key={restaurant.id} value={restaurant.id}>
              {restaurant.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default RestaurantSelector;
