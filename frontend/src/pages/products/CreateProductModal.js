import React, { useState } from "react";
import { Modal } from "../../component";
import axios from "axios";
import * as yup from "yup";
import { useUserContext } from "../../context/UserContext";
import { useProductContext } from "../../context/ProductContext";
import "./Products.css";
import { Radio } from 'antd';

const validateForm = yup.object().shape({
  name: yup.string().min(2, "it must be more than 2 characters").required(),
  description: yup.string(),
  price: yup.number(),
  category: yup.string().required(),
});
const plainOptions = ["Private", "Public"];

export const CreateProductModal = (props) => {
  const { open, handleClose } = props;
  
  const [type, setType] = useState("public");
  const { currentUser } = useUserContext();
  const { CREATE_PRODUCT } = useProductContext();

  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    required: "",
  });
 
  const onChangeType = (event) => {
    const { value } = event.target;
    setType(value);
  };
  const handleChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    yup
      .reach(validateForm, inputName)
      .validate(inputValue)
      .then((response) => {
        setFormErrors({ ...formErrors, [inputName]: "" });
      })
      .catch((error) => {
        setFormErrors({ ...formErrors, [inputName]: error.message });
      });
    setFormValues({ ...formValues, [inputName]: inputValue });
  };

  const handleSubmit = async () => {
    if (
      formValues.name === "" ||
      formValues.description === "" ||
      formValues.price === "" ||
      formValues.category === ""
    ) {
      setFormErrors({ ...formErrors, required: "All fields required" });
    } else if (
      formErrors.name !== "" ||
      formErrors.description !== "" ||
      formErrors.price !== "" ||
      formErrors.category !== ""
    ) {
      setFormErrors({
        ...formErrors,
        required: "Please enter a valid form name or description",
      });
    }
    try {
      const response = await axios.post(
        "https://fullstack-backend-d3vu.onrender.com/products",
        formValues,
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );

      const data = await response.data;
      CREATE_PRODUCT(data);

      setFormValues({
        name: "",
        description: "",
        price: "",
        category: "",
      });

      handleClose();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <Modal
        classname="new-product-module"
        open={open}
        handleClose={handleClose}
      >
        <h3>Create product</h3>
        <span>{formErrors.name}</span>
        <form>
        <input
        className="product-input"
        type="text"
        name="name"
        value={formValues.name}
        placeholder="name"
        onChange={handleChange}
      />
      <input
        className="product-input"
        type="text"
        name="description"
        value={formValues.description}
        onChange={handleChange}
        placeholder="description"
      />
      <input
        className="product-input"
        type="number"
        name="price"
        value={formValues.price}
        onChange={handleChange}
        placeholder="price"
      />
      <input
        className="product-input"
        type="text"
        name="category"
        value={formValues.category}
        onChange={handleChange}
        placeholder="category"
      />
      <Radio.Group
      options={plainOptions}
      onChange={onChangeType}
      value={type}
      optionType="button"
      buttonStyle="solid
      "/>
      <div className="product-module-buttons">
      <button onClick={handleClose}>Cancel</button>
      <button onClick={handleSubmit}>Submit</button>
      </div>
        </form>
     
        
      </Modal>
    </div>
  );
};
