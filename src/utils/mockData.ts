import { Order } from '../types';

export const mockOrders: Order[] = [
  {
    id: "ABC-ORD-2025-001",
    type: "One-Time",
    customerName: "Rajesh Kumar",
    customerPhone: "9876543210",
    area: "New Delhi",
    address: "123 Main St, Sector 5, New Delhi",
    codAmount: 450,
    distance: 2.5,
    status: "pending"
  },
  {
    id: "ABC-ORD-2025-002",
    type: "Subscription",
    customerName: "Priya Sharma",
    customerPhone: "9876543211",
    area: "East Delhi",
    address: "456 Park Ave, Lajpat Nagar, Delhi",
    codAmount: 320,
    distance: 3.2,
    status: "pending"
  },
  {
    id: "ABC-ORD-2025-003",
    type: "One-Time",
    customerName: "Amit Singh",
    customerPhone: "9876543212",
    area: "South Delhi",
    address: "789 Green Rd, Safdarjung, Delhi",
    codAmount: 580,
    distance: 1.8,
    status: "pending"
  },
  {
    id: "ABC-ORD-2025-004",
    type: "One-Time",
    customerName: "Neha Patel",
    customerPhone: "9876543213",
    area: "West Delhi",
    address: "321 Market St, Karol Bagh, Delhi",
    codAmount: 275,
    distance: 4.1,
    status: "pending"
  },
  {
    id: "ABC-ORD-2025-005",
    type: "Subscription",
    customerName: "Vikas Gupta",
    customerPhone: "9876543214",
    area: "North Delhi",
    address: "654 Business Plaza, North Delhi",
    codAmount: 410,
    distance: 2.8,
    status: "pending"
  }
];
