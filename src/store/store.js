import { configureStore } from '@reduxjs/toolkit';
import { reducres } from './slices';

export const store = configureStore({
  reducer: reducres,
});
