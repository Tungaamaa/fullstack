import React, { useEffect, useState } from "react";
import "./Products.css";
import { Header } from "../../component";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Modal } from "../../component";
import { CreateProductModal } from "./CreateProductModal";
import { useUserContext } from "../../context/UserContext";
import { useProductContext } from "../../context/ProductContext";
import background from "../../images/background.jpeg";

export const Products = () => {
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { products } = useProductContext();

  if (!products) {
    return <div>products not found </div>;
  }

  return (
    <div>
      <Header />
      <img className="products-page-background" src={background} />
      <div>
        <div className="products-page-top">
          <h1>Delicious Smoothie Recipes</h1>
        </div>

        <div className="products-page-top">
          <button onClick={handleOpen}>Create product</button>
        </div>
      </div>
      <div className="products-page-main">
        {products &&
          products.map((product) => (
            <div
              className="products-individual"
              key={product._id}
              onClick={() => navigate(`/products/${product._id}`)}
            >
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>{product.price}</p>
              <p>{product.category}</p>
            </div>
          ))}
      </div>
      <CreateProductModal open={open} handleClose={handleClose} />
    </div>
  );
};
