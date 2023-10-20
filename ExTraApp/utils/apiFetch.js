import { Alert } from "react-native";
import { Buffer } from 'buffer';
import { API_URL } from "@env";

const formatCategories = (categoriesResponse) => {
  return categoriesResponse.map(formatCategoryItem);
};

const formatExpenses = (expensesResponse) => {
  return expensesResponse.map(formatExpenseItem);
};

const formatCategoryName = (categoryString) => {
  let formattedItemLabel = categoryString.replaceAll("-", " ");
  formattedItemLabel = [...formattedItemLabel][0].toUpperCase() + [...formattedItemLabel].slice(1).join('');
  return formattedItemLabel;
}

const formatCategoryItem = (categoryString) => {
  let formattedItemLabel = formatCategoryName(categoryString);
  return {
    label: formattedItemLabel,
    value: categoryString,
    inputLabel: "Category: " + formattedItemLabel
  };
};

const formatExpenseItem = (expense) => {
  let formattedCategoryName = formatCategoryName(expense.category);
  return {
    ...expense,
    category: formattedCategoryName
  }
};

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

// const postLogout = async (navigation) => {
//     try {
//     let response = await fetchWithTimeout( API_URL + "/logout", {
//       method: "POST",
//       credentials: "include",
//       headers: {
//         "Content-Type": "application/json",
//       }
//     });

//     // OK
//     if(response.ok){
//       Alert.alert(
//         "Logout Success", 
//         "Logged out successfully",
//         [{text: 'OK', onPress: () => navigation.navigate('Login')}]
//       );
//       return;
//     }
    
//     // UNAUTHORIZED
//     if(response.status == 401){
//       Alert.alert(
//         "Session Expired", 
//         "Please log in again to continue",
//         [{text: 'OK', onPress: () => navigation.navigate('Login')}]
//       );
//       return;
//     }

//     // INTERNAL ERROR
//     if(response.status >= 500){
//       Alert.alert("Server Error", "Oops! An unknown error happened");
//       return;
//     }

//     // OTHER ERROR
//     let responseBody = await response.json();
//     Alert.alert("API Error", responseBody.message);

//   } catch (error) {
//     Alert.alert("Connection Error", "There was an error connecting to API");
//   }
// };

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
    setCategories(formatCategories(responseBody));
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

const fetchExpensesByCategory = async (categoryFilter, setExpenses, sessionExpiredCallback) => {
  try{

    if(categoryFilter == null){
      await fetchExpensesList(setExpenses);
      return;
    }

    let response = await fetchWithTimeout(API_URL + "/getMyExpensesByCategory", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category: categoryFilter
      })
    });
    let responseBody = await response.json();

    // OK
    if(response.ok){
      setExpenses(formatExpenses(responseBody));
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

  } catch (error) {
    console.log(error);
    Alert.alert("Connection Error", "There was an error connecting to API");
  }
};

const fetchExpensesList = async (setExpenses, sessionExpiredCallback) => {
  let response = await fetchWithTimeout(API_URL + "/getMyExpenses", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    }
  });
  let responseBody = await response.json();

  // OK
  if(response.ok){
    setExpenses(formatExpenses(responseBody));
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

// const checkIsLoggedIn = async (navigation) => {
//   try{
//     let response = await fetchWithTimeout(API_URL + "/protected", {
//       method: "GET",
//       credentials: 'include',
//     });

//     // IS LOGGED IN
//     if(response.ok){
//       navigation.navigate('Table');
//       return;
//     }

//     // ERROR
//     if(response.status >= 500){
//       Alert.alert("Server Error", "Oops! An unknown error happened");
//       return;
//     }

//     // NOT LOGGED IN
//     navigation.navigate('Login');
//     return;

//   } catch (error) {
//     console.log(error);
//     Alert.alert("Connection Error", "There was an error connecting to API");
//   }
// };

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
    console.log(error);
    Alert.alert("Connection Error", "There was an error connecting to API");
  }
};

// const postLoginFormToApi = async (navigation, request) => {
//   try {
//     let response = await fetchWithTimeout(API_URL + "/login", {
//       method: 'POST',
//       credentials: 'include',
//       headers: {
//         Accept: 'application/json',
//         Authorization: "Basic " + Buffer.from(request.email + ":" + request.password, 'utf8').toString('base64')
//       },
//       body: new FormData().append('remember-me', request.rememberMe)
//     });
//     let responseBody = await response.json();

//     // OK
//     if (response.ok) {
//       navigation.navigate('Table');
//       return;
//     }

//     // INTERNAL ERROR
//     if(response.status >= 500){
//       Alert.alert("Server Error", "Oops! An unknown error happened");
//       return;
//     }

//     // OTHER ERROR
//     Alert.alert("API Error", responseBody.message);

//   } catch (error) {
//     console.log(error);
//     Alert.alert("Connection Error", "There was an error connecting to API");
//   }
// };

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
    console.log(error);
    Alert.alert("Connection Error", "There was an error connecting to API");
  }
};

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
    Alert.alert(
      "Connection Error", 
      "There was an error connecting to API"
    );
  }
};

const postRegistrationToApi = async (request, navigation) => {
  try {
    let response = await fetch(API_URL + "/register", {
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
    Alert.alert(
      "Connection Error", 
      "There was an error connecting to API"
    );
  }
};

const postChangePassToApi = async (request, navigation) => {
  try {
    let response = await fetch(API_URL + "/auth/password/change", {
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
    Alert.alert(
      "Connection Error", 
      "There was an error connecting to API"
    );
  }
};

export {
  postExpenseToApi, 
  fetchWithTimeout,
  fetchUserCategories, 
  fetchExpensesByCategory,
  fetchExpensesList,
  postForgottenPasswordFormToApi,
  postResetPasswordFormToApi,
  postRegistrationToApi,
  postChangePassToApi,
  verifyCredentials,
  doLogout,
  doSignIn
};
