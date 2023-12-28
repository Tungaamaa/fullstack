import { createContext, useContext, useEffect, useState } from "react";
import { useUserContext } from "./UserContext";
import axios from "axios";

export const ServiceContext = createContext();

export const ServiceContextProvider = ({ children }) => {
  const [services, setServices] = useState([services]);
  const { currentUser, userContextLoading } = useUserContext();
  const [serviceContextLoading, setServiceContextLoading] = useState(true);

  useEffect(() => {
    if (!userContextLoading) {
      const fetchServices = async () => {
        try {
          const response = await axios.get("https://fullstack-backend-d3vu.onrender.com/services", {
            headers: {
              Authorization: `Bearer ${currentUser.token}`,
            },
          });
          const data = await response.data;
          setServices(data);
          setServiceContextLoading(false);
        } catch (error) {
          console.error(error);
        }
      };
      if (currentUser) {
        fetchServices();
      }
      return () => fetchServices();
    } else {
      setServices([]);
    }
  }, [currentUser, userContextLoading]);

  return (
    <ServiceContext.Provider value={{ services, serviceContextLoading }}>
      {children}
    </ServiceContext.Provider>
  );
};

export const useServiceContext = () => {
  const context = useContext(ServiceContext);
  return context;
};
