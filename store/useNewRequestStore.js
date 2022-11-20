import create from 'zustand';
import produce from "immer";

export const useNewRequestStore = create((set) => ({
  by_name: 'Craig Kerney',
  by_email: 'Craig.Kerney@arconic.com',
  by_phone: '563-342-4298',
  title: '',
  craft: '',
  estimated_hours: '',
  done_by: '',
  frequency: 'Daily',
  needed_by: '',
  priority: '',
  summary: '',
  materials: [],
  scope: [],
  handleUpdateNewRequestInfo: (data) => {
    set((state) => ({...state, ...data}));
  },

}));