import { Alert } from "react-native";
import { Buffer } from 'buffer';
import { API_URL } from "@env";



async function fetchWithTimeout(resource, options = {}) {
  const { timeout = 8000 } = options;
  
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const response = await fetch(resource, {
    ...options,
    signal: controller.signal  
  });
  clearTimeout(id);

  return response;
}

const postExpenseToApi = async (newExpense, sessionExpiredCallback) => {
  let response = await fetchWithTimeout( API_URL + "/addExpense", {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type':'application/json'
    },
    body: JSON.stringify(newExpense)
  });
  let responseBody = await response.json();

  // OK
  if(response.ok){
    Alert.alert("Success", "Expense added successfully!");
    return;
  }

  // UNAUTHORIZED
  if(response.status == 401){
    Alert.alert(
      "Session Expired", 
      "Please log in again to continue",
      sessionExpiredCallback
    );
    return;
  }

  // INTERNAL ERROR
  if(response.status >= 500){
    Alert.alert("Server Error", "Oops! An unknown error happened");
    return;
  }

  // OTHER ERROR
  Alert.alert("API Error", responseBody.message);
};



const doLogout = async () => {
  try {
    let response = await fetchWithTimeout( API_URL + "/logout", {
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

const fetchUserCategories = async (setCategories, sessionExpiredCallback) => {
  let response = await fetchWithTimeout(API_URL + "/getAllCategories", {
    method: "GET",
    credentials: "include",
  });
  let responseBody = await response.json();

  // OK
  if(response.ok){
    setCategories(responseBody);
    return;
  }
  
  // UNAUTHORIZED
  if(response.status == 401){
    Alert.alert(
      "Session Expired", 
      "Please log in again to continue",
      [{text: 'OK', onPress: sessionExpiredCallback}]
    );
    return;
  }

  // INTERNAL ERROR
  if(response.status >= 500){
    Alert.alert("Server Error", "Oops! An unknown error happened");
    return;
  }

  // OTHER ERROR
  Alert.alert("API Error", responseBody.message);
};

const fetchUserCategoriesWithIcons = async (setCategories, sessionExpiredCallback) => {
  let response = await fetchWithTimeout(API_URL + "/getAllCategoriesWithIcons", {
    method: "GET",
    credentials: "include",
  });
  let responseBody = await response.json();

  // OK
  if(response.ok){
    setCategories(responseBody);
    return;
  }
  
  // UNAUTHORIZED
  if(response.status == 401){
    Alert.alert(
      "Session Expired", 
      "Please log in again to continue",
      [{text: 'OK', onPress: sessionExpiredCallback}]
    );
    return;
  }

  // INTERNAL ERROR
  if(response.status >= 500){
    Alert.alert("Server Error", "Oops! An unknown error happened");
    return;
  }

  // OTHER ERROR
  Alert.alert("API Error", responseBody.message);
};


const fetchExpensesList = async (setExpenses, sessionExpiredCallback, request = {}) => {
  try{
    let response = await fetchWithTimeout(API_URL + "/getMyExpenses?categories=" + (request.categories? request.categories.map(c => c + ",")  : "") + "&from=" + (request.from? request.from.toISOString().substring(0,10) : "") + "&until=" + (request.until? request.until.toISOString().substring(0,10) : ""), {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      }
    });
    let responseBody = await response.json();
    // console.log(response);
    // OK
    if(response.ok){
      setExpenses(responseBody);
      return;
    }
    
    // UNAUTHORIZED
    if(response.status == 401){
      Alert.alert(
        "Session Expired", 
        "Please log in again to continue",
        [{text: 'OK', onPress: sessionExpiredCallback}]
      );
      return;
    }

    // INTERNAL ERROR
    if(response.status >= 500){
      Alert.alert("Server Error", "Oops! An unknown error happened");
      return;
    }

    // OTHER ERROR
    Alert.alert("API Error", responseBody.message);

  } catch(error){
    console.log("fetchExpensesList");
    console.log(error);
    Alert.alert("Connection Error", "There was an error connecting to API");
  }
};


const verifyCredentials = async () => {
  try{
    let response = await fetchWithTimeout(API_URL + "/protected", {
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


const doSignIn = async (request) => {
  try {
    let response = await fetchWithTimeout(API_URL + "/login", {
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

const deleteExpense = async (expenseId) => {
  try{
    let response = await fetchWithTimeout(API_URL + "/expenses/" + expenseId, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
      }
    });
    let responseBody = await response.json();

    // OK
    if(response.ok){
      return;
    }

    // INTERNAL ERROR
    if(response.status >= 500){
      Alert.alert("Server Error", "Oops! An unknown error happened");
      return;
    }

    // OTHER ERROR
    Alert.alert(
      "Request Failed", 
      "API says: " + responseBody.message
    );

  } catch (error){
    console.log("deleteExpense");
    console.log(error);
    Alert.alert('Invalid Operation', 'Could not delete expense');
  }
}

const postForgottenPasswordFormToApi = async (formHasErrors, email, navigation) => {
  if(formHasErrors()){
    Alert.alert('Invalid Fields', "One or more required fields are invalid. Please correct these errors and try again.");
    return;
  }

  try{
    let response = await fetchWithTimeout(API_URL + "/auth/forgotten", {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type':'application/json',
      },
      body: JSON.stringify({
        email: email
      })
    });
    let responseBody = await response.json();

    // OK
    if(response.ok){
      Alert.alert(
        "Request Sent", 
        "Please check your inbox",
        [{text: 'OK', onPress: navigation.navigate("Login")}],
      );
      return;
    }

    // INTERNAL ERROR
    if(response.status >= 500){
      Alert.alert("Server Error", "Oops! An unknown error happened");
      return;
    }

    // OTHER ERROR
    Alert.alert(
      "Request Failed", 
      "API says: " + responseBody.message
    );

  } catch (error) {
    console.log("postForgottenPasswordFormToApi");
    console.log(error);
    Alert.alert(
      "Connection Error", 
      "There was an error connecting to API"
    );
  }
};

const postResetPasswordFormToApi = async (formHasErrors, request, navigation) => {
  if(formHasErrors()){
    Alert.alert('Invalid Fields', "One or more required fields are invalid. Please correct these errors and try again.");
    return;
  }

  try {

    let response = await fetchWithTimeout(API_URL + "/auth/forgotten/reset", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type':'application/json',
      },
      body: JSON.stringify(request)
    });
    let responseBody = await response.json();

    // OK
    if(response.ok){
      Alert.alert(
        "Reset Successful", 
        "Password reset successfully!",
        [{text: 'OK', onPress: navigation.navigate("Login")}],
      );
      return;
    }
    
    // INTERNAL ERROR
    if(response.status >= 500){
      Alert.alert("Server Error", "Oops! An unknown error happened");
      return;
    }

    // OTHER ERROR
    Alert.alert("API Error", responseBody.message);

  } catch (error) {
    console.log("postResetPasswordFormToApi");
    console.log(error);
    Alert.alert(
      "Connection Error", 
      "There was an error connecting to API"
    );
  }
};

const postRegistrationToApi = async (request, navigation) => {
  try {
    let response = await fetchWithTimeout(API_URL + "/register", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type':'application/json',
      },
      body: JSON.stringify(request)
    });
    let responseBody = await response.json();

    // OK
    if(response.ok){
      Alert.alert(
        "User Creation Success", 
        "User was created successfully", 
        [{text: 'OK', onPress: navigation.navigate("Login")}]
      );
      return;
    }

    // INTERNAL ERROR
    if(response.status >= 500){
      Alert.alert("Server Error", "Oops! An unknown error happened");
      return;
    }

    // OTHER ERROR
    Alert.alert("API Error", responseBody.message);

  } catch (error) {
    console.log("postRegistrationToApi");
    console.log(error);
    Alert.alert(
      "Connection Error", 
      "There was an error connecting to API"
    );
  }
};

const postChangePassToApi = async (request, navigation) => {
  try {
    let response = await fetchWithTimeout(API_URL + "/auth/password/change", {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type':'application/json',
      },
      body: JSON.stringify(request)
    });
    let responseBody = await response.json();

    // OK
    if(response.ok){
      Alert.alert(
        "Password Change Success", 
        "Your password was changed successfully", 
        [{text: 'OK', onPress: navigation.navigate("Table")}]
      );
      return;
    }

    // INTERNAL ERROR
    if(response.status >= 500){
      Alert.alert("Server Error", "Oops! An unknown error happened");
      return;
    }

    // OTHER ERROR
    Alert.alert("API Error", responseBody.message);

  } catch (error) {
    console.log("postChangePassToApi");
    console.log(error);
    Alert.alert(
      "Connection Error", 
      "There was an error connecting to API"
    );
  }
};

const postEditExpenseToApi = async (request) => {
  try {
    let response = await fetchWithTimeout(API_URL + "/editExpense/" + request.id, {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type':'application/json',
      },
      body: JSON.stringify({
        concept: request.concept,
        amount: request.amount,
        date: request.date,
        category: request.category,
        iconId: request.iconId
      })
    });
    let responseBody = await response.json();

    // OK
    if(response.ok){
      Alert.alert(
        "Expense Edit Success", 
        "Your Expense was edited successfully", 
      );
      return;
    }

    // INTERNAL ERROR
    if(response.status >= 500){
      Alert.alert("Server Error", "Oops! An unknown error happened");
      return;
    }

    // OTHER ERROR
    Alert.alert("API Error", responseBody.message);

  } catch (error) {
    console.log("postEditExpenseToApi");
    console.log(error);
    Alert.alert(
      "Connection Error", 
      "There was an error connecting to API"
    );
  }
};

const fetchBudgetInfo = async (budgetId, setBudgetInfo) => {
  try {
    let response = await fetchWithTimeout(API_URL + "/budget/" + budgetId, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json'
      },
    });
    let responseBody = await response.json();

    // OK
    if(response.ok){
      setBudgetInfo(responseBody);
      return;
    }

    // INTERNAL ERROR
    if(response.status >= 500){
      Alert.alert("Server Error", "Oops! An unknown error happened");
      return;
    }

    // OTHER ERROR
    Alert.alert("API Error", responseBody.message);

  } catch (error) {
    console.log("fetchBudgetInfo");
    console.log(error);
    Alert.alert(
      "Connection Error", 
      "There was an error connecting to API"
    );
  }

};

