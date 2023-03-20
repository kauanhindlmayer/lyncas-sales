import { Customer } from "./customer/en.js";
import { Sale } from "./sale/en.js";

export const en = {
  CUSTOMER: {
    ...Customer,
  },
  SALE: {
    ...Sale,
  },
  GENERAL: {
    WELCOME: "Welcome to Lyncas",
    NAME: "Name",
    EMAIL: "E-mail",
    PASSWORD: "Password",
    CONFIRM_PASSWORD: "Confirm Password",
    DESCRIPTION:
      "Welcome to Lyncas Sales, a simple <br> application to manage sales and customers.",
    SIGN_IN: "Sign In",
    LOGIN: "Login",
    ALREADY_HAVE_AN_ACCOUNT: "Already have an account?",
    SIGN_UP: "Sign Up",
    DONT_HAVE_AN_ACCOUNT: "Don't have an account?",
    CREATE_ACCOUNT: "Create Account",
    CREATE: "Create",
    PAGE_NOT_FOUND: "Page not found :(",
    PAGE_NOT_FOUND_DESCRIPTION:
      "The page you tried to access is unavailable or does not exist.",
    GREET: "Hello, ",
    LOGOUT: "Logout",
    DASHBOARD: "Dashboard",
    CUSTOMERS: "Customers",
    SALES: "Sales",
    ADD: "Add",
    BACK: "Back",
    SAVE: "Save",
    DELETE: "Delete",
    EDIT: "Edit",
    SUCCESS: "Success",
    SUCCESSFULLY_REGISTERED: "Successfully registered!",
    ERROR: "Error",
    UNEXPECTED_ERROR: "An unexpected error occurred!",
    ALERT: "Warning",
    CONFIRM: "Confirm",
    CONFIRM_ACTION: "Are you sure you want to perform this action?",
    YES: "Yes",
    NO: "No",
    WANT_TO_LEAVE: "Do you really want to leave?",
    CHECK_UNSAVED: "You have unsaved changes. do you really want to leave?",
    CURRENT_PAGE_REPORT: "Showing {first} to {last} of {totalRecords} records",
  },
};