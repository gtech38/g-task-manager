import React, { useState, useEffect } from "react";
import axios from "axios";

// Task form component for creating, editing, and reading tasks
const TaskForm = ({ initialValues, onSubmit, onDelete, mode }) => {
  // State to manage form values, errors, and submission status
  const [formValues, setFormValues] = useState({
    TaskTitle: "",
    TaskNotes: "",
    Category: "",
    Priority: "",
    DueDate: "",
    isCompleted: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update form values based on the mode (create, edit, read)
  useEffect(() => {
    if (mode === "create") {
      setFormValues({
        TaskTitle: "",
        TaskNotes: "",
        Category: "",
        Priority: "",
        DueDate: "",
        isCompleted: false,
      });
    } else if (mode === "edit" || mode === "read") {
      setFormValues(initialValues);
    }
    // console.log(mode);
  }, [mode, initialValues]);

  // Validation function to check form values
  const validate = (values) => {
    const errors = {};
    if (!values.TaskTitle) {
      errors.TaskTitle = "Required";
    }
    if (!values.TaskNotes) {
      errors.TaskNotes = "Required";
    }
    if (!values.Category) {
      errors.Category = "Required";
    }
    if (!values.Priority) {
      errors.Priority = "Required";
    }
    if (!values.DueDate) {
      errors.DueDate = "Required";
    } else if (isNaN(Date.parse(values.DueDate))) {
      errors.DueDate = "Invalid date";
    }
    return errors;
  };

  // Handle input change and update form values
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // Handle checkbox change
  const handleCheckboxChange = async (e) => {
    const { checked } = e.target;
    setFormValues({
      ...formValues,
      isCompleted: checked,
    });
  };

  // Validate the form and
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const validationErrors = validate(formValues);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("TaskForm Form Values: " + formValues);
      onSubmit(formValues);
    }
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="TaskTitle">Title</label>
        <input
          name="TaskTitle"
          type="text"
          value={formValues.TaskTitle}
          onChange={handleChange}
          readOnly={mode === "read"} // Read-only in read mode
        />
        {errors.TaskTitle && <div>{errors.TaskTitle}</div>}
      </div>
      <div>
        <label htmlFor="TaskNotes">Notes</label>
        <input
          name="TaskNotes"
          type="text"
          value={formValues.TaskNotes}
          onChange={handleChange}
          readOnly={mode === "read"} // Read-only in read mode
        />
        {errors.TaskNotes && <div>{errors.TaskNotes}</div>}
      </div>
      <div>
        <label htmlFor="Category">Category</label>
        <input
          name="Category"
          type="text"
          value={formValues.Category}
          onChange={handleChange}
          readOnly={mode === "read"} // Read-only in read mode
        />
        {errors.Category && <div>{errors.Category}</div>}
      </div>
      <div>
        <label htmlFor="Priority">Priority</label>
        <input
          name="Priority"
          type="text"
          value={formValues.Priority}
          onChange={handleChange}
          readOnly={mode === "read"} // Read-only in read mode
        />
        {errors.Priority && <div>{errors.Priority}</div>}
      </div>
      <div>
        <label htmlFor="DueDate">Due Date</label>
        <input
          name="DueDate"
          type="date"
          value={formValues.DueDate}
          onChange={handleChange}
          readOnly={mode === "read"} // Read-only in read mode
        />
        {errors.DueDate && <div>{errors.DueDate}</div>}
      </div>
      <div>
        <label htmlFor="isCompleted">Completed</label>
        <input
          name="isCompleted"
          type="checkbox"
          checked={formValues.isCompleted}
          onChange={handleCheckboxChange}
          readOnly={mode === "read"}
        />
      </div>
      {mode !== "read" && (
        <>
          <button type="submit" disabled={isSubmitting}>
            {mode === "edit" ? "Update Task" : "Create Task"}
          </button>
          {mode === "edit" && (
            <button type="button" onClick={onDelete}>
              Delete Task
            </button>
          )}
        </>
      )}
    </form>
  );
};

export default TaskForm;
