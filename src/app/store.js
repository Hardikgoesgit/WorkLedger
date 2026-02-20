import { configureStore } from '@reduxjs/toolkit';
import clientReducer from '../features/clients/clientSlice';
import projectReducer from '../features/projects/projectSlice';

export const store = configureStore({
  reducer: {
    clients: clientReducer,
    projects: projectReducer,
  },
});
