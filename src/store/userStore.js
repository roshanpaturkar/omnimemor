import axios from "axios";
import create from "zustand";
import { devtools, persist } from "zustand/middleware";

const baseApi = process.env.REACT_APP_BASE_API;

let useUserStore = (set) => ({

  userToken: null,
  isUserLoggedIn: false,
  userDetails: null,
  checkUserToken: async () => {
    console.log("<<<<< Checking User Token >>>>>");
    const token = localStorage.getItem("userToken");
    if (token) {
      set({ userToken: token });
    }
  },
  login: async (username, password) => {
    console.log("<<<<< Logging In >>>>>");
    await axios
      .post(`${baseApi}/users/login`, {
        email: username,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("userToken", res.data.token);

        set({ userToken: res.data.token });
        set({ isUserLoggedIn: true });

        delete res.data.user.age;
        delete res.data.user.createdAt;
        delete res.data.user.updatedAt;

        set({ userDetails: res.data.user });
      })
      .catch((err) => {
        console.log("<<<<< ERROR >>>>>", err);
        if (err.response.status === 401) {
          console.log(
            "<<<<<",
            err.response.status,
            err.response.statusText,
            err.response.data.error,
            ">>>>>"
          );
          set({ userToken: null });
          set({ userDetails: null });
          set({ isUserLoggedIn: false });
          localStorage.removeItem("userToken");
        }
      });
  },
  logout: async () => {
    console.log("<<<<< Logging Out >>>>>");
    const token = localStorage.getItem("userToken");
    const config = {
      method: "post",
      url: `${baseApi}/users/logout`,
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };
    await axios(config)
      .then((res) => {
        localStorage.removeItem("userToken");
        set({ userToken: null });
        set({ userDetails: null });
        set({ isUserLoggedIn: false });
      })
      .catch((err) => {
        console.log("<<<<< ERROR >>>>>", err);
        if (err.response.status === 401) {
          console.log(
            "<<<<<",
            err.response.status,
            err.response.statusText,
            err.response.data.error,
            ">>>>>"
          );
          set({ userToken: null });
          set({ userDetails: null });
          set({ isUserLoggedIn: false });
          localStorage.removeItem("userToken");
        }
      });
  },
  getUserDetails: async () => {
    console.log("<<<<< Getting User Details >>>>>");
    const token = localStorage.getItem("userToken");
    if (token) {
      await axios
        .get(`${baseApi}/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          delete res.data.age;
          delete res.data.createdAt;
          delete res.data.updatedAt;

          set({ userDetails: res.data });
          set({ isUserLoggedIn: true });
        })
        .catch((err) => {
          console.log("<<<<< ERROR >>>>>", err);
          if (err.response.status === 401) {
            console.log(
              "<<<<<",
              err.response.status,
              err.response.statusText,
              err.response.data.error,
              ">>>>>"
            );
            set({ userToken: null });
            set({ userDetails: null });
            set({ isUserLoggedIn: false });
            localStorage.removeItem("userToken");
          }
        });
    }
  },
});

useUserStore = persist(useUserStore, { name: "user" });
useUserStore = devtools(useUserStore);

useUserStore = create(useUserStore);

export default useUserStore;
