import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";

// Custom hook to check user authentication status
const useAuth = () => {
  // Access the user state from the Redux store
  const user = useSelector((state) => state.auth.user);
  const router = useRouter();

  useEffect(() => {
    // If there is no user, redirect to the login page
    if (!user) {
      router.push("/login");
    }
  }, [user, router]); // Re-run the effect if the user or router changes

  return user; // Return the user state
};

export default useAuth;
