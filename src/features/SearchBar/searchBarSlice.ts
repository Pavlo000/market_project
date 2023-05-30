/* eslint-disable no-param-reassign */
import {
  PayloadAction,
  createSlice,
} from '@reduxjs/toolkit';

export interface SearchBarState {
  input: string,
}

const initialState: SearchBarState = {
  input: '',
};

export const searchBarSlice = createSlice({
  name: 'searchBar',
  initialState,
  reducers: {
    onSearch: (state, action: PayloadAction<string>) => {
      state.input = action.payload;
    },
  },
});

export const { onSearch } = searchBarSlice.actions;

export default searchBarSlice.reducer;
