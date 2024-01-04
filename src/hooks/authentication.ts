import { useContext, useEffect } from "react";
import { Buffer } from 'buffer';
import { Alert } from "react-native";
import { useMutation } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";

import { getFromApi, postToApi } from "../utils/fetching";
import { AuthContext } from "../context/AuthContext";
import SessionExpiredError from "../errors/SessionExpiredError";







// ***********************************
//
//  Fetch Queries
//
// ***********************************

export function doLogout(): Promise<null> {
  return postToApi("/logout");
}

export function verifyCredentials(): Promise<ApiResponse> {
  return getFromApi("/protected");
}

export function doSignIn(email: string, password: string, rememberMe: boolean): Promise<ApiResponse> {
  const auth_header = "Basic " + Buffer.from(`${email}:${password}`, 'utf8').toString('base64');
  const remember_me_form = new FormData();
  remember_me_form.append('remember-me', rememberMe);

  return postToApi("/login", {
    headers: {
      Accept: 'application/json',
      Authorization: auth_header
    },
    body: remember_me_form
  });
}

function postForgottenPasswordForm(email: string): Promise<ApiResponse> {
  return postToApi("/auth/forgotten", {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({email})
  });
}

function postPasswordResetForm(request: PasswordResetRequest): Promise<ApiResponse> {
  return postToApi("/auth/forgotten/reset", {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(request)
  });
}

function postRegistrationForm(request: UserRegistrationRequest): Promise<ApiResponse> {
  return postToApi("/register", {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(request)
  });
}

function postChangePasswordForm(request: UserChangePasswordRequest): Promise<ApiResponse> {
  return postToApi("/auth/password/change", {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(request)
  });
}







// ***********************************
//
//  Custom Hooks
//
// ***********************************

/**
 * WIP
 */
export function useAuthentication() {
  return useContext(AuthContext);
}

export function useForgottenPasswordForm() {
  const navigation = useNavigation();
  const { sessionExpired } = useAuthentication();
  const mutation = useMutation({
    mutationFn: postForgottenPasswordForm,
    retry: false
  });

  useEffect(() => {
    if(mutation.error instanceof SessionExpiredError){
      Alert.alert(
        "Session Expired", 
        mutation.error.message, 
        [{text: "Return to Login", onPress: sessionExpired}]
      );
  
    } else if(mutation.isError) {
      Alert.alert(
        "Error",
        mutation.error.message
      );
    }
  }, [mutation.error]);

  useEffect(() => {
    if(mutation.isSuccess){
      Alert.alert(
        "Request Sent", 
        "Please check your inbox",
        [{text: 'OK', onPress: () => navigation.navigate("Login" as never)}],
      );
    }
  }, [mutation.isSuccess]);

  return mutation;
}

export function usePasswordResetForm() {
  const navigation = useNavigation();
  const { sessionExpired } = useAuthentication();
  const mutation = useMutation({
    mutationFn: postPasswordResetForm,
    retry: false
  });

  useEffect(() => {
    if(mutation.error instanceof SessionExpiredError){
      Alert.alert(
        "Session Expired", 
        mutation.error.message, 
        [{text: "Return to Login", onPress: sessionExpired}]
      );
  
    } else if(mutation.isError) {
      Alert.alert(
        "Error",
        mutation.error.message
      );
    }
  }, [mutation.error]);

  useEffect(() => {
    if(mutation.isSuccess){
      Alert.alert(
        "Reset Successful", 
        "Password reset successfully!",
        [{text: 'OK', onPress: () => navigation.navigate("Login" as never)}],
      );
    }
  }, [mutation.isSuccess]);


  return mutation;
}

export function useRegistrationForm() {
  const navigation = useNavigation();
  const { sessionExpired } = useAuthentication();
  const mutation = useMutation({
    mutationFn: postRegistrationForm,
    retry: false
  });

  useEffect(() => {
    if(mutation.error instanceof SessionExpiredError){
      Alert.alert(
        "Session Expired", 
        mutation.error.message, 
        [{text: "Return to Login", onPress: sessionExpired}]
      );
  
    } else if(mutation.isError) {
      Alert.alert(
        "Error",
        mutation.error.message
      );
    }
  }, [mutation.error]);

  useEffect(() => {
    if(mutation.isSuccess){
      Alert.alert(
        "Registration Success",
        "User created successfully",
        [{text: "OK", onPress: () => navigation.navigate("Login" as never)}]
      );
    }
  }, [mutation.isSuccess]);


  return mutation;
}

export function useChangePasswordForm() {
  const navigation = useNavigation();
  const { sessionExpired } = useAuthentication();
  const mutation = useMutation({
    mutationFn: postChangePasswordForm,
    retry: false
  });

  useEffect(() => {
    if(mutation.error instanceof SessionExpiredError){
      Alert.alert(
        "Session Expired", 
        mutation.error.message, 
        [{text: "Return to Login", onPress: sessionExpired}]
      );
  
    } else if(mutation.isError) {
      Alert.alert(
        "Error",
        mutation.error.message
      );
    }
  }, [mutation.error]);

  useEffect(() => {
    if(mutation.isSuccess){
      Alert.alert(
        "Password Change Success", 
        "Your password was changed successfully", 
        [{text: 'OK', onPress: () => navigation.navigate("Table" as never)}]
      );
    }
  }, [mutation.isSuccess]);

  return mutation;
}
