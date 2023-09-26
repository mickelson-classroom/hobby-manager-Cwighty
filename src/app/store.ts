import { configureStore } from "@reduxjs/toolkit";
import toastsReducer from "../features/toasts/toastSlice";

export const store = configureStore({
  reducer: {
    toastStore: toastsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
