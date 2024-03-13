import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface AgeRequestProps {
  names: string[];
  signal: AbortSignal;
}

export const ageRequestAsync = createAsyncThunk(
  'age/axios',
  ({ names, signal }: AgeRequestProps) => {
    if (names.length > 10) {
      throw new Error('Введено больше 10 имен');
    }

    let URL_API;

    if (names.length <= 1) {
      URL_API = `https://api.agify.io?name=${names[0]}`;
    } else {
      const encodedNames = names
        .map((name) => `name[]=${encodeURIComponent(name)}`)
        .join('&');

      URL_API = `https://api.agify.io?${encodedNames}`;
    }

    return axios
      .get(`${URL_API}`, { signal })
      .then(({ data }) => {
        return data;
      })
      .catch((error) => ({ error: error.message }));
  },
);
