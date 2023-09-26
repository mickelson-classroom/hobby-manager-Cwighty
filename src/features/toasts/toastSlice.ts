import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ToastItemProps } from '../../@types/toast';

interface ToastState {
    toasts: ToastItemProps[];
    dissmissed: ToastItemProps[];
}

const initialState: ToastState = {
    toasts: [],
    dissmissed: [],
};

export const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        addToast: (state, action: PayloadAction<ToastItemProps>) => {
            state.toasts.push(action.payload);
        },
        dissmissToast: (state, action: PayloadAction<ToastItemProps>) => {
            state.toasts = state.toasts.filter((toast) => toast.id !== action.payload.id);
            state.dissmissed.push(action.payload);
        },
        removeToast: (state, action: PayloadAction<ToastItemProps>) => {
            state.dissmissed = state.dissmissed.filter((toast) => toast.id !== action.payload.id);
        },
        dissmissAll: (state) => {
            state.dissmissed = [...state.dissmissed, ...state.toasts];
            state.toasts = [];
        },
        removeAll: (state) => {
            state.dissmissed = [];
        },
    },
});

export const { addToast, dissmissToast, removeToast, removeAll, dissmissAll } = toastSlice.actions;

export default toastSlice.reducer;