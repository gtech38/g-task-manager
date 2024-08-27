import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTasks,
  addTask,
  updateTask,
  deleteTask,
} from "../actions/taskActions";
import { useUser } from "../context/UserContext";

const useTasks = () => {
  const dispatch = useDispatch();
  const user = useUser();
  const { tasks, loading, error } = useSelector((state) => state.tasks);

  // useEffect(() => {
  //   dispatch(fetchTasks());
  // }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(fetchTasks());
    }
  }, [dispatch, user]);

  const handleAddTask = useCallback(
    async (task) => {
      await dispatch(addTask(task));
    },
    [dispatch]
  );

  const handleUpdateTask = useCallback(
    async (id, task) => {
      await dispatch(updateTask(id, task));
    },
    [dispatch]
  );

  const handleDeleteTask = useCallback(
    async (id) => {
      await dispatch(deleteTask(id));
    },
    [dispatch]
  );

  return {
    tasks,
    loading,
    error,
    handleAddTask,
    handleUpdateTask,
    handleDeleteTask,
  };
};

export default useTasks;
