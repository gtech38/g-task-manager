import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { login } from "../actions/authActions";
import "../styles/Login.css";

const Login = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    // Redirect to the tasks page if the user is authenticated
    if (user) {
      router.push("/tasks");
    }
  }, [user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!email || !password) {
      setFormError("Email and password are required");
      return;
    }

    // Dispatch the login action with the entered email and password
    dispatch(login(email, password));
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <h2>LOGIN</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email: </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {/* Button should say Login, but if error.code is auth/invalid-credential  */}
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Login"}
          </button>
          {formError && <div className="error">{formError}</div>}
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default Login;
