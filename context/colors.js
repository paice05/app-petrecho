import { useContext, useState } from "react";
import { createContext } from "react";
import { nowTheme } from "../constants";

const ColorContext = createContext({});

const defaultColors = {
  DANGER: "#ed4245",
  WARNING: "#fee75c",
  SUCCESS: "#57f287",
  INFO: "#5865f2",
  WHITE: "#FFF",
  BLACK: "#000",
};

export const ColorContextProvider = ({ children }) => {
  const [colors, setColor] = useState({
    BACKGROUND: nowTheme.COLORS.PRIMARY_BACK_GROUND_COLOR,
    BACKGROUND_CARD: nowTheme.COLORS.PRIMARY_CARD_COLOR,
    BUTTON: nowTheme.COLORS.PRIMARY,
    TEXT: nowTheme.COLORS.TEXT,
    SUB_TEXT: "#00171F",
    ICON: nowTheme.COLORS.PRIMARY,
    PLACEHOLDER: "#00171F",
    MENU: "#fff",
    ACTIVE_MENU: nowTheme.COLORS.PRIMARY,
    BUTTON_BACK: nowTheme.COLORS.BUTTON_BACK,
    BUTTON_REGISTER_OR_UPDATE: nowTheme.COLORS.BUTTON_REGISTER_OR_UPDATE,
    TEXT_BUTTON_BACK: nowTheme.COLORS.TEXT_BUTTON_BACK,
    TEXT_BUTTON_REGISTER_UPDATE: nowTheme.COLORS.TEXT_BUTTON_REGISTER_UPDATE,
  });

  const handleChangeColors = (newColors) => {
    setColor({
      ...newColors,
      ...defaultColors,
    });
  };

  return (
    <ColorContext.Provider value={{ colors, changeColor: handleChangeColors }}>
      {children}
    </ColorContext.Provider>
  );
};

export const useColorContext = () => {
  const context = useContext(ColorContext);

  return context;
};
