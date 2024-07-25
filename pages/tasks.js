import useAuth from "../hooks/useAuth";
import TaskList from "../components/TaskList";
import Filters from "@/components/Filters";

// Tasks page component
const TasksPage = () => {
  const user = useAuth(); // Use the custom hook to ensure the user is authenticated

  if (!user) {
    // If not authenticated, return null (redirect happens in useAuth hook)
    return null;
  }

  return (
    <div>
      <TaskList />
    </div>
  );
};

export default TasksPage;
