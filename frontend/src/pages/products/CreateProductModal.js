import React, { useState } from "react";
import { Modal } from "../../component";
import axios from "axios";
import * as yup from "yup";
import { useUserContext } from "../../context/UserContext";
import { useProductContext } from "../../context/ProductContext";
import "./Products.css";
import { Radio } from "antd";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/firebase";

const validateForm = yup.object().shape({
  name: yup.string().min(2, "it must be more than 2 characters").required(),
  description: yup.string(),
  price: yup.number(),
  category: yup.string().required(),
});
const plainOptions = ["private", "public"];

export const CreateProductModal = (props) => {
  const [file, setFile] = useState();
  const { open, handleClose } = props;

  const [type, setType] = useState("public");
  const { currentUser } = useUserContext();
  const { CREATE_PRODUCT } = useProductContext();

  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
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

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadImage = async () => {
    const storageRef = ref(storage, file.name);
    await uploadBytes(storageRef, file);
    const downloadImageUrl = await getDownloadURL(storageRef);

    return downloadImageUrl;
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
      formValues.category === "" ||
      file === undefined
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
      const imageUrl = await uploadImage();
      const response = await axios.post(
        "http://localhost:8080/products",
        { ...formValues, image: imageUrl },
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
        imageUrl: "",
      });

      handleClose();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
    <div >
    <Modal
    classname="new-recipe-module"
      open={open}
      handleClose={handleClose}
    >
      <h3>Create new recipe</h3>
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
        <input
          type="file"
          placeholder="enter your image"
          name="image"
          onChange={handleFileChange}
        ></input>
        <Radio.Group
          options={plainOptions}
          onChange={onChangeType}
          value={type}
          optionType="button"
          buttonStyle="solid
    "
        />
        <div className="product-module-buttons">
          <button onClick={handleClose}>Cancel</button>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </form>
    </Modal>
    </div>
     
    </div>
  );
};
