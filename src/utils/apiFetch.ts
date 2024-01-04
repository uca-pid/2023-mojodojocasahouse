import { Alert } from "react-native";
import { Buffer } from "buffer";
import { API_URL } from "@env";


export async function doLogout() {
  try {
    let response = await fetch( API_URL + "/logout", {
      method: "POST",
      credentials: "include"
    });

    if (response.status >= 500){
      return "5xx";
    }

    if (response.status >= 400){
      return "4xx";
    }

    if (response.status >= 300){
      return "3xx";
    }

    return "2xx";

  } catch (error) {
    console.log("doLogout");
    console.log(error);
    Alert.alert("Connection Error", "There was an error connecting to API");
  }
};


export async function verifyCredentials() {
  try{
    let response = await fetch(API_URL + "/protected", {
      method: "GET",
      credentials: "include",
    });

    if (response.status >= 500){
      return "5xx";
    }

    if (response.status >= 400){
      return "4xx";
    }

    if (response.status >= 300){
      return "3xx";
    }

    return "2xx";

  } catch (error) {
    console.log("verifyCredentials");
    console.log(error);
    return "5xx";
  }
};


export async function doSignIn(request: any) {  
  console.log(request);

  try {
    let response = await fetch(API_URL + "/login", {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        Authorization: "Basic " + Buffer.from(request.email + ":" + request.password, 'utf8').toString('base64')
      },
      body: new FormData().append('remember-me', request.rememberMe)
    });
    let responseBody = await response.json();

    if (response.status >= 500){
      return {status: "5xx", credentials: null};
    }

    if (response.status >= 400){
      return {status: "4xx", credentials: null};
    }

    if (response.status >= 300){
      return {status: "3xx", credentials: null};
    }

    return {status: "2xx", credentials: responseBody.response};

  } catch (error) {
    console.log("doSignIn");
    console.log(error);
    Alert.alert("Connection Error", "There was an error connecting to API");
    return {status: "5xx", credentials: null}
  }
};



