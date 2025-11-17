import React, { createContext, useContext, useReducer, ReactNode } from "react";

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
  | { type: "LOGOUT" };

interface AuthContextType {
  authState: AuthState;
  authDispatch: React.Dispatch<AuthAction>;
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

    default:
      return state;
  }
};

const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, authDispatch] = useReducer(authReducer, initialAuthState);

  console.log(authState)

  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
