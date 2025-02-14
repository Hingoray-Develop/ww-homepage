import { useDispatch, useSelector } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";

import appSlice from "../slices/appSlice";
import userSlice from "../slices/userSlice";
import modalSlice from "../slices/modalSlice";
import locationSlice from "../slices/locationSlice";
import loadingSlice from "../slices/loadingSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "location", "app"],
};

const rootReducer = combineReducers({
  app: appSlice.reducer,
  user: userSlice.reducer,
  modal: modalSlice.reducer,
  location: locationSlice.reducer,
  loading: loadingSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Infer the type of makeStore
// export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof makeStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof makeStore.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
// export const useAppStore = useStore.withTypes<AppStore>();
export const persistor = persistStore(makeStore);
