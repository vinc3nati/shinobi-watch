import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useData, useAuth } from "../../context";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";

export const Signup = ({ title }) => {
  useDocumentTitle(title);
  const { user, handleSignUp } = useAuth();
  const { setLoader } = useData();
  const initialVal = {
    name: "",
    email: "",
    password: "",
  };
  const [signup, setSignup] = useState(initialVal);
  const location = useLocation();
  const from = location.state?.from || "/";

  const handleChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    await handleSignUp({ ...signup, from });
    setSignup(initialVal);
    setLoader(false);
  };

  return (
    <section id="auth">
      <header className="section-heading">Register</header>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="input-grp">
          <label htmlFor="username">Name</label>
          <input
            name="name"
            id="username"
            value={signup.name}
            onChange={handleChange}
            required
            type="text"
            placeholder="John Doe"
          />
        </div>
        <div className="input-grp">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            id="email"
            value={signup.email}
            onChange={handleChange}
            required
            type="email"
            placeholder="example@example.com"
          />
        </div>
        <div className="input-grp">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            id="password"
            value={signup.password}
            onChange={handleChange}
            required
            type="password"
            placeholder="Password"
          />
        </div>
        <button className="btn primary">register</button>
      </form>
      <div className="sub-text text-center">
        Already have an account?{" "}
        <Link to="/login" state={{ from }} className="text-secondary">
          Log in!
        </Link>
      </div>
    </section>
  );
};
