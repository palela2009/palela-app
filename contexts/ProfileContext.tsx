import React, { createContext, useContext, useReducer, ReactNode } from "react";

interface ProfileState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

type ProfileAction =
  | { type: "UPDATE_FIELD"; field: keyof ProfileState; value: string }
  | { type: "RESET"; initialState: ProfileState }
  | { type: "SAVE" }
  | { type: "LOAD_USER"; user: ProfileState };

interface ProfileContextType {
  profile: ProfileState;
  dispatch: React.Dispatch<ProfileAction>;
}

const initialProfileState: ProfileState = {
  firstName: "გიორგი",
  lastName: "ბერიძე",
  email: "giorgi.beridze@example.com",
  phone: "+995 555 12 34 56",
};

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
    case "LOAD_USER":
      return action.user;
    default:
      return state;
  }
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, dispatch] = useReducer(profileReducer, initialProfileState);

  return (
    <ProfileContext.Provider value={{ profile, dispatch }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
}
