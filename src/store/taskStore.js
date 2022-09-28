import axios from 'axios';
import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { getUserData, getUserToken } from '../utils/userManager';
import { customLogger, httpErrorLogger } from '../utils/logsManager';
import useUserStore  from './userStore'

const baseApi = process.env.REACT_APP_BASE_API;

let useTaskStore = (set, get) => ({
    tasks: [],
    pendingTasks: [],
    completedTasks: [],
    addTask: async (task) => {
        customLogger('Adding Task');
        const token = getUserToken();
        if (token) {
            await axios
                .post(`${baseApi}/tasks`, {
                    description: task,
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
                .then((res) => {
                    get().refreshTasks();
                })
                .catch((err) => {
                    httpErrorLogger(err);
                    if (err.response.status === 401) {
                        useUserStore.getState().resetUserState();
                    }
                });
        }
    },
    updateTask: async (taskId, completed) => {
        customLogger('Updating Task');
        const token = getUserToken();
        if (token) {
            await axios
                .patch(`${baseApi}/tasks/${taskId}`, {
                    completed: !completed,
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    get().refreshTasks();
                })
                .catch((err) => {
                    httpErrorLogger(err);
                    if (err.response.status === 401) {
                        useUserStore.getState().resetUserState();
                    }
                });
        }
    },
    deleteTask: async (taskId) => {
        customLogger('Deleting Task');
        const token = getUserToken();
        if (token) {
            await axios
                .delete(`${baseApi}/tasks/${taskId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    get().refreshTasks();
                })
                .catch((err) => {
                    httpErrorLogger(err);
                    if (err.response.status === 401) {
                        useUserStore.getState().resetUserState();
                    }
                });
        }
    },
    refreshTasks: async () => {
        customLogger('Refreshing Tasks');   
        const token = getUserToken()
        if (token) {
            await axios.get(`${baseApi}/tasks?sortBy=createdAt:desc`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((res) => {
                const pendingTasks = res.data.filter((task) => !task.completed);
                const completedTasks = res.data.filter((task) => task.completed);
                set({ tasks: getUserData(res.data) });
                set({ pendingTasks: getUserData(pendingTasks) });
                set({ completedTasks: getUserData(completedTasks) });
            }).catch((err) => {
                httpErrorLogger(err);
                if (err.response.status === 401) {
                    get().resetTasksTest();
                }
            });
        }
    },
    resetTasksTest: () => {
        set({tasks: []});
        useUserStore.getState().resetUserState();
    }
});

useTaskStore = persist(useTaskStore, { name: 'tasks' });
useTaskStore = devtools(useTaskStore);

useTaskStore = create(useTaskStore);

export default useTaskStore;
