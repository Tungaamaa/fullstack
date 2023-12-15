import React, { useEffect, useState } from "react";
import "./Product.css";
import { Header } from "../../component";
import { useParams } from "react-router-dom";
import axios from "axios";
import { EditProductModal } from "./EditProductModal";
import { DeleteProductModal } from "./DeleteProductModal";

export const Product = () => {
  const [product, setProduct] = useState();
  const { id } = useParams();


  const [openEdit, setOpenEdit] = React.useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  const [openDelete, setOpenDelete] = React.useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);


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

  if (!product) {
    return (
      <div> item not found</div>
    )
  }

  return (
    <div>
      <Header />
      <div className="product-page-top">
        <h1>this is Product page</h1>
      </div>
      <div className="product-page-main">
        {product && (
          <div className="single-product">
            <h3>Name :{product.name}</h3>
            <p>Description : {product.description}</p>
            <p>Price : {product.price}</p>
            <p>Category : {product.category}</p>
            <button onClick={handleOpenEdit}>edit</button>
            <button onClick={handleOpenDelete}>delete</button>
          </div>
        )}
      </div>
      <EditProductModal product={product} open={openEdit} handleClose={handleCloseEdit}/>
      <DeleteProductModal open={openDelete} handleClose={handleCloseDelete}/>
    </div>
  );
};
