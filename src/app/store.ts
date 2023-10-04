import { configureStore } from "@reduxjs/toolkit";
import toastsReducer from "../features/toasts/toastSlice";
import recordReducer from "../features/records/recordSlice";
import dawsReducer from "../features/daws/dawsSlice";

export const store = configureStore({
  reducer: {
    toastStore: toastsReducer,
    recordStore: recordReducer,
    dawStore: dawsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
