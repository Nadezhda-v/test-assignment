import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const factRequestAsync = createAsyncThunk('fact/axios', () => {
  return axios
    .get('https://catfact.ninja/fact')
    .then(({ data }) => {
      const { fact } = data;

      return fact;
    })
    .catch((error) => ({ error: error.message }));
});
