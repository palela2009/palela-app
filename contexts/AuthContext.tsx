import React, { createContext, useContext, useReducer, ReactNode, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { tokenStorage } from "../utils/tokenStorage";
import { authService } from "../services/api";

const STORAGE_KEY = "@palela_app_user";
const USERS_STORAGE_KEY = "@palela_app_users";

interface User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

interface AuthState {
  isAuthenticated: boolean;
  currentUser: User | null;
  users: User[];
  isLoading: boolean;
}

type AuthAction =
  | { type: "REGISTER"; user: User }
  | { type: "LOGIN"; email: string; password: string }
  | { type: "LOGOUT" }
  | { type: "SET_AUTH"; user: User }
  | { type: "LOAD_USERS"; users: User[] }
  | { type: "SET_LOADING"; isLoading: boolean };

interface AuthContextType {
  authState: AuthState;
  authDispatch: React.Dispatch<AuthAction>;
  loadStoredUser: () => Promise<void>;
  saveUser: (user: User) => Promise<void>;
  clearUser: () => Promise<void>;
  loginWithToken: (email: string, password: string) => Promise<boolean>;
  verifyAndRestoreSession: () => Promise<boolean>;
  logout: () => Promise<void>;
}

const initialAuthState: AuthState = {
  isAuthenticated: false,
  currentUser: null,
  users: [],
  isLoading: true,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "REGISTER":
      const existingUser = state.users.find(
        (user) => user.email === action.user.email
      );
      if (existingUser) {
        console.warn("User already exists");
        return state;
      }
      return {
        ...state,
        users: [...state.users, action.user],
      };

    case "LOGIN":
      const user = state.users.find(
        (u) => u.email === action.email && u.password === action.password
      );
      if (user) {
        return {
          ...state,
          isAuthenticated: true,
          currentUser: user,
        };
      }
      return state;

    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        currentUser: null,
      };

    case "SET_AUTH":
      return {
        ...state,
        isAuthenticated: true,
        currentUser: action.user,
        isLoading: false,
      };

    case "LOAD_USERS":
      return {
        ...state,
        users: action.users,
      };

    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.isLoading,
      };

    default:
      return state;
  }
};

const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, authDispatch] = useReducer(authReducer, initialAuthState);

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    await loadStoredUsers();
    await verifyAndRestoreSession();
  };

  const verifyAndRestoreSession = async (): Promise<boolean> => {
    try {
      authDispatch({ type: "SET_LOADING", isLoading: true });
      const token = await tokenStorage.getToken();
      
      if (!token) {
        authDispatch({ type: "SET_LOADING", isLoading: false });
        return false;
      }

      const response = await authService.verifyToken();
      
      if (response.success && response.user) {
        authDispatch({ type: "SET_AUTH", user: response.user });
        return true;
      }
      
      await tokenStorage.removeToken();
      authDispatch({ type: "SET_LOADING", isLoading: false });
      return false;
    } catch (error) {
      console.error("Token verification failed:", error);
      await tokenStorage.removeToken();
      authDispatch({ type: "SET_LOADING", isLoading: false });
      return false;
    }
  };

  const loginWithToken = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await authService.login(email, password);
      
      if (response.success && response.token) {
        await tokenStorage.saveToken(response.token);
        authDispatch({ type: "SET_AUTH", user: response.user });
        return true;
      }
      
      return false;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      await clearUser();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const loadStoredUsers = async () => {
    try {
      const usersJson = await AsyncStorage.getItem(USERS_STORAGE_KEY);
      if (usersJson) {
        const users = JSON.parse(usersJson);
        authDispatch({ type: "LOAD_USERS", users });
      }
    } catch (error) {
      console.error("Error loading users:", error);
    }
  };

  const saveUser = async (user: User) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      authDispatch({ type: "SET_AUTH", user });
    } catch (error) {
      console.error("Error saving user:", error);
      throw error;
    }
  };

  const loadStoredUser = async () => {
    try {
      const userJson = await AsyncStorage.getItem(STORAGE_KEY);
      if (userJson) {
        const user = JSON.parse(userJson);
        authDispatch({ type: "SET_AUTH", user });
      }
    } catch (error) {
      console.error("Error loading stored user:", error);
    }
  };

  const clearUser = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      authDispatch({ type: "LOGOUT" });
    } catch (error) {
      console.error("Error clearing user:", error);
      throw error;
    }
  };

  const saveUsersToStorage = async (users: User[]) => {
    try {
      await AsyncStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    } catch (error) {
      console.error("Error saving users:", error);
    }
  };

  useEffect(() => {
    if (authState.users.length > 0) {
      saveUsersToStorage(authState.users);
    }
  }, [authState.users]);

  return (
    <AuthContext.Provider value={{ 
      authState, 
      authDispatch, 
      loadStoredUser, 
      saveUser, 
      clearUser,
      loginWithToken,
      verifyAndRestoreSession,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