const fetchUserBudgets = async (setUserBudgets) => {
  try {
    let response = await fetchWithTimeout(API_URL + "/allBudgets", {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json'
      },
    });
    let responseBody = await response.json();

    // OK
    if(response.ok){
      setUserBudgets(responseBody);
      return;
    }

    // INTERNAL ERROR
    if(response.status >= 500){
      Alert.alert("Server Error", "Oops! An unknown error happened");
      return;
    }

    // OTHER ERROR
    Alert.alert("API Error", responseBody.message);

  } catch (error) {
    console.log("fetchUserBudgets");
    console.log(error);
    Alert.alert(
      "Connection Error", 
      "There was an error connecting to API"
    );
  }

};

const postBudgetToApi = async (request) => {
  try {
    let response = await fetchWithTimeout(API_URL + "/addBudget", {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type':'application/json',
      },
      body: JSON.stringify(request)
    });
    let responseBody = await response.json();

    // OK
    if(response.ok){
      Alert.alert(
        "Success", 
        "Budget was created successfully", 
      );
      return;
    }

    // INTERNAL ERROR
    if(response.status >= 500){
      Alert.alert("Server Error", "Oops! An unknown error happened");
      return;
    }

    // OTHER ERROR
    Alert.alert("API Error", responseBody.message);

  } catch (error) {
    console.log("postBudgetToApi");
    console.log(error);
    Alert.alert(
      "Connection Error", 
      "There was an error connecting to API"
    );
  }
};

