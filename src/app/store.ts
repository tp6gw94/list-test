import { configureStore } from '@reduxjs/toolkit';
import records from '../features/recordsSlice';

export const store = configureStore({
  reducer: {
    records,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
