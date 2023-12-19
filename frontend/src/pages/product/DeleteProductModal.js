import React from 'react'
import { Modal } from "../../component";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useUserContext } from '../../context/UserContext';

export const DeleteProductModal = (props) => {
    const { open, handleClose, } = props;
    const { id } = useParams();
    const {currentUser, userContextLoading } = useUserContext();

    const handleDeleteProduct = async () => {
      try {
        await axios.delete(`http://localhost:8080/products/${id}`,
        {headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      })
        handleClose();
   
      } catch (err) {
        console.log(err);
    }
  }
  return (
    <div>
    <Modal open={open} handleClose={handleClose}>
    <h3>Are you sure you want to delete this product?</h3>
  
    <button onClick={handleClose}>Cancel</button>
    <button onClick={handleDeleteProduct}>Delete</button>
  </Modal>
  </div>
  )
}
