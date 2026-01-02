export interface User {
  id?: string;
  name?: string;
  phone?: string;
  email?: string;
  area?: string;
}

export interface Order {
  id: string;
  type: string;
  customerName: string;
  customerPhone: string;
  area: string;
  address: string;
  codAmount: number;
  distance: number;
  status: 'pending' | 'accepted' | 'picked' | 'out_for_delivery' | 'delivered';
  deliveryStatus?: string;
  cashConfirmed?: boolean;
  acceptedAt?: string;
}

export interface AppState {
  isLoggedIn: boolean;
  isOnline: boolean;
  currentUser: User;
  activeOrders: Order[];
  todayOrdersDelivered: number;
  todayOneTimeDeliveries?: number;
  todaySubscriptionDeliveries?: number;
  availableOrders: Order[];
  rejectedOrders: string[];
  earningsToday: number;
  earningsTotal: number;
}
