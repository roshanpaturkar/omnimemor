import create from 'zustand';

const useSidebarStateManagerStore = create((set) => ({
    isUpdateProfileOpen: false,
    isUpdateNameOpen: false,
    isUpdatePasswordOpen: false,
    setUpdateProfileOpen: (value) => set({ isUpdateProfileOpen: value }),
    setUpdateNameOpen: (value) => set({ isUpdateNameOpen: value }),
    setUpdatePasswordOpen: (value) => set({ isUpdatePasswordOpen: value }),
}));

export default useSidebarStateManagerStore;
