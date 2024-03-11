import { configureStore } from '@reduxjs/toolkit';

import { factReducer } from './fact/factSlice';
import { ageReducer } from './age/ageSlice';

export const store = configureStore({
  reducer: {
    fact: factReducer,
    age: ageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
