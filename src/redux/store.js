import { configureStore } from '@reduxjs/toolkit';
import clientReducer from './slices/clientSlice';
import projectReducer from './slices/projectSlice';

export const store = configureStore({
  reducer: {
    clients: clientReducer,
    projects: projectReducer,
  },
});
