import {createSlice} from '@reduxjs/toolkit';
import {AppSlice} from './types';

const initialState: AppSlice = {
};

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    resetStore() {
      return initialState;
    }
  },
});

const appReducer = slice.reducer;

const {
  resetStore,
} = slice.actions;

export {
  appReducer,
  resetStore,
};
