import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../features/cartStore";

export const store = configureStore({
  reducer: {
    allCart: cartSlice,
  },
});
