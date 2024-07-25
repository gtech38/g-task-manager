import axios from "axios";

// Login action
export const login = (email, password) => async (dispatch) => {
  dispatch({ type: "LOGIN_REQUEST" });
  try {
    // Authenticate with the server
    const response = await axios.post("/api/auth/login", { email, password });
    // Dispatch LOGIN_SUCCESS with the server's user data
    dispatch({ type: "LOGIN_SUCCESS", payload: response.data.user });
  } catch (error) {
    dispatch({
      type: "LOGIN_FAILURE",
      payload: error.response?.data?.error || error.message,
    });
  }
};

// Register action
export const register = (email, password) => async (dispatch) => {
  dispatch({ type: "REGISTER_REQUEST" });
  try {
    // Register user with the server
    const response = await axios.post("/api/auth/register", {
      email,
      password,
    });
    // Dispatch REGISTER_SUCCESS with the server's user data
    dispatch({ type: "REGISTER_SUCCESS", payload: response.data.user });
  } catch (error) {
    dispatch({
      type: "REGISTER_FAILURE",
      payload: error.response?.data?.error || error.message,
    });
  }
};

// Logout action
export const logout = () => async (dispatch) => {
  try {
    // Invalidate session on the server-side if needed
    dispatch({ type: "LOGOUT" });
  } catch (error) {
    // Handle errors if needed
    console.error("Error during logout:", error);
  }
};
