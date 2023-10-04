import { useContext, useState } from "react";
import { createContext } from "react";

const userContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "",
    id: "",
    isAdmin: false,
    account: null,
  });

  return (
    <userContext.Provider value={{ user, changeUser: setUser }}>
      {children}
    </userContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(userContext);

  return context;
};
