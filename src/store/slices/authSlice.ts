import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface SubMenu {
  nav_menu_id: string;
  nav_menu_name: string;
  nav_path: string;
  is_active: boolean;
  is_visible: boolean;
  nav_order: number;
  level: number;
  actions: number[];
}

export interface Permission {
  nav_menu_id: string;
  nav_menu_name: string;
  nav_path: string;
  is_active: boolean;
  is_visible: boolean;
  nav_order: number;
  level: number;
  actions: number[];
  sub_menu: SubMenu[];
}

export interface UserData {
  user_role: string;
  user_name: string;
  permissions: Permission[];
}

interface AuthState {
  user: UserData | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<{ user: UserData; token: string }>) {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, clearError } = authSlice.actions;
export default authSlice.reducer;
