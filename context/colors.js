import { useContext, useState } from "react";
import { createContext } from "react";
import { nowTheme } from "../constants";

const ColorContext = createContext({});

export const ColorContextProvider = ({ children }) => {
  const [colors, setColor] = useState({
    PRIMARY: nowTheme.COLORS.PRIMARY,
    PRIMARY_BACK_GROUND_COLOR: nowTheme.COLORS.PRIMARY_BACK_GROUND_COLOR,
    PRIMARY_CARD_COLOR: nowTheme.COLORS.PRIMARY_CARD_COLOR,
    TEXT: nowTheme.COLORS.TEXT,
    SWITCH_ON: nowTheme.COLORS.SWITCH_ON,
  });

  return (
    <ColorContext.Provider value={{ colors, changeColor: setColor }}>
      {children}
    </ColorContext.Provider>
  );
};

export const useColorContext = () => {
  const context = useContext(ColorContext);

  return context;
};
