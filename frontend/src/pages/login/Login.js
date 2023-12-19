import React, { useState } from "react";
import "./Login.css";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";

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
  const { signIn } = useUserContext();
  const navigate = useNavigate();
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

  const handleSignIn = async () => {
    if (formValues.email === "" || formValues.password === "") {
      setFormErrors({ ...formErrors, required: "All required fields" });
    } else if (formErrors.email !== "" || formErrors.password !== "") {
      setFormErrors({
        ...formErrors,
        required: "Please enter a valid email or password",
      });
    }
    try {
      const response = await axios.post(
        "http://localhost:8080/users/sign-in",
        formValues
      );
      setFormValues({ email: "", password: "" });
      navigate("/");

      const user = response.data;

      localStorage.setItem("user", JSON.stringify(user));

      signIn(user);
    } catch (error) {
      console.error(error);
    }
  };

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
            className="login-form"
          ></input>
          <span>{formErrors.email}</span>
          <input
            type="password"
            placeholder="enter your password"
            value={formValues.password}
            onChange={handleInput}
            name="password"
            className="login-form"
          ></input>
          <span>{formErrors.password}</span>
          <button className="login-form-button" onClick={handleSignIn}>Sign In</button>
        </div>
      </div>
      <p>{formErrors.required}</p>
    </div>
  );
};
