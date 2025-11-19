import React, { createContext, useContext, useReducer, ReactNode, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@palela_app_user";
const USERS_STORAGE_KEY = "@palela_app_users";

interface User {
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
}

type AuthAction =
  | { type: "REGISTER"; user: User }
  | { type: "LOGIN"; email: string; password: string }
  | { type: "LOGOUT" }
  | { type: "SET_AUTH"; user: User }
  | { type: "LOAD_USERS"; users: User[] };

interface AuthContextType {
  authState: AuthState;
  authDispatch: React.Dispatch<AuthAction>;
  loadStoredUser: () => Promise<void>;
  saveUser: (user: User) => Promise<void>;
  clearUser: () => Promise<void>;
}

const initialAuthState: AuthState = {
  isAuthenticated: false,
  currentUser: null,
  users: [],
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
      };

    case "LOAD_USERS":
      return {
        ...state,
        users: action.users,
      };

    default:
      return state;
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, authDispatch] = useReducer(authReducer, initialAuthState);

  useEffect(() => {
    loadStoredUsers();
  }, []);

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
    <AuthContext.Provider value={{ authState, authDispatch, loadStoredUser, saveUser, clearUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
