
export interface User {
  id: string;
  name: string;
  email: string;
  role: "owner" | "manager" | "cashier";
  restaurant_id: string | null;
}

export interface Restaurant {
  id: string;
  name: string;
  location: string;
  contact: string;
  owner_id: string;
  gstin?: string;
  panNumber?: string;
  placeOfSupply?: string;
  taxSettings?: {
    categories: Array<{
      id: string;
      name: string;
      rate: number;
      hsnCode: string;
    }>;
    defaultTaxRate?: number;
  };
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
