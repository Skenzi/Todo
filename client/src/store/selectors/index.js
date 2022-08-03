import { createSelector } from '@reduxjs/toolkit';

export const tasksSelector = (state) => state.tasksInfo.tasks;
export const currentTaskIdSelector = (state) => state.tasksInfo.currentTaskId;
export const modalSelector = (state) => state.modalInfo;
export const userSelector = (state) => state.userInfo;

export const currentTab = (state) => state.tasksInfo.currentTab;

export const currentTasks = createSelector(
  tasksSelector,
  currentTab,
  (tasks, status) => tasks.filter((task) => task.status === status),
);
export const currentTask = createSelector(
  currentTasks,
  currentTaskIdSelector,
  (tasks, currentTaskId) => tasks.find((task) => task.id === currentTaskId),
);
