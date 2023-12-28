import React from "react";
import { Modal } from "../../component";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import { useProductContext } from "../../context/ProductContext";

export const DeleteProductModal = (props) => {
  const navigate = useNavigate();
  const { open, handleClose } = props;
  const { id } = useParams();
  const { currentUser, userContextLoading } = useUserContext();
  const { DELETE_PRODUCT } = useProductContext();

  const handleDeleteProduct = async () => {
    try {
      const response = await axios.delete(
        `https://fullstack-backend-d3vu.onrender.com/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );

      const data = await response.data;
      DELETE_PRODUCT(data._id);

      handleClose();
      navigate("/products")
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Modal open={open} handleClose={handleClose}>
        <h3>Are you sure you want to delete this product?</h3>

        <button onClick={handleClose}>Cancel</button>
        <button onClick={handleDeleteProduct}>Delete</button>
      </Modal>
    </div>
  );
};
