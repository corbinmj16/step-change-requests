import create from 'zustand';

const defaultState = {
  isOpen: false,
};

export const useAppModalStore = create((set) => ({
  ...defaultState,
  setIsOpen: () => set(state => ({ isOpen: !state.isOpen })),
}));