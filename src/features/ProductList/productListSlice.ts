/* eslint-disable no-param-reassign */
import {
  SerializedError,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import { IProduct } from '../../types/Product';
import { ProductService } from '../../services/productsService';

export interface ProductListState {
  products: {
    data: IProduct[],
    status: 'fullfield' | 'loading' | 'failed',
    error: null | SerializedError
  },
}

const initialState: ProductListState = {
  products: {
    data: [],
    status: 'loading',
    error: null,
  },
};

export const getProductsAsync = createAsyncThunk(
  'productList/fetchProducts',
  async () => {
    const service = new ProductService();
    const response = await service.getProducts();

    return response;
  },
);

export const productListSlice = createSlice({
  name: 'productList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductsAsync.pending, (state) => {
        state.products.status = 'loading';
      })
      .addCase(getProductsAsync.fulfilled, (state, action) => {
        state.products.status = 'fullfield';
        state.products.data = action.payload;
      })
      .addCase(getProductsAsync.rejected, (state, action) => {
        state.products.status = 'failed';
        state.products.error = action.error;
      });
  },
});

export default productListSlice.reducer;
