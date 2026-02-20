import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  projects: [
    { id: 1, clientId: 1, title: "Website Design", amount: 5000, paid: false },
    { id: 2, clientId: 2, title: "Mobile App UI", amount: 8000, paid: true }
  ]
};

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addProject: (state, action) => {
      const { clientId, title, amount } = action.payload;
      const newProject = {
        id: Date.now(),
        clientId: Number(clientId),
        title,
        amount: Number(amount),
        paid: false
      };
      state.projects.push(newProject);
    },
    togglePayment: (state, action) => {
      const project = state.projects.find(p => p.id === action.payload);
      if (project) {
        project.paid = !project.paid;
      }
    },
    removeProject: (state, action) => {
      state.projects = state.projects.filter(p => p.id !== action.payload);
    },
    clearProjects: (state) => {
      state.projects = [];
    }
  }
});

export const { addProject, togglePayment, removeProject, clearProjects } = projectSlice.actions;
export default projectSlice.reducer;
