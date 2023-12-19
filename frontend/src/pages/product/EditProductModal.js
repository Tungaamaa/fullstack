import React, { useState } from "react";
import { Modal } from "../../component";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useUserContext } from "../../context/UserContext";

export const EditProductModal = (props) => {
  const { open, handleClose, product } = props;
  const { id } = useParams();
  const {currentUser, userContextLoading } = useUserContext();

  const [formValues, setFormValues] = useState({
    name: product.name,
    description: product.description,
    price: product.price,
    category: product.category,
  });

  const handleChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    setFormValues({ ...formValues, [inputName]: inputValue });
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:8080/products/${id}`, formValues,
      {headers: {
        Authorization: `Bearer ${currentUser.token}`,
      },
    }
      );
      setFormValues({
        ...formValues,
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
      <Modal open={open} handleClose={handleClose}>
        <h3>Edit Product</h3>
        <input
          type="text"
          name="name"
          value={formValues.name}
          placeholder="name"
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          value={formValues.description}
          onChange={handleChange}
          placeholder="description"
        />
        <input
          type="text"
          name="price"
          value={formValues.price}
          onChange={handleChange}
          placeholder="price"
        />
        <input
          type="text"
          name="category"
          value={formValues.category}
          onChange={handleChange}
          placeholder="category"
        />
        <button onClick={handleClose}>Cancel</button>
        <button onClick={handleSave}>Save</button>
      </Modal>
    </div>
  );
};
