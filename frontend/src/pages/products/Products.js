import React, { useEffect, useState } from "react";
import "./Products.css";
import { Header } from "../../component";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Modal } from "../../component";
import { CreateProductModal } from "./CreateProductModal";

export const Products = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const getProducts = async () => {
      const response = await axios.get("http://localhost:8080/products");

      const data = response.data;
      setProducts(data);
    };
    getProducts();
  }, []);

  if (!products) {
    return <div>products not found </div>;
  }

  return (
    <div>
      <Header />
      <div>
        <div className="products-page-top">
          <h1>This is products page</h1>
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
