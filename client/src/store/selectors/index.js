import { createSelector } from '@reduxjs/toolkit';

export const tasksSelector = (state) => state.tasksInfo.tasks;
export const currentTaskIdSelector = (state) => state.tasksInfo.currentTaskId;
export const modalSelector = (state) => state.modalInfo;
export const userSelector = (state) => state.userInfo;

export const tasksActiveSelector = createSelector(
  tasksSelector,
  (tasks) => tasks.filter((task) => task.status === 'active'),
);
export const tasksSuccefullSelector = createSelector(
  tasksSelector,
  (tasks) => tasks.filter((task) => task.status === 'succefull'),
);
export const tasksFailedSelector = createSelector(
  tasksSelector,
  (tasks) => tasks.filter((task) => task.status === 'failed'),
);
export const currentTask = createSelector(
  tasksSelector,
  currentTaskIdSelector,
  (tasks, currentTaskId) => tasks.find((task) => task.id === currentTaskId),
);
