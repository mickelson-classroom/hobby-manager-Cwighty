import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ToastItemProps } from "../../@types/toast";

interface ToastState {
  toasts: ToastItemProps[];
  dismissed: number[];
}

const initialState: ToastState = {
  toasts: [],
  dismissed: [],
};

export const toastSlice = createSlice({
  name: "toastStore",
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<ToastItemProps>) => {
      state.toasts.push(action.payload);
    },
    dismissToast: (state, action: PayloadAction<number>) => {
      state.toasts = state.toasts.filter(
        (toast) => toast.id !== action.payload
      );
      state.dismissed.push(action.payload);
    },
    removeToast: (state, action: PayloadAction<ToastItemProps>) => {
      state.dismissed = state.dismissed.filter(
        (id) => id !== action.payload.id
      );
    },
    dissmissAll: (state) => {
      state.dismissed = [...state.dismissed, ...state.toasts.map((t) => t.id)];
      state.toasts = [];
    },
    removeAll: (state) => {
      state.dismissed = [];
    },
  },
});

export const {
  addToast,
  dismissToast,
  removeToast,
  removeAll,
  dissmissAll: dismissAll,
} = toastSlice.actions;

export default toastSlice.reducer;
