import React, { useState } from "react";
import { useDispatch } from "react-redux";
import TaskForm from "./TaskForm";
import axios from "axios";

// Component for displaying and editing task information for an existing task
const TaskInfo = ({
  selectedTask,
  fetchTaskList,
  handleAddTask,
  handleUpdateTask,
  handleDeleteTask,
}) => {
  const isNewTask = !selectedTask;
  const [formMode, setFormMode] = useState(isNewTask ? "create" : "read");
  const [task, setTask] = useState(
    selectedTask || {
      TaskTitle: "",
      TaskNotes: "",
      Category: "",
      Priority: "",
      DueDate: "",
      isCompleted: false,
    }
  );

  // Handle edit button click
  const handleEdit = () => {
    setFormMode("edit");
  };

  // Handle cancel button click
  const handleCancel = () => {
    setFormMode("read");
    setTask(selectedTask);
  };

  // Handle deleting the task
  const handleDelete = async () => {
    try {
      await handleDeleteTask(selectedTask.TaskID);
      // TODO: Double check before deleting
      // TODO: Close Modal
    } catch (error) {
      console.error("Failed to delete task", error);
    }
  };

  // Handle sending the updated form data to the API
  const handleSubmit = async (updatedTask) => {
    try {
      if (isNewTask) {
        await handleAddTask(updatedTask);
      } else {
        // Update an existing task
        const { TaskID, ...taskData } = updatedTask; // Exclude TaskID from the request body
        await handleUpdateTask(selectedTask.TaskID, taskData);
      }
    } catch (error) {
      console.error("Failed to save task", error);
    }
  };

  return (
    <div>
      <TaskForm
        initialValues={task}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
        mode={formMode}
      />
      {formMode === "read" ? (
        <button onClick={handleEdit}>Edit Task</button>
      ) : (
        <div>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default TaskInfo;
