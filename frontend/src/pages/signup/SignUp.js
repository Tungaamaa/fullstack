import React, { useState } from "react";
import "./SignUp.css";
import * as yup from "yup";

const validateForm = yup.object().shape({
  firstName: yup.string().min(4, "Please enter your complete name.").required(),
  lastName: yup.string().min(4, "Please enter your complete name.").required(),
  email: yup.string().email("Please provide a valid email address.").required(),
  password: yup
    .string()
    .min(
      8,
      "Please enter a valid password. It must be more than 8 characters long."
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

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    yup
      .reach(validateForm, name)
      .validate(value)
      .then((response) => {
        console.log("response");
        setFormErrors({ ...formErrors, [name]: "" });
      })
      .catch((error) => {
        console.log(error.message);
        setFormErrors({ ...formErrors, [name]: error.message });
      });
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div>
      <div className="signup-page-content">
        <div className="signup-page-container">
          <h1>Sign Up</h1>
          <input
            type="text"
            name="firstName"
            value={formValues.firstName}
            onChange={handleInput}
            placeholder="First name"
          ></input>
          {formErrors.firstName}
          <input
            type="text"
            name="lastName"
            value={formValues.lastName}
            onChange={handleInput}
            placeholder="Last name"
          ></input>
          {formErrors.lastName}
          <input
            type="text"
            name="email"
            value={formValues.email}
            onChange={handleInput}
            placeholder="Email address"
          ></input>
          {formErrors.email}
          <input
            type="text"
            name="password"
            value={formValues.password}
            onChange={handleInput}
            placeholder="Password"
          ></input>
          {formErrors.password}
          <button>Submit</button>
        </div>
      </div>
      <h1>{formErrors.required}</h1>
    </div>
  );
};
