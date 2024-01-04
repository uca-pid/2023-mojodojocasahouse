import { createContext } from "react";

interface AuthenticationContext {
  signIn: (request: UserRegistrationRequest) => Promise<void>,
  signOut: () => Promise<void>,
  sessionExpired: () => Promise<void>,
  isLoading: boolean,
  isAuthenticated: boolean,
  isAnonymous: boolean,
  userCredentials: {
    firstName: string,
    lastName: string
  } | undefined
}

export const AuthContext = createContext<AuthenticationContext>({
  signIn: async (request: UserRegistrationRequest) => {},
  signOut: async () => {},
  sessionExpired: async () => {},
  isLoading: true,
  isAuthenticated: false,
  isAnonymous: false,
  userCredentials: undefined
});

