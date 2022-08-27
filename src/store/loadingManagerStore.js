import create from 'zustand';

const useLoadingManagerStore = create((set) => ({
    loginLoading: false,
    registerLoading: false,
    getAllTaskLoading: false,
    getUserDetailsLoading: false,
    logoutLoading: false,
    setLoginLoading: (value) => set({ loginLoading: value }),
}));

export default useLoadingManagerStore;
