import React, { useEffect, useState } from "react";
import "./Product.css";
import { Header } from "../../components";
import { useParams } from "react-router-dom";
import axios from "axios";

export const Product = () => {
  const [product, setProduct] = useState();
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/products/${id}`
        );
        const data = response.data;
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
    return () => fetchProduct();
  }, []);

  return (
    <div>
      <Header />
      <div>from Product</div>
      {product && (
        <div className="single-product">
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>{product.price}</p>
          <p>{product.category}</p>
        </div>
      )}
    </div>
  );
};
