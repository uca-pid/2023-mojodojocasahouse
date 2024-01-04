






// ***********************************
//
//  Expense
//
// ***********************************

declare interface Expense {
  id: string,
  userId: string,
  concept: string,
  amount: string,
  date: string,
  category: string,
  iconId: string
};

declare interface ExpenseCreationRequest {
  concept: string,
  amount: string,
  date: string,
  category: string,
  iconId: string
};

declare interface ExpenseEditingRequest {
  concept: string,
  amount: string,
  date: string,
  category: string,
  iconId: string
};







// ***********************************
//
//  Budgets
//
// ***********************************

declare interface Budget {
  id: string,
  name: string, 
  limitAmount: string,
  currentAmount: string,
  creationDate: string,
  limitDate: string,
  category: string,
  iconId: string
};

declare interface BudgetCreationRequest {
  name: string, 
  limitAmount: string,
  currentAmount: string,
  creationDate: string,
  limitDate: string,
  category: string,
  iconId: string
};







// ***********************************
//
//  Authentication
//
// ***********************************

declare interface UserRegistrationRequest {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  passwordRepeat: string
};

declare interface UserChangePasswordRequest {
  currentPassword: string,
  newPassword: string,
  newPasswordRepeat: string
};

declare interface PasswordResetRequest {
  token: string,
  newPassword: string,
  newPasswordRepeat: string
};







// ***********************************
//
//  Categories
//
// ***********************************

declare type Category = string;
declare interface CategoryWithIcon {
  category: Category,
  iconId: string
};







// ***********************************
//
//  API Responses
//
// ***********************************

declare interface ApiResponse<T = any> {
  message: string,
  response: T
};

declare interface ApiError {
  status: HttpStatusCode,
  message: string,
  errors: string[]
};
