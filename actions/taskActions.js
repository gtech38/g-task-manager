import axios from "axios";

// Fetch tasks action
export const fetchTasks = () => async (dispatch, getState) => {
  const user = getState().auth.user; // Get user from state
  dispatch({ type: "FETCH_TASKS_REQUEST" });
  try {
    console.log("user ID in fetch task action" + user.uid);
    // const response = await axios.get("/api/tasks", { userID: user.uid });
    const response = await axios.get(`/api/tasks?userId=${user.uid}`); // Pass userId as query parameter
    dispatch({ type: "FETCH_TASKS_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "FETCH_TASKS_FAILURE", payload: error.message });
  }
};

// Add task action
export const addTask = (task) => async (dispatch, getState) => {
  try {
    const user = getState().auth.user; // Get user from state
    console.log("user in addTask Action: " + user.uid);
    const response = await axios.post("/api/tasks", {
      ...task,
      userId: user.uid,
    });
    dispatch({
      type: "ADD_TASK",
      payload: { TaskID: response.data.TaskID, ...task },
    });
  } catch (error) {
    console.error("Error adding task:", error);
  }
};

// Update task action
export const updateTask = (id, task) => async (dispatch, getState) => {
  try {
    const user = getState().auth.user; // Get user from state
    console.log("Updating task for user:", user.uid, "Task ID:", id);
    await axios.put(`/api/tasks/${id}?userId=${user.uid}`, task);
    dispatch({ type: "UPDATE_TASK", payload: { TaskID: id, ...task } });
  } catch (error) {
    console.error("Error updating task:", error);
  }
};

// Delete task action
export const deleteTask = (id) => async (dispatch, getState) => {
  try {
    const user = getState().auth.user; // Get user from state
    await axios.delete(`/api/tasks/${id}?userId=${user.uid}`);
    dispatch({ type: "DELETE_TASK", payload: id });
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};
