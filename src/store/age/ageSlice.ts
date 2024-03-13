import { createSlice } from '@reduxjs/toolkit';

import { ageRequestAsync } from './ageAction';

interface AgeState {
  loading: boolean;
  data: {
    name: string;
    age: number;
  }[];
  error: string;
}

const initialState: AgeState = {
  loading: false,
  data: [],
  error: '',
};

export const ageSlice = createSlice({
  name: 'age',
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(ageRequestAsync.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(ageRequestAsync.fulfilled, (state, action) => {
        const { payload } = action;

        state.data = [];

        if (Array.isArray(payload)) {
          state.data = payload;
          state.error = '';
        } else if ('age' in payload && 'name' in payload) {
          state.data = [payload];
          state.error = '';
        } else {
          state.error = payload.error;
        }

        state.loading = false;
      })
      .addCase(ageRequestAsync.rejected, (state, action) => {
        state.loading = false;
        try {
          throw action.error;
        } catch (error) {
          state.error = (error as Error).message;
        }
      });
  },
});

export const ageReducer = ageSlice.reducer;
