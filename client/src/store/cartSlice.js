import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] }, //array of objects containing product id and quantity
  reducers: {
    setCart: (state, action) => {
      state.items = action.payload.items;
    },
    resetCart: (state) => {
      state.items = [];
    },
    updateCart: (state, action) => {
      const productId = action.payload.id;
      const quantity = action.payload.quantity;
      state.items = state.items.map((item) =>
        item.productId === productId ? { ...item, quantity: quantity } : item
      );
    },
    addToCart: (state, action) => {
      const { productId, quantity = 1 } = action.payload;
      const existingItem = state.items.find(
        (item) => item.productId === productId
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ productId, quantity });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload
      );
    },
    incrementItemQuantity: (state, action) => {
      const productId = action.payload;
      state.items = state.items.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    },
    decrementItemQuantity: (state, action) => {
      const productId = action.payload;
      state.items = state.items
        .map((item) =>
          item.productId === productId
            ? { ...item, quantity: Math.max(item.quantity - 1, 0) }
            : item
        )
        .filter((item) => item.quantity > 0);
    },
  },
});

export default cartSlice;
export const cartActions = cartSlice.actions;
