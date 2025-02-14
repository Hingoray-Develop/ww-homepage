import { makeStore, useAppDispatch, useAppSelector, AppDispatch, RootState } from "./store";
import appSlice, { AppResponse, AuthProvider } from "./slices/appSlice";
import userSlice, { UserInitialState } from "./slices/userSlice";
import modalSlice, { ModalinitialState } from "./slices/modalSlice";
import locationSlice, { LocationInitialState } from "./slices/locationSlice";
import { getTokens, setTokens, removeTokens, Tokens } from "./reactCookie";
import restAPI from "./axios";
export {
  makeStore,
  useAppDispatch,
  useAppSelector,
  appSlice,
  userSlice,
  modalSlice,
  locationSlice,
  AuthProvider,
  restAPI,
  getTokens,
  setTokens,
  removeTokens,
};
export type { AppDispatch, RootState, AppResponse, UserInitialState, ModalinitialState, LocationInitialState, Tokens };
