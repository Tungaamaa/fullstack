import React, { useState } from "react";
import "./Login.css";
import * as yup from "yup";

const validateForm = yup.object().shape({
  email: yup.string().email("Please provide a valid email address.").required(),
  password: yup
    .string()
    .min(
      8,
      "Please enter a valid password. It must be more than 8 characters long."
    )
    .required(),
});

export const Login = () => {
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    yup
      .reach(validateForm, name)
      .validate(value)
      .then((res) => {
        setFormErrors({ ...formErrors, [name]: "" });
      })
      .catch((err) => {
        setFormErrors({ ...formErrors, [name]: err.message });
      });
    setFormValues({ ...formValues, [name]: value });
  };
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
    required: "",
  });
  return (
    <div>
      <div className="login-page-content">
        <div className="login-page-container">
          <h1>Login</h1>
          <input
            type="text"
            placeholder="enter your email address"
            onChange={handleInput}
            value={formValues.email}
            name="email"
          ></input>
          <span>{formErrors.email}</span>
          <input
            type="password"
            placeholder="enter your password"
            value={formValues.password}
            onChange={handleInput}
            name="password"
          ></input>
          <span>{formErrors.password}</span>
          <button>Sign In</button>
        </div>
      </div>
      <p>
      {formErrors.required}
    </p>
    </div>
  );
};
