import { createSelector } from '@reduxjs/toolkit';

const tasksSelector = (state) => state.tasks;
const currentTaskIdSelector = (state) => state.currentTaskId;

export const tasksActiveSelector = createSelector(
    tasksSelector,
    (tasks) => tasks.filter((task) => task.status === 'active')
);
export const tasksSuccefullSelector = createSelector(
    tasksSelector,
    (tasks) => tasks.filter((task) => task.status === 'succefull')
);
export const tasksFailedSelector = createSelector(
    tasksSelector,
    (tasks) => tasks.filter((task) => task.status === 'failed')
);
export const currentTask = createSelector(
    tasksSelector,
    currentTaskIdSelector,
    (tasks, currentTaskId) => tasks.find((task) => task.id === currentTaskId)
);