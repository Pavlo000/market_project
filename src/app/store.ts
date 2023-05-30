/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/indent */
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import productListReducer from '../features/ProductList/productListSlice';
// eslint-disable-next-line max-len
import productDetailsReducer from '../features/ProductDetails/productDetailsSlice';
import appReducer from '../appSlice';
import searchBarReducer from '../features/SearchBar/searchBarSlice';
import productFilterReducer from '../features/ProductFilter/productFilterSlice';

export const store = configureStore({
  reducer: {
    productList: productListReducer,
    productDetails: productDetailsReducer,
    app: appReducer,
    searchBar: searchBarReducer,
    productFilter: productFilterReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