const fetchActiveBudgetsByDateAndCategory = async (date, category, setActiveBudget) => {
  try {
    let response = await fetchWithTimeout(API_URL + "/getActiveBudgets", {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type':'application/json',
      },
      body: JSON.stringify({ date, category })
    });
    let responseBody = await response.json();

    // OK
    if(response.ok){
      setActiveBudget(responseBody.response);
      return;
    }

    // INTERNAL ERROR
    if(response.status >= 500){
      Alert.alert("Server Error", "Oops! An unknown error happened");
      return;
    }

    // OTHER ERROR
    Alert.alert("API Error", responseBody.message);
  } catch (error) {
    console.log("fetchActiveBudgetsByDateAndCategory");
    console.log(error);
    Alert.alert(
      "Connection Error", 
      "There was an error connecting to API"
    );
  }
};


export {
  fetchActiveBudgetsByDateAndCategory,
  postBudgetToApi,
  fetchBudgetInfo,
  fetchUserBudgets,
  postExpenseToApi, 
  fetchWithTimeout,
  fetchUserCategories, 
  fetchUserCategoriesWithIcons,
  postEditExpenseToApi,
  deleteExpense,
  fetchExpensesList,
  postForgottenPasswordFormToApi,
  postResetPasswordFormToApi,
  postRegistrationToApi,
  postChangePassToApi,
  verifyCredentials,
  doLogout,
  doSignIn
};
