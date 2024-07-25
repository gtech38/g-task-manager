import axios from "axios";

// Fetch tasks action
export const fetchTasks = () => async (dispatch) => {
  dispatch({ type: "FETCH_TASKS_REQUEST" });
  try {
    const response = await axios.get("/api/tasks");
    dispatch({ type: "FETCH_TASKS_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "FETCH_TASKS_FAILURE", payload: error.message });
  }
};

// Add task action
export const addTask = (task) => async (dispatch) => {
  try {
    const response = await axios.post("/api/tasks", task);
    dispatch({
      type: "ADD_TASK",
      payload: { TaskID: response.data.TaskID, ...task },
    });
  } catch (error) {
    console.error("Error adding task:", error);
  }
};

// Update task action
export const updateTask = (id, task) => async (dispatch) => {
  try {
    await axios.put(`/api/tasks/${id}`, task);
    dispatch({ type: "UPDATE_TASK", payload: { TaskID: id, ...task } });
  } catch (error) {
    console.error("Error updating task:", error);
  }
};

// Delete task action
export const deleteTask = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/tasks/${id}`);
    dispatch({ type: "DELETE_TASK", payload: id });
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};
