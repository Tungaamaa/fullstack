import { createContext, useContext, useEffect, useState } from "react";



export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  
  const [currentUser, setCurrentUser] = useState(null);
  const [userContextLoading, setUserContextLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setUserContextLoading(false);
  }, []);

  const signUp = (userInfo) => {
    setCurrentUser(userInfo);
  };

  const signIn = (userInfo) => {
    setCurrentUser(userInfo);
    
  };

  const signOut = (userInfo) => {
    localStorage.removeItem("user");
    setCurrentUser(null);
  };
  return (
    <UserContext.Provider
      value={{ currentUser, signUp, signIn, signOut, userContextLoading }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  return context;
};
