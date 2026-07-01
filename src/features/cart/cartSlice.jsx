import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { privateApi } from "../../utils/axios";

export const addToCartAsync = createAsyncThunk(
  "cart/add",
  async ({ productId, variationId, quantity }, { rejectWithValue }) => {
    try {
      const response = await privateApi.post(
        `/cart/addToCart/${productId}/variation/${variationId}`,
        { quantity: quantity },
      );

      console.log(response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add cart.",
      );
    }
  },
);

export const getAllCartAsync = createAsyncThunk(
  "cart/get",
  async (_, { rejectWithValue }) => {
    try {
      const response = await privateApi.get(`/cart/getAllCart`);

      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.response?.data);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch cart",
      );
    }
  },
);

export const increaseCartQuantityAsync = createAsyncThunk(
  "cart/increase",
  async ({ productId, variationId }, { rejectWithValue }) => {
    try {
      const response = await privateApi.patch(
        `/cart/increase/${productId}/variation/${variationId}`,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to increase quantity.",
      );
    }
  },
);

export const decreaseCartQuantityAsync = createAsyncThunk(
  "cart/decrease",
  async ({ productId, variationId }, { rejectWithValue }) => {
    try {
      const response = await privateApi.patch(
        `/cart/decrease/${productId}/variation/${variationId}`,
      );

      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to decrease quantity.",
      );
    }
  },
);

export const removeFromCartAsync = createAsyncThunk(
  "cart/remove",
  async ({ productId, variationId }, { rejectWithValue }) => {
    try {
      const response = await privateApi.patch(
        `/cart/remove/${productId}/variation/${variationId}`,
        {
          productId,
        },
      );

      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove from cart.",
      );
    }
  },
);

export const moveToWishlistAsync = createAsyncThunk(
  "cart/moveToWishlist",
  async ({ productId, variationId }, { rejectWithValue }) => {
    try {
      const response = await privateApi.patch(
        `/cart/moveto_wishlist/${productId}/variation/${variationId}`,
        productId,
      );

      // console.log(response.data);

      return response.data;
    } catch (error) {
      rejectWithValue(
        error.response?.data?.message || "Failed to move to wishlist.",
      );
    }
  },
);

export const clearCartAsync = createAsyncThunk(
  "cart/clear",
  async (_, { rejectWithValue }) => {
    try {
      const response = await privateApi.patch(`/cart/clearCart`);

      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to clear cart.",
      );
    }
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],

    status: "idle",
    getCartsLoading: "idle",
    addTocartLoading: "idle",
    increaseQuantityLoading: "idle",
    decreaseQuantityLoading: "idle",
    removeFromCartLoading: "idle",
    moveToWishlistLoading: "idle",
    error: null,
  },

  reducers: {
    addToCart: (state, action) => {
      const {
        product: { id: productId },
        selectedVariation: { id: variationId },
      } = action.payload;

      const productIndex = state.cart.findIndex(
        (cart) =>
          cart?.product?.id === productId &&
          cart?.selectedVariation?.id === variationId,
      );

      if (productIndex === -1) {
        state.cart.push(action.payload);
      } else {
        state.cart[productIndex].quantity += 1;
      }
    },

    clearCart: (state) => {
      state.cart = [];
    },

    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getAllCartAsync.pending, (state) => {
      state.getCartsLoading = "loading";
    });

    builder.addCase(getAllCartAsync.fulfilled, (state, action) => {
      state.getCartsLoading = "success";
      state.cart = action.payload?.carts;
    });

    builder.addCase(getAllCartAsync.rejected, (state, action) => {
      state.getCartsLoading = "error";
      state.error = null;
    });

    builder.addCase(addToCartAsync.pending, (state) => {
      state.addTocartLoading = "loading";
    });

    builder.addCase(addToCartAsync.fulfilled, (state, action) => {
      state.addTocartLoading = "success";
      const productId = action.payload?.cart?.product?.id;
      const variationId = action.payload?.cart?.selectedVariation?.id;

      const cartIndex = state.cart.findIndex(
        (cart) =>
          cart.product.id === productId &&
          cart.selectedVariation.id === variationId,
      );

      if (cartIndex > -1) {
        state.cart[cartIndex].quantity += action.payload?.quantity;
      } else {
        state.cart.push({
          ...action.payload.cart,
        });
      }
    });

    builder.addCase(addToCartAsync.rejected, (state, action) => {
      state.addTocartLoading = "error";
      state.error = action.payload;
    });

    builder.addCase(increaseCartQuantityAsync.pending, (state) => {
      state.increaseQuantityLoading = "loading";
    });
    builder.addCase(increaseCartQuantityAsync.fulfilled, (state, action) => {
      state.increaseQuantityLoading = "success";
      const cartIndex = state.cart.findIndex(
        (cart) =>
          cart.product.id === action.payload.productId &&
          cart.selectedVariation.id === action.payload.variationId,
      );

      state.cart[cartIndex].quantity += 1;
    });

    builder.addCase(increaseCartQuantityAsync.rejected, (state, action) => {
      state.increaseQuantityLoading = "error";
      state.error = action.payload;
    });

    builder.addCase(decreaseCartQuantityAsync.pending, (state) => {
      state.decreaseQuantityLoading = "loading";
    });

    builder.addCase(decreaseCartQuantityAsync.fulfilled, (state, action) => {
      const cartIndex = state.cart.findIndex(
        (cart) =>
          cart.product.id === action.payload.productId &&
          cart.selectedVariation.id === action.payload.variationId,
      );

      if (cartIndex === -1) return;

      const productQuantity = state.cart[cartIndex].quantity;

      if (productQuantity !== 1) {
        state.cart[cartIndex].quantity -= 1;
      } else {
        state.cart.splice(cartIndex, 1);
      }

      state.decreaseQuantityLoading = "success";
    });

    builder.addCase(decreaseCartQuantityAsync.rejected, (state, action) => {
      state.decreaseQuantityLoading = "error";
      state.error = action.payload;
    });

    builder.addCase(removeFromCartAsync.pending, (state) => {
      state.removeFromCartLoading = "loading";
    });

    builder.addCase(removeFromCartAsync.fulfilled, (state, action) => {
      const cartIndex = state.cart.findIndex(
        (cart) =>
          cart.product.id === action.payload.productId &&
          cart.selectedVariation.id === action.payload.variationId,
      );

      if (cartIndex === -1) return;

      state.cart.splice(cartIndex, 1);
      state.removeFromCartLoading = "success";
    });

    builder.addCase(removeFromCartAsync.rejected, (state, action) => {
      state.decreaseQuantityLoading = "error";
      state.error = action.payload;
    });

    builder.addCase(moveToWishlistAsync.pending, (state) => {
      state.moveToWishlistLoading = "loading";
    });

    builder.addCase(moveToWishlistAsync.fulfilled, (state, action) => {
      const { productId, variationId } = action.payload;
      const cartIndex = state.cart.findIndex(
        (cart) =>
          cart?.product?.id === productId &&
          cart?.selectedVariation?.id === variationId,
      );

      if (cartIndex === -1) return;

      state.cart.splice(cartIndex, 1);
      state.moveToWishlistLoading = "success";
    });

    builder.addCase(moveToWishlistAsync.rejected, (state, action) => {
      state.moveToWishlistLoading = "error";
      state.error = action.payload;
    });

    builder.addCase(clearCartAsync.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(clearCartAsync.fulfilled, (state) => {
      state.status = "success";
      state.cart = [];
    });

    builder.addCase(clearCartAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
  },
});

export const { addToCart, clearCart, clearError } = cartSlice.actions;
export default cartSlice;
