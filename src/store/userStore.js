import axios from 'axios';
import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { getUserData } from '../utils/userManager';
import { customLogger, httpErrorLogger } from '../utils/logsManager';
import useTaskStore from './taskStore';

const baseApi = process.env.REACT_APP_BASE_API;

let useUserStore = (set, get) => ({
  userToken: null,
  isUserLoggedIn: false,
  userDetails: null,
  checkUserToken: async () => {
    customLogger('Checking User Token');
    const token = localStorage.getItem('userToken');
    if (token) {
      set({ userToken: token });
    }
  },
  login: async (username, password) => {
    customLogger('Logging In');
    await axios
      .post(`${baseApi}/users/login`, {
        email: username,
        password: password,
      })
      .then((res) => {
        localStorage.setItem('userToken', res.data.token);

        set({ userToken: res.data.token });
        set({ isUserLoggedIn: true });
        set({ userDetails: getUserData(res.data.user) });
      })
      .catch((err) => {
        httpErrorLogger(err);
        if (err.response.status === 401) {
          get().resetUserState()
        }
      });
  },
  register: async (name, email, mobile, password) => {
    customLogger('Registering User');
    await axios
      .post(`${baseApi}/users`, {
        name: name,
        email: email,
        mobile: mobile,
        password: password,
      })
      .then((res) => {
        localStorage.setItem('userToken', res.data.token);

        set({ userToken: res.data.token });
        set({ isUserLoggedIn: true });
        set({ userDetails: getUserData(res.data.user) });
      })
      .catch((err) => {
        httpErrorLogger(err);
        if (err.response.status === 401) {
          get().resetUserState()
        }
      });
  },
  logout: async () => {
    customLogger('Logging Out');
    const token = localStorage.getItem('userToken');
    const config = {
      method: 'post',
      url: `${baseApi}/users/logout`,
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };
    await axios(config)
      .then((res) => {
        get().resetUserState();
        useTaskStore.getState().resetTasksTest();
      })
      .catch((err) => {
        httpErrorLogger(err);
        if (err.response.status === 401) {
          get().resetUserState()
        }
      });
  },
  logoutAll: async () => {
    customLogger('Logging Out From All Devices');
    const token = localStorage.getItem('userToken');
    const config = {
      method: 'post',
      url: `${baseApi}/users/logoutAll`,
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };
    await axios(config)
      .then((res) => {
        get().resetUserState();
        useTaskStore.getState().resetTasksTest();
      })
      .catch((err) => {
        httpErrorLogger(err);
        if (err.response.status === 401) {
          get().resetUserState()
        }
      });
  },
  getUserDetails: async () => {
    customLogger('Getting User Details');
    const token = localStorage.getItem('userToken');
    if (token) {
      await axios
        .get(`${baseApi}/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          set({ userDetails: getUserData(res.data) });
          set({ isUserLoggedIn: true });
        })
        .catch((err) => {
          httpErrorLogger(err);
          if (err.response.status === 401) {
            get().resetUserState()
          }
        });
    }
  },
  updateName: async (name) => {
    customLogger('Updating User Name');
    const token = localStorage.getItem('userToken');
    if (token) {
      await axios
        .patch(
          `${baseApi}/users/me`, { name: name },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          set({ userDetails: getUserData(res.data) });
        })
        .catch((err) => {
          httpErrorLogger(err);
          if (err.response.status === 401) {
            get().resetUserState()
          }
        });
    }
  },
  updateAvatar: async (avatar) => {
    customLogger('Updating User Avatar');
    const token = localStorage.getItem('userToken');
    if (token) {
      await axios
        .post(
          `${baseApi}/users/me/avatar`, avatar,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .catch((err) => {
          httpErrorLogger(err);
          if (err.response.status === 401) {
            get().resetUserState()
          }
        });
    }
  },
  resetUserState: () => {
    set({ userToken: null });
    set({ userDetails: { avatar: '' } });
    set({ isUserLoggedIn: false });
    localStorage.removeItem('userToken');
  }
});
useUserStore = persist(useUserStore, { name: 'user' });
useUserStore = devtools(useUserStore);

useUserStore = create(useUserStore);

export default useUserStore;
