import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carts: [],
};

const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const qtyCheck = state.carts.findIndex(
        (item) => item.id == action.payload.id
      );
      if (qtyCheck >= 0) {
        state.carts[qtyCheck].qnty += 1;
        state.carts[qtyCheck].price =
          state.carts[qtyCheck].qnty * state.carts[qtyCheck].price;
      } else {
        const defaultSet = { ...action.payload, qnty: 1 };
        state.carts = [...state.carts, defaultSet];
      }
      console.log(state, action);
    },
    removeToCart: (state, action) => {
      state.carts = state.carts.filter((item) => item.id !== action.payload);
    },
    removeSingleCart: (state, action) => {
      const qtyDCheck = state.carts.findIndex(
        (item) => item.id == action.payload.id
      );
      console.log(action.payload);
      if (state.carts[qtyDCheck].qnty >= 1) {
        state.carts[qtyDCheck].qnty -= 1;
        state.carts[qtyDCheck].price =
          state.carts[qtyDCheck].qnty * state.carts[qtyDCheck].ogprice;
      }
    },
    emptyAllCarts: (state) => {
      state.carts = [];
    },
  },
});

export const { addToCart, removeToCart, removeSingleCart, emptyAllCarts } = cartSlice.actions;
export default cartSlice.reducer;
