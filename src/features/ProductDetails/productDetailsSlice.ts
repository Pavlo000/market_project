/* eslint-disable no-param-reassign */
import {
  SerializedError,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { ProductService } from '../../services/productsService';
import { IProduct } from '../../types/Product';

export interface ProductDetails {
  product: {
    data: IProduct | null,
    status: 'fullfield' | 'loading' | 'failed',
    error: SerializedError | null,
  }
}

const initialState: ProductDetails = {
  product: {
    data: null,
    status: 'loading',
    error: null,
  },
};

export const getProductAsync = createAsyncThunk(
  'productDetails/fetchProducts',
  async (id: string) => {
    const service = new ProductService();
    const response = await service.getProduct(id);

    return response;
  },
);

export const productDetailsSlice = createSlice({
  name: 'productDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductAsync.pending, (state) => {
        state.product.status = 'loading';
      })
      .addCase(getProductAsync.fulfilled, (state, action) => {
        state.product.status = 'fullfield';
        state.product.data = action.payload;
      })
      .addCase(getProductAsync.rejected, (state, action) => {
        state.product.status = 'failed';
        state.product.error = action.error;
      });
  },
});

export default productDetailsSlice.reducer;
