import { createSelector } from '@reduxjs/toolkit';

// Base selector
const selectProjects = (state) => state.projects.projects;

// Memoized selectors for derived state
export const selectTotalProjects = createSelector(
  [selectProjects],
  (projects) => projects.length
);

export const selectTotalRevenue = createSelector(
  [selectProjects],
  (projects) => projects.reduce((total, project) => total + project.amount, 0)
);

export const selectPaidRevenue = createSelector(
  [selectProjects],
  (projects) => projects
    .filter(project => project.paid)
    .reduce((total, project) => total + project.amount, 0)
);

export const selectPendingRevenue = createSelector(
  [selectProjects],
  (projects) => projects
    .filter(project => !project.paid)
    .reduce((total, project) => total + project.amount, 0)
);
