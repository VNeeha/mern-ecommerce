// EXTERNAL IMPORTS
import { createSlice } from "@reduxjs/toolkit";

// --- HARDCODED SAMPLE DATA (used until backend is integrated) ---
const initialOrders = [
  {
    id: "ORD1001",
    userId: "U001",
    items: [
      { productId: "1", quantity: 2, price: 999 },
      { productId: "7", quantity: 1, price: 1500 },
    ],
    totalAmount: 3498,
    paymentMethod: "COD",
    status: "Pending",
    shippingAddress: {
      street: "123 Street",
      city: "Hyderabad",
      state: "TS",
      pincode: "500001",
      country: "India",
    },
    orderedAt: "2025-09-10T12:45:00Z",
    deliveredAt: null,
  },
  {
    id: "ORD1002",
    userId: "U001",
    items: [{ productId: "16", quantity: 1, price: 4500 }],
    totalAmount: 4500,
    paymentMethod: "UPI",
    status: "Shipped",
    shippingAddress: {
      street: "221B Baker Street",
      city: "London",
      state: "London",
      pincode: "NW16XE",
      country: "UK",
    },
    orderedAt: "2025-09-15T15:30:00Z",
    deliveredAt: null,
  },
];

// --- SLICE ---
const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: initialOrders, // Preloaded with sample orders
  },
  reducers: {
    setOrders(state, action) {
      // Replace entire orders array (used after fetching from backend)
      state.orders = action.payload;
    },
    resetOrders(state) {
      // Clear orders (e.g., on logout)
      state.orders = [];
    },
    addOrder(state, action) {
      // Add a newly created order
      state.orders.unshift(action.payload); // unshift to show newest first
    },
  },
});

// --- EXPORTS ---
export default orderSlice;
export const orderActions = orderSlice.actions;
