import { useReducer, useEffect, useMemo } from "react";
import { Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { doLogout, verifyCredentials, doSignIn } from "../utils/apiFetch";
import { AuthContext } from "./AuthContext";


export const AuthenticationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            isLoading: false,
            isAuthenticated: action.isCredentialVerificationSuccessful,
            isAnonymous: !action.isCredentialVerificationSuccessful,
            userCredentials: action.userCredentials,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isAuthenticated: true,
            isAnonymous: false,
            userCredentials: action.userCredentials,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isAuthenticated: false,
            isAnonymous: true,
            userCredentials: undefined,
          };
      }
    },
    {
      isLoading: true,
      isAuthenticated: false,
      isAnonymous: false,
      userCredentials: undefined
    }
  );

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let responseStatus;

      responseStatus = await verifyCredentials();
        
      switch(responseStatus) {
        case("2xx"):
          const credentials = await AsyncStorage.getItem('userCredentials');
          dispatch({ type: 'RESTORE_TOKEN', isCredentialVerificationSuccessful: true, userCredentials: credentials });
          break;
        case("4xx"):
          await AsyncStorage.removeItem("userCredentials");
          dispatch({ type: 'RESTORE_TOKEN', isCredentialVerificationSuccessful: false });
          break;
        case("5xx"):
          Alert.alert("Oops!", "An error ocurred, try again later.", [
            {text: "Try Again", onPress: bootstrapAsync}
          ]);
          break;
      }
    };

    bootstrapAsync();
  }, []);

  const authContext = useMemo(() => ({
    signIn: async (request) => {
      let {status, credentials} = await doSignIn(request);

      switch(status){
        case("2xx"):
          await AsyncStorage.setItem("userCredentials", JSON.stringify(credentials));
          dispatch({ type: 'SIGN_IN', userCredentials: credentials });
          break;
        case("4xx"):
          Alert.alert("Invalid credentials", "Check fields and try again.");
          break;
        case("5xx"):
          Alert.alert("Oops!", "An error ocurred, try again later.");
          break;
      }
    },
    signOut: async () => {
      // First we call API to indicate that we are signing out,
      // this way we can invalidate credentials from backend
      let apiStatusResponse = await doLogout();

      switch(apiStatusResponse){
        case("2xx"):
          await AsyncStorage.removeItem("userCredentials");
          dispatch({ type: 'SIGN_OUT' });
          break;
        case("4xx"):
          await AsyncStorage.removeItem("userCredentials");
          dispatch({ type: 'SIGN_OUT' });
          break;
        case("5xx"):
          Alert.alert("Oops!", "An error ocurred, try again later.");
          break;
      }
    },
    sessionExpired: async () => {
      await AsyncStorage.removeItem("userCredentials");
      dispatch({ type: "SIGN_OUT" });
    },
    ...state
  }), [state]);

  return (
    <AuthContext.Provider value={authContext}>
      {children}
    </AuthContext.Provider>
  );
}
