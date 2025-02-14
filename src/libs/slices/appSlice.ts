import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const AuthProvider = {
  apple: "apple",
  google: "google",
  facebook: "facebook",
  kakao: "kakao",
  naver: "naver",
  email: "email",
} as const;

export type AuthProvider = (typeof AuthProvider)[keyof typeof AuthProvider];

type SafeAreaProps = {
  size: {
    top: number;
    bottom: number;
  };
};
type AppTokens = {
  accessToken: string;
  refreshToken: string;
};
type AppRoute = {
  type: "push" | "replace" | "pop";
  path: string;
};

export type AppResponse = {
  appName: string;
  safeArea: SafeAreaProps;
  fromApp: boolean;
  tokens: AppTokens;
  files: string[];
  splashScreen: boolean;
  routes?: AppRoute;
};

type AppInitialState = {
  response: AppResponse;
};

export const appInitialState: AppInitialState = {
  response: {
    appName: import.meta.env.VITE_APP_NAME!,
    fromApp: window.ReactNativeWebView === undefined ? false : true,
    safeArea: {
      size: {
        top: 0,
        bottom: 0,
      },
    },
    tokens: {
      refreshToken: "",
      accessToken: "",
    },
    files: [],
    splashScreen: true,
  },
};

const appSlice = createSlice({
  name: "app",
  initialState: appInitialState,
  reducers: {
    onFromApp(state) {
      state.response.fromApp = true;
    },
    onInvisiableSplashScreen(state) {
      state.response.splashScreen = false;
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          splashScreen: false,
        })
      );
    },
    setSplashScreen(state, action: PayloadAction<AppResponse["splashScreen"]>) {
      state.response.splashScreen = action.payload;
    },
    setSafeArea(state, action: PayloadAction<AppResponse["safeArea"]>) {
      state.response.safeArea = action.payload;
    },
    setAuthTokens(state, action: PayloadAction<AppResponse["tokens"]>) {
      state.response.tokens = action.payload;
    },
    setFiles(state, action: PayloadAction<AppResponse["files"]>) {
      state.response.files = action.payload;
    },
  },
  extraReducers: () => {},
});

export default appSlice;
