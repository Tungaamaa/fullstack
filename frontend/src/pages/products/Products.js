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

      <div className="products-page-content">
        <div className="products-page-top">
          <h1>Delicious Smoothie Recipes</h1>
        </div>
        <div className="search-bar">
          <input type="search" placeholder="Search" className="search-input" />
        </div>
        <div className="products-page-products-container">
          <div className="create-new-product-container">
            <button onClick={handleOpen}>Create new product</button>
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
                <div className="recipes">
                  <div className="recipes-content">
                    <h4 className="type">{product.type}</h4>

                    <h3>Recipe name: {product.name}</h3>
                    <p>Ingredients:{product.description}</p>
                    <p>Instructions:{product.price}</p>
                    <p>Description:{product.category}</p>
                  </div>
                  <div className="recipes-image">
                    <img src={product.image} />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <CreateProductModal open={open} handleClose={handleClose} />
    </div>
  );
};
