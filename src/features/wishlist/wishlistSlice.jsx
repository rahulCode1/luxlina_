import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privateApi } from "../../utils/axios";

export const getAllWishlistAsync = createAsyncThunk(
  "wishlist/getAllItems",
  async (_, { rejectWithValue }) => {
    try {
      const response = await privateApi.get(`/wishlist/getAllWishlist`);

      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.response?.data?.message);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch wishlist",
      );
    }
  },
);

export const addToWishlistAsync = createAsyncThunk(
  "wishlist/add",
  async ({ productId, variationId }, { rejectWithValue }) => {
    try {
  

      const response = await privateApi.post(
        `/wishlist/addToWishlist/${productId}/variation/${variationId}`,
      );

      // console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update wishlist",
      );
    }
  },
);

export const removeFromWishlistAsync = createAsyncThunk(
  "wishlist/remove",
  async ({ productId, variationId }, { rejectWithValue }) => {
    try {
      const response = await privateApi.delete(
        `/wishlist/removeFromWishlist/${productId}/variation/${variationId}`,
      );

      // console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update wishlist",
      );
    }
  },
);

export const wishlistToCartAsync = createAsyncThunk(
  "wishlist/moveToCart",
  async ({ productId, variationId }, { rejectWithValue }) => {
    try {
      const response = await privateApi.patch(
        `/wishlist/moveToCart/${productId}/variation/${variationId}`,
        productId,
      );

      // console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add to wishlist.",
      );
    }
  },
);

const wishlistSlice = createSlice({
  name: "wishlist",

  initialState: {
    wishlist: [],
    getWishlistLoading: "idle",
    addWishlistLoading: "idle",
    removeFromWishlistLoading: "idle",
    moveToCartLoading: "idle",
    error: null,
  },
  reducers: {
    addToWishlist: (state, action) => {
      state.wishlist.push(action.payload);
    },

    clearError: (state) => {
      state.error = null;
    },

    clearWishlist: (state) => {
      state.wishlist = [];
    },

    clearWishlistError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllWishlistAsync.pending, (state) => {
      state.getWishlistLoading = "loading";
    });
    builder.addCase(getAllWishlistAsync.fulfilled, (state, action) => {
      state.wishlist = action.payload.wishlist;
      state.getWishlistLoading = "success";
    });

    builder.addCase(getAllWishlistAsync.rejected, (state, action) => {
      state.getWishlistLoading = "error";
      state.error = null;
    });

    builder.addCase(addToWishlistAsync.pending, (state) => {
      state.addWishlistLoading = "loading";
    });

    builder.addCase(addToWishlistAsync.fulfilled, (state, action) => {
      state.wishlist.push(action.payload.wishlist);

      state.addWishlistLoading = "success";
    });

    builder.addCase(addToWishlistAsync.rejected, (state, action) => {
      state.addWishlistLoading = "error";
      state.error = action.payload;
    });

    builder.addCase(removeFromWishlistAsync.pending, (state) => {
      state.removeFromWishlistLoading = "loading";
    });

    builder.addCase(removeFromWishlistAsync.fulfilled, (state, action) => {
      const { productId, variationId } = action.payload;

      const findIndex = state.wishlist.findIndex(
        (wish) =>
          wish.product?.id === productId &&
          wish.selectedVariation?.id === variationId,
      );

      if (findIndex !== -1) {
        state.wishlist.splice(findIndex, 1);
      }
      state.removeFromWishlistLoading = "success";
    });

    builder.addCase(removeFromWishlistAsync.rejected, (state, action) => {
      state.removeFromWishlistLoading = "error";
      state.error = action.payload;
    });

    builder.addCase(wishlistToCartAsync.pending, (state) => {
      state.moveToCartLoading = "loading";
    });

    builder.addCase(wishlistToCartAsync.fulfilled, (state, action) => {
      const { productId, variationId } = action.payload;
      const productIndex = state.wishlist.findIndex(
        (wishlist) =>
          wishlist?.product?.id === productId &&
          wishlist?.selectedVariation?.id === variationId,
      );
     


      if (productIndex === -1) {
        return;
      }
      state.wishlist.splice(productIndex, 1);
      state.moveToCartLoading = "success";
    });

    builder.addCase(wishlistToCartAsync.rejected, (state, action) => {
      state.moveToCartLoading = "error";
      state.error = action.payload;
    });
  },
});

export const { addToWishlist, clearError, clearWishlist, clearWishlistError } =
  wishlistSlice.actions;
export default wishlistSlice;
