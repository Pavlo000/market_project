/* eslint-disable no-param-reassign */
import {
  PayloadAction,
  createSlice,
} from '@reduxjs/toolkit';

export interface ProductFilterState {
  sortBy: string,
  priceRange: {
    min: null | number,
    max: null | number,
  },
}

const initialState: ProductFilterState = {
  sortBy: '',
  priceRange: {
    min: null,
    max: null,
  },
};

export const productFilterSlice = createSlice({
  name: 'productFilter',
  initialState,
  reducers: {
    setPriceRange: (state, action: PayloadAction<typeof state.priceRange>) => {
      state.priceRange = action.payload;
    },
    unsetPriceRange: (state) => {
      state.priceRange = {
        min: null,
        max: null,
      };
    },
    setSortBy: (state, action: PayloadAction<typeof state.sortBy>) => {
      state.sortBy = action.payload;
    },
    unsetSortBy: (state) => {
      state.sortBy = '';
    },
  },
});

export const {
  setPriceRange,
  setSortBy,
  unsetPriceRange,
  unsetSortBy,
} = productFilterSlice.actions;

export default productFilterSlice.reducer;
