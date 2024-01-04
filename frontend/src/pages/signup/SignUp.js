import React, { useState } from "react";
import "./SignUp.css";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const validateForm = yup.object().shape({
  firstName: yup.string().min(4, "Please enter your complete name.").required(),
  lastName: yup.string().min(4, "Please enter your complete name.").required(),
  email: yup.string().email("Please provide a valid email address.").required(),
  password: yup
    .string()   
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number, and one special case Character"
    )
    .required(),
});

export const SignUp = () => {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    required: "",
  });

  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    required: "",
  });
  
  const [notification, setNotification] = useState('');

  const navigate = useNavigate();

  const handleInput = async (e) => {
    const name = e.target.name;
    const value = e.target.value;

    try {
      await yup.reach(validateForm, name).validate(value);
      setFormErrors({ ...formErrors, [name]: "" });
    } catch (error) {
      setFormErrors({ ...formErrors, [name]: error.message });
    }

    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async () => {
    if (
      formValues.firstName === "" ||
      formValues.lastName === "" ||
      formValues.email === "" ||
      formValues.password === ""
    ) {
      setFormErrors({ ...formErrors, required: "All required fields" });
    } else if (
      formErrors.firstName !== "" ||
      formErrors.lastName !== "" ||
      formErrors.email !== "" ||
      formErrors.password !== ""
    ) {
      setFormErrors({
        ...formErrors,
        required: "Please enter a valid form name or description",
      });
    } else {
      try {
        const response = await axios.post("https://fullstack-backend-d3vu.onrender.com/users/sign-up", formValues);

        const user = response.data;

        localStorage.setItem("user", JSON.stringify(user));
        setFormValues({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        });
        setNotification('Signup successful!');
        navigate("/");
        
      } catch (error) {
        if (error.response && error.response.status === 409) {
          setNotification('User with this email already exists.');
        } else {
          console.error(error);
        }
      }
    }
  };

  return (
    <div>
      <div className="signup-page-content">
        <div className="signup-page-container">
          <h1>Sign Up</h1>
          <input 
            className="signup-input"
            type="text"
            name="firstName"
            value={formValues.firstName}
            onChange={handleInput}
            placeholder="First name"
          ></input>
          {formErrors.firstName}
          <input
            className="signup-input"
            type="text"
            name="lastName"
            value={formValues.lastName}
            onChange={handleInput}
            placeholder="Last name"
          ></input>
          {formErrors.lastName}
          <input
            className="signup-input"
            type="text"
            name="email"
            value={formValues.email}
            onChange={handleInput}
            placeholder="Email address"
          ></input>
          {formErrors.email}
          <input
            className="signup-input"
            type="text"
            name="password"
            value={formValues.password}
            onChange={handleInput}
            placeholder="Password"
          ></input>
          {formErrors.password}
          <button className="signup-button" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
      <h1>{formErrors.required}</h1>
      <div>{notification}</div>
    </div>
  );
};
