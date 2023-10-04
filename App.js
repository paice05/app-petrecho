import React from "react";
import { Block, GalioProvider } from "galio-framework";
import { NavigationContainer } from "@react-navigation/native";
import { MenuProvider } from "react-native-popup-menu";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";

import Screens from "./navigation/Screens";
import { nowTheme } from "./constants";
import { UserContextProvider } from "./context/user";
import { ColorContextProvider, useColorContext } from "./context/colors";

export default function App() {
  const { colors } = useColorContext();

  return (
    <NavigationContainer>
      <GalioProvider theme={nowTheme}>
        <UserContextProvider>
          <ColorContextProvider>
            <MenuProvider customStyles={menuProviderStyles}>
              <StatusBar
                style={
                  colors?.BACKGROUND ===
                  nowTheme.COLORS.PRIMARY_BACK_GROUND_COLOR
                    ? "dark"
                    : "light"
                }
                backgroundColor={colors?.BACKGROUND}
              />
              <Screens />
            </MenuProvider>
          </ColorContextProvider>
        </UserContextProvider>
      </GalioProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: "rgba(0,0,0,0.8)",
    opacity: 0.8,
  },
});

const menuProviderStyles = {
  backdrop: styles.backdrop,
};
