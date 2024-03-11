import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { factRequestAsync } from './factAction';

interface FactState {
  loading: boolean;
  fact: string;
  error: string;
}

const initialState: FactState = {
  loading: false,
  fact: '',
  error: '',
};

export const factSlice = createSlice({
  name: 'fact',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(factRequestAsync.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(
        factRequestAsync.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.fact = action.payload;
          state.error = '';
        },
      )
      .addCase(
        factRequestAsync.rejected,
        (state, action: PayloadAction<unknown>) => {
          state.loading = false;
          state.error = (action.payload as Error).message;
        },
      );
  },
});

export const factReducer = factSlice.reducer;
