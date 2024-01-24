import { useContext, useState } from "react";
import { createContext } from "react";

const clientContext = createContext({});

export const ClientContextProvider = ({ children }) => {
  const [openFilter, setOpenFilter] = useState(false);
  const [countFilters, setCountFilters] = useState(0);

  return (
    <clientContext.Provider
      value={{ openFilter, setOpenFilter, countFilters, setCountFilters }}
    >
      {children}
    </clientContext.Provider>
  );
};

export const useClientContext = () => {
  const context = useContext(clientContext);

  return context;
};
