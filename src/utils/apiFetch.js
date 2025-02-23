import { Alert } from "react-native";
import { Buffer } from 'buffer';
import { API_URL } from "@env";
import messaging from '@react-native-firebase/messaging'


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

 const removeSharedUser = async (expenseId, userEmail) => {
  try {
    const response = await fetchWithTimeout(`${API_URL}/removeSharedUser`, {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ expenseId, userEmail }),
    });

    if (response.ok) {
      return true;
    }

    const responseBody = await response.json();
    Alert.alert("Error", responseBody.message || "Failed to remove user.");
    return false;
  } catch (error) {
    console.error("removeSharedUser Error:", error);
    Alert.alert("Connection Error", "Unable to connect to the server.");
    return false;
  }
};


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
    return 0;
  }

  // UNAUTHORIZED
  if(response.status == 401){
    Alert.alert(
      "Session Expired", 
      "Please log in again to continue",
      sessionExpiredCallback
    );
    return 1;
  }

  // INTERNAL ERROR
  if(response.status >= 500){
    Alert.alert("Server Error", "Oops! An unknown error happened");
    return 1;
  }

  // OTHER ERROR
  Alert.alert("API Error", responseBody.message);
  return 1
};

const fetchAcceptedSharedExpenses = async (setExpenses, sessionExpiredCallback) => {
  try {
    const response = await fetchWithTimeout(API_URL + "/getAcceptedSharedExpenses", {
      method: "GET",
      credentials: "include",
    });

    if (response.ok) {
      const responseBody = await response.json();
      setExpenses(responseBody);
      return;
    }

    if (response.status === 401) {
      Alert.alert("Session Expired", "Please log in again to continue", [
        { text: "OK", onPress: sessionExpiredCallback },
      ]);
      return;
    }

    Alert.alert("API Error", "Failed to fetch accepted shared expenses.");
  } catch (error) {
    console.error("fetchAcceptedSharedExpenses Error:", error);
    Alert.alert("Connection Error", "Unable to connect to the server.");
  }
};

const manageSharedExpense = async (shareExpenseData, sessionExpiredCallback) => {
  try {
      const response = await fetchWithTimeout(API_URL + "/shareExpense", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(shareExpenseData),
      });

      if (response.ok) {
          return await response.json();
      }

      if (response.status === 401) {
          Alert.alert("Session Expired", "Please log in again to continue", [
              { text: "OK", onPress: sessionExpiredCallback },
          ]);
          return null;
      }

      const responseBody = await response.json();
      Alert.alert("API Error", responseBody.message || "Failed to share expense.");
      return null;
  } catch (error) {
      console.error("manageSharedExpense Error:", error);
      Alert.alert("Connection Error", "Unable to connect to the server.");
      return null;
  }
};

// Fetch shared expense statuses
const fetchSharedExpenseStatuses = async (expenseId, setStatuses, sessionExpiredCallback) => {
  try {
    let response = await fetchWithTimeout(API_URL + `/sharedExpenseStatus/${expenseId}`, {
      method: "GET",
      credentials: "include",
    });

    if (response.ok) {
      const responseBody = await response.json();
      setStatuses(responseBody);
      return;
    }

    if (response.status === 401) {
      Alert.alert("Session Expired", "Please log in again to continue", [
        { text: "OK", onPress: sessionExpiredCallback },
      ]);
      return;
    }

    Alert.alert("API Error", "Failed to fetch shared expense statuses.");
  } catch (error) {
    console.error("fetchSharedExpenseStatuses", error);
    Alert.alert("Connection Error", "Unable to connect to the server.");
  }
};

