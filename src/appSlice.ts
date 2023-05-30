/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { content, currency } from './constants/contents';

export interface App {
  lang: keyof typeof content,
  currency: keyof typeof currency,
}

const initialState: App = {
  lang: 'en',
  currency: 'usd',
};

export const appSlice = createSlice({
  name: 'productDetails',
  initialState,
  reducers: {
    changeLang: (state, action: PayloadAction<typeof state.lang>) => {
      state.lang = action.payload;
    },
    changeCurrency: (state, action: PayloadAction<typeof state.currency>) => {
      state.currency = action.payload;
    },
  },
});

export const { changeLang, changeCurrency } = appSlice.actions;

export default appSlice.reducer;
