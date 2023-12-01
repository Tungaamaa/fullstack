import React, { useEffect, useState } from "react";
import "./Products.css";
import { Header } from "../../components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      const response = await axios.get("http://localhost:8080/products");

      const data = response.data;
      setProducts(data);
    };
    getProducts();
  }, []);

  return (
    <div>
      <Header />
      <div className="products-page-top">This is product page</div>
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
    </div>
  );
};