// Respond to shared expense (ACCEPT, REJECT)
const respondToSharedExpense = async (expenseId, responseData, sessionExpiredCallback) => {
  try {
    let response = await fetchWithTimeout(API_URL + `/respondToSharedExpense/${expenseId}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(responseData),
    });

    if (response.ok) {
      Alert.alert("Success", "Your response was recorded successfully.");
      return;
    }

    if (response.status === 401) {
      Alert.alert("Session Expired", "Please log in again to continue", [
        { text: "OK", onPress: sessionExpiredCallback },
      ]);
      return;
    }

    const responseBody = await response.json();
    Alert.alert("API Error", responseBody.message);
  } catch (error) {
    console.error("respondToSharedExpense", error);
    Alert.alert("Connection Error", "Unable to connect to the server.");
  }
};
const fetchSharedExpenseStatus = async (expenseId, sessionExpiredCallback) => {
  try {
    const response = await fetchWithTimeout(API_URL + `/sharedExpenseStatus/${expenseId}`, {
      method: "GET",
      credentials: "include",
    });

    if (response.ok) {
      // Return the parsed response body
      return await response.json();
    }

    if (response.status === 401) {
      Alert.alert("Session Expired", "Please log in again to continue", [
        { text: "OK", onPress: sessionExpiredCallback },
      ]);
      return null;
    }

    const responseBody = await response.json();
    console.log("internal fetch: " + responseBody)


    Alert.alert("API Error", responseBody.message || "Failed to fetch shared expense status.");
    return null;
  } catch (error) {
    console.error("fetchSharedExpenseStatus Error:", error);
    Alert.alert("Connection Error", "Unable to connect to the server.");
    return null;
  }
};

const fetchPendingSharedExpenses = async (setPendingExpenses, sessionExpiredCallback) => {
  try {
    const response = await fetchWithTimeout(API_URL + "/getPendingSharedExpenses", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const responseBody = await response.json();
      setPendingExpenses(responseBody);
      return;
    }

    if (response.status === 401) {
      Alert.alert("Session Expired", "Please log in again to continue", [
        { text: "OK", onPress: sessionExpiredCallback },
      ]);
      return;
    }

    Alert.alert("API Error", "Failed to fetch pending shared expenses.");
  } catch (error) {
    console.error("fetchPendingSharedExpenses Error:", error);
    Alert.alert("Connection Error", "Unable to connect to the server.");
  }
};




const doLogout = async () => {

  await messaging().deleteToken();

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
  let queryParams = "";


  if (request.categories && request.categories.length > 0) {
      queryParams += ("categories=" + request.categories.join(","));
  }
  if (request.from) {
      queryParams +=((queryParams.length?"&":"")+"from=" + request.from.toISOString().substring(0, 10));
  }
  if (request.until) {
      queryParams+=((queryParams.length?"&":"")+"until=" + request.until.toISOString().substring(0, 10));
  }

  const url = `${API_URL}/getMyExpenses?${queryParams}`;

  try {
      const response = await fetchWithTimeout(url, {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
      });

      const responseBody = await response.json();

      if (response.ok) {
          
          setExpenses(responseBody.map(item => ({
              ...item.expense,
              isOwner: item.isOwner
          })));
      } else {
          console.error("API returned error:", responseBody);
      }
  } catch (error) {
      console.error("fetchExpensesList Error:", error);
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
    console.log("verifyCredentials Error");
    console.log(error.message)
    console.log(error);
    return "5xx";
  }
};


const doSignIn = async (request) => {
  try {

    const fcmToken = await messaging().getToken();
    let formData = new FormData()
    formData.append('remember-me', request.rememberMe)
    formData.append("fcm-token", fcmToken)

    let response = await fetchWithTimeout(API_URL + "/login", {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        
        Authorization: "Basic " + Buffer.from(request.email + ":" + request.password, 'utf8').toString('base64')
      },
      //body: formData
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
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    let responseBody = await response.json();

    // 201 CREATED -> Budget was added successfully
    if (response.ok) {
      Alert.alert("Success", "Budget was created successfully");
      return 0;
    }

    // 409 CONFLICT -> Budget already exists for the category and date range
    if (response.status === 409) {
      Alert.alert("Budget Conflict", "A budget already exists for this category in the selected date range.");
      return 1;
    }

    // 401 UNAUTHORIZED -> User needs to log in again
    if (response.status === 401) {
      Alert.alert("Session Expired", "Please log in again to continue.");
      return 1;
    }

    // 500+ SERVER ERROR
    if (response.status >= 500) {
      Alert.alert("Server Error", "Oops! An unknown error occurred.");
      return 1;
    }

    // Handle other unexpected API errors
    Alert.alert("API Error", responseBody.message || "Something went wrong.");
    return 1;
  } catch (error) {
    console.error("postBudgetToApi Error:", error);
    Alert.alert("Connection Error", "Unable to connect to the server.");
    return 1;
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
    if(response.headers.map["content-length"] == "0"){
      console.log("No active budgets found")
      return
    }
    let responseBody = await response.json();
    console.log(responseBody)

    // OK
    if(response.ok){
      console.log(response.body)
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
    console.log(error.stack);
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
  doSignIn,
  manageSharedExpense,
  fetchSharedExpenseStatuses,
  respondToSharedExpense,
  fetchSharedExpenseStatus,
  fetchPendingSharedExpenses,
  fetchAcceptedSharedExpenses,
  removeSharedUser
};
