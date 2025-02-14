import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import countryLanguage from "@/helper/countryLanguage.json";

export type Language = keyof typeof countryLanguage;

export type UserTeam = {
  id: number;
  name: string;
  email?: string | null;
  imageUrl?: string | null;
  count?: {
    members: number;
    warehouses: number;
    stores: number;
    supplier: number;
    properties: number;
  };
  createdAt?: string | null;
  url?: string | null;
};

export type UserRole = "ADMIN" | "MANAGER" | "MEMBER" | "SUPERADMIN";

export type UserInitialState = {
  id: number;
  profile: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    profileImageUrl: string;
  };
  teams?: UserTeam[];
  currentTeam?: UserTeam;
  role?: UserRole;
  language?: Language;
};

export const userInitialState: UserInitialState = {
  id: 0,
  profile: {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    profileImageUrl: "",
  },
  teams: [],
  currentTeam: {
    id: 0,
    name: "",
    email: "",
    imageUrl: "",
  },
  role: "MEMBER",
  language: "en",
};

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    setInfo(state, action: PayloadAction<UserInitialState>) {
      state.id = action.payload.id;
      state.profile = action.payload.profile;
      if (action.payload.teams) state.teams = action.payload.teams;
      if (action.payload.currentTeam) state.currentTeam = action.payload.currentTeam;
      if (action.payload.role) state.role = action.payload.role;
      if (action.payload.language) state.language = action.payload.language;
    },
    setLanguage(state, action: PayloadAction<Language>) {
      state.language = action.payload;
    },
    setEmail(state, action: PayloadAction<string>) {
      state.profile.email = action.payload;
    },
    addTeam(state, action: PayloadAction<UserTeam>) {
      state.teams?.push(action.payload);
      state.currentTeam = action.payload;
    },
    setCurrentTeam(state, action: PayloadAction<UserTeam>) {
      state.currentTeam = action.payload;
    },
    removeTeam(state, action: PayloadAction<number>) {
      state.teams = state.teams?.filter((team) => team.id !== action.payload);
    },
    setRole(state, action: PayloadAction<UserRole>) {
      state.role = action.payload;
    },
    logout() {
      return userInitialState;
    }
  },
});
// Action creators are generated for each case reducer function
export const { addTeam, removeTeam, setInfo, setCurrentTeam, setRole, setLanguage, setEmail, logout } = userSlice.actions;

export default userSlice;
