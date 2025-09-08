import { configureStore } from "@reduxjs/toolkit";

import userReducer from "@/store/slices/user.slice";

export const store = configureStore({
  reducer: {
    auth: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
