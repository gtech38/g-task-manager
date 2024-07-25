import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

// Main entry point component
const Home = () => {
  // Access the user state from the Redux store
  const user = useSelector((state) => state.auth.user);
  const router = useRouter();

  useEffect(() => {
    // Redirect to the tasks page if the user is authenticated
    // Otherwise, redirect to the login page
    if (user) {
      router.push("/tasks");
    } else {
      router.push("/login");
    }
  }, [user, router]); // Re-run the effect if the user or router changes

  // Return null while redirecting
  return null;
};

export default Home;
