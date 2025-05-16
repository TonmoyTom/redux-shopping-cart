import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getCarts = createAsyncThunk("carts", async () => {
  const response = await fetch("http://localhost:5000/cart");
  try {
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
});
const initialState = {
  carts: [],
  cartLists: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "allCart",
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
  extraReducers: (builder) => {
    builder
      .addCase(getCarts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCarts.fulfilled, (state, action) => {
        state.loading = false;
        state.cartLists = action.payload;
      })
      .addCase(getCarts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Use action.error.message for errors from thunk
      });
  },
});

export const { addToCart, removeToCart, removeSingleCart, emptyAllCarts } =
  cartSlice.actions;
export default cartSlice.reducer;
