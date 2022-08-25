import axios from 'axios';
import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { getUserData, getUserToken } from '../utils/userManager';
import { customLogger, httpErrorLogger } from '../utils/logsManager';
import useUserStore  from './userStore'

const baseApi = process.env.REACT_APP_BASE_API;

let useTaskStore = (set, get) => ({
    tasks: [],
    getAllTask: async () => {
        customLogger('Getting All Tasks');   
        const token = getUserToken()
        if (token) {
            await axios.get(`${baseApi}/tasks`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((res) => {
                set({ tasks: getUserData(res.data) });
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
