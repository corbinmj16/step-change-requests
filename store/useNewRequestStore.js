import create from 'zustand';
import produce from "immer";
import {supabase} from "../utils/supabase";

const defaultState = {
  by_name: "Craig Kerney",
  by_email: "Craig.Kerney@arconic.com",
  by_phone: "563-342-4298",
  title: "",
  craft: "",
  estimated_hours: "",
  done_by: "",
  frequency: "Daily",
  needed_by: "",
  priority: "",
  summary: "",
  materials: [],
  scope: [],
};

export const useNewRequestStore = create((set) => ({
  ...defaultState,
  handleUpdateNewRequestInfo: (data) => {
    set((state) => ({...state, ...data}));
  },
  handleAddMaterial: (newMaterial) => {
    if (newMaterial.qty <= 0 || newMaterial.item === '') return;
    set(
      produce((state) => {
        state.materials.push(newMaterial);
      })
    );
  },
  handleDeleteMaterial: (index) => {
    set(
      produce((state) => {
        state.materials.splice(index, 1);

        state.materials = [...state.materials];
      })
    );
  },
  handleAddScopeItem: (newScopeItem) => {
    set(produce((state) => {
      state.scope.push(newScopeItem);
    }));
  },
  handleDeleteScopeItem: (index) => {
    set(produce((state) => {
      state.scope.splice(index, 1);

      state.scope = [...state.scope];
    }));
  },
  resetNewRequestState: () => {
    set(produce((state) => {
      for (const key in defaultState) {
        state[key] = defaultState[key];
      }
    }));
  },
  setAllRequestFields: (request) => {
    set(produce((state) => {
      for (const key in request) {
        state[key] = request[key];
      }
    }));
  }
}));