import { createContext, useState, useContext, useEffect } from "react";
import { useUserContext } from "./UserContext";
import axios from "axios";

export const ProductContext = createContext();

export const ProductsContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [currentUser, userContextLoading] = useUserContext();
  const [productContextLoading, setProductContextLoading] = useState(true);

  useEffect(() => {
    if (!userContextLoading) {
      const fetchProducts = async () => {
        try {
          const response = await axios.get("http://localhost:8080/products", {
            headers: {
              Authorization: `Bearer ${currentUser.token}`,
            },
          });
          const data = await response.data;
          setProducts(data);
          setProductContextLoading(false);
        } catch (error) {
          console.error(error);
        }
      };
      if (currentUser) {
        fetchProducts();
      }

      return () => fetchProducts();
    } else {
      setProducts([]);
    }
  }, [currentUser, userContextLoading]);

  return (
    <ProductContext.Provider value={{ products, productContextLoading }}>
      {" "}
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  return context;
};

// const CREATE_PRODUCT= async (updatedProduct) => {
//  const updatedPrducts = prducts.map((product) => {
//         if (product._id === updatedProduct._id) {
//             return updatedProduct;
//         } else {
//             return product;
//         }
//     });

//     setProducts(updatedPrducts);
// }

//     });
// }
