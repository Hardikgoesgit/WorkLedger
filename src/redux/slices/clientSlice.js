import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  clients: [
    { id: 1, name: "Acme Corp", email: "acme@mail.com" },
    { id: 2, name: "Startup Inc", email: "startup@mail.com" }
  ]
};

const clientSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    addClient: (state, action) => {
      const { name, email } = action.payload;
      const newClient = {
        id: Date.now(),
        name,
        email
      };
      state.clients.push(newClient);
    }
  }
});

export const { addClient } = clientSlice.actions;
export default clientSlice.reducer;
