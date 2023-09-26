import { configureStore } from "@reduxjs/toolkit";
import toastsReducer from "../features/toasts/toastSlice";
import recordReducer from "../features/records/recordSlice";

export const store = configureStore({
  reducer: {
    toastStore: toastsReducer,
    recordStore: recordReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
