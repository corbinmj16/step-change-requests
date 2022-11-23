import create from 'zustand';
import produce from "immer";
import {supabase} from "../utils/supabase";

const defaultState = {
  by_name: "Craig Kerney",
  by_email: "craig@email.com",
  by_phone: "123-123-1234",
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
    set((state) => {
      state.by_name = "Craig Kerney";
      state.by_email = "craig@email.com";
      state.by_phone = "123-123-1234";
      state.title = "";
      state.craft = "";
      state.estimated_hours = "";
      state.done_by = "";
      state.frequency = "";
      state.needed_by = "";
      state.priority = "";
      state.summary = "";
      state.materials = [];
      state.scope = [];
    })
  }
}));