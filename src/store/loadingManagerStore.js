import create from 'zustand';

const useLoadingManagerStore = create((set) => ({
    loading: false,
    loginLoading: false,
    registerLoading: false,
    getAllTaskLoading: false,
    getUserDetailsLoading: false,
    logoutLoading: false,
    setLoading: (value) => set({ loading: value }),
    setLoginLoading: (value) => set({ loginLoading: value }),
    setRegisterLoading: (value) => set({ registerLoading: value }),
}));

export default useLoadingManagerStore;
