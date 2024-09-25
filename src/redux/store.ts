import { configureStore } from "@reduxjs/toolkit";
import carSlice from "./feautures/carSlice";
import { baseApi } from "./api/baseApi";
import userSlice from "./feautures/userSlice";
import storage from "redux-persist/lib/storage";
import bookingSlice from "./feautures/bookingSlice";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
} from "redux-persist";
import allUserSlice from "./feautures/allUserSlice";

const persistConfig = {
  key: "user",
  storage,
};

const persistedAuthStore = persistReducer(persistConfig, userSlice);

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    cars: carSlice,
    user: persistedAuthStore,
    allUser: allUserSlice,
    booking: bookingSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
