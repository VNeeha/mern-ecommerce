// EXTERNAL IMPORTS
import { configureStore } from "@reduxjs/toolkit";

// IMPORTING STORE SLICES
import userSlice from "./userSlice";
import productsSlice from "./productsSlice";
import cartSlice from "./cartSlice";
import orderSlice from "./orderSlice";

// CREATING STORE
const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    products: productsSlice.reducer,
    cart: cartSlice.reducer,
    orders: orderSlice.reducer,
  },
});

export default store;
