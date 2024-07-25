import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../actions/taskActions";
import TaskInfo from "./TaskInfo";
import Filters from "./Filters";
import useTasks from "../hooks/useTasks";
import "../styles/TaskList.css";

const TaskList = () => {
  const {
    tasks,
    loading,
    error,
    handleAddTask,
    handleUpdateTask,
    handleDeleteTask,
  } = useTasks();

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // State for filters
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");

  // State for the selected task and modal visibility
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State for sorting
  const [sortColumn, setSortColumn] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  // Memoize categories and priorities
  const categories = useMemo(
    () => [...new Set(tasks.map((task) => task.Category))],
    [tasks]
  );
  const priorities = useMemo(
    () => [...new Set(tasks.map((task) => task.Priority))],
    [tasks]
  );

  // Sort tasks based on current sortColumn and sortOrder
  const sortedTasks = useMemo(() => {
    if (!sortColumn) return tasks;

    return [...tasks].sort((a, b) => {
      let aValue = a[sortColumn];
      let bValue = b[sortColumn];

      if (sortColumn === "DueDate") {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      if (aValue < bValue) {
        return sortOrder === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [tasks, sortColumn, sortOrder]);

  // Handle sorting toggle
  const handleSort = useCallback(
    (column) => {
      if (sortColumn === column) {
        setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
        if (sortOrder === "desc") {
          setSortColumn("");
          setSortOrder("asc");
        }
      } else {
        setSortColumn(column);
        setSortOrder("asc");
      }
    },
    [sortColumn, sortOrder]
  );

  // Filter tasks based on selected filters
  const filteredTasks = useMemo(() => {
    return sortedTasks.filter((task) => {
      return (
        (!selectedCategory || task.Category === selectedCategory) &&
        (!selectedPriority || task.Priority === selectedPriority)
      );
    });
  }, [sortedTasks, selectedCategory, selectedPriority]);

  // Handle double click to select a task and open the modal
  const handleDoubleClick = useCallback((task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  }, []);

  // Close the modal
  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedTask(null);
  }, []);

  // Handle the Create a New Task Button
  const handleAddNewTask = useCallback(() => {
    setSelectedTask(null);
    setIsModalOpen(true);
  }, []);

  // Callback function to fetch tasks
  const handleFetchTaskList = useCallback(() => {
    dispatch(fetchTasks());
    setIsModalOpen(false);
  }, [dispatch]);

  // Handle loading state
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="task-list">
      <div>
        <div className="task-controls">
          <Filters
            categories={categories}
            priorities={priorities}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedPriority={selectedPriority}
            setSelectedPriority={setSelectedPriority}
          />
          <button onClick={handleAddNewTask}>+</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Notes</th>
              <th onClick={() => handleSort("Category")}>
                Category{" "}
                {sortColumn === "Category" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th onClick={() => handleSort("Priority")}>
                Priority{" "}
                {sortColumn === "Priority" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th onClick={() => handleSort("DueDate")}>
                Due Date{" "}
                {sortColumn === "DueDate" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <tr
                key={task.TaskID}
                onDoubleClick={() => handleDoubleClick(task)}
              >
                <td>{task.TaskTitle}</td>
                <td>{task.TaskNotes}</td>
                <td>{task.Category}</td>
                <td>{task.Priority}</td>
                <td>{task.DueDate}</td>
                <td>{task.isCompleted ? "Completed" : "Incomplete"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={handleCloseModal}>
                &times;
              </span>
              {/* Open TaskInfo in modal */}
              <TaskInfo
                selectedTask={selectedTask}
                fetchTaskList={handleFetchTaskList}
                handleAddTask={handleAddTask}
                handleUpdateTask={handleUpdateTask}
                handleDeleteTask={handleDeleteTask}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;
