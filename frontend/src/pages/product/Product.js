import React, { useEffect, useState } from "react";
import "./Product.css";
import { Header } from "../../component";
import { useParams } from "react-router-dom";
import axios from "axios";
import { EditProductModal } from "./EditProductModal";
import { DeleteProductModal } from "./DeleteProductModal";
import { useUserContext } from "../../context/UserContext";
import { useProductContext } from "../../context/ProductContext";

export const Product = () => {
  const { id } = useParams();

  const [openEdit, setOpenEdit] = React.useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  const [openDelete, setOpenDelete] = React.useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);
  const { currentUser, userContextLoading } = useUserContext();

  const { products, productContextLoading } = useProductContext();

  const product = products.find((product) => product._id === id);

  if (userContextLoading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div> item not found</div>;
  }

  return (
    <div>
      <Header />
      <div className="product-page-top">
        <h1>Best Green Smoothie</h1>
      </div>
      <div className="product-page-main">
        {product && (
          <div className="single-product">
            <div className="single-recipe">
              <div className="single-recipe-content">
                <h3>Recipe name :{product.name}</h3>
                <p>Ingredients : {product.description}</p>
                <p>Instructions : {product.price}</p>
                <p>Description : {product.category}</p>
              </div>
              <div className="single-recipe-image">
                <img className="individual-recipe-image" src={product.image} />
              </div>
            </div>
            <div className="single-recipe-buttons">
            <button onClick={handleOpenEdit}>edit</button>
            <button onClick={handleOpenDelete}>delete</button>
            </div>
           
          </div>
        )}
      </div>
      <EditProductModal
        product={product}
        open={openEdit}
        handleClose={handleCloseEdit}
      />
      <DeleteProductModal open={openDelete} handleClose={handleCloseDelete} />
    </div>
  );
};
