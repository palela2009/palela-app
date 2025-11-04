import React, { createContext, useContext, useReducer, ReactNode } from "react";

// Profile state type
interface ProfileState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

// Action types
type ProfileAction =
  | { type: "UPDATE_FIELD"; field: keyof ProfileState; value: string }
  | { type: "RESET"; initialState: ProfileState }
  | { type: "SAVE" };

// Context type
interface ProfileContextType {
  profile: ProfileState;
  dispatch: React.Dispatch<ProfileAction>;
}

// Initial state
const initialProfileState: ProfileState = {
  firstName: "გიორგი",
  lastName: "ბერიძე",
  email: "giorgi.beridze@example.com",
  phone: "+995 555 12 34 56",
};

// Reducer function
const profileReducer = (state: ProfileState, action: ProfileAction): ProfileState => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "RESET":
      return action.initialState;
    case "SAVE":
      return state;
    default:
      return state;
  }
};

// Create context
const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

// Provider component
export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, dispatch] = useReducer(profileReducer, initialProfileState);

  return (
    <ProfileContext.Provider value={{ profile, dispatch }}>
      {children}
    </ProfileContext.Provider>
  );
}

// Custom hook to use the profile context
export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
}
