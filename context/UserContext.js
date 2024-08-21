// User Context stores the current authenticated user
import React, { createContext, useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    console.log("User context updated:", user); // Add this line for debugging
    if (user) {
      setCurrentUser(user);
    } else {
      setCurrentUser(null);
    }
  }, [user]);

  return (
    <UserContext.Provider value={currentUser}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
