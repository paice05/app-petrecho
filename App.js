import React from "react";
import { Block, GalioProvider } from "galio-framework";
import { NavigationContainer } from "@react-navigation/native";
import { MenuProvider } from "react-native-popup-menu";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";

import Screens from "./navigation/Screens";
import { nowTheme } from "./constants";
import { UserContextProvider } from "./context/user";
import { ColorContextProvider } from "./context/colors";

export default function App() {
  return (
    <NavigationContainer>
      <GalioProvider theme={nowTheme}>
        <ColorContextProvider>
          <UserContextProvider>
            <MenuProvider customStyles={menuProviderStyles}>
              <StatusBar style="dark" backgroundColor="#eee" />
              <Screens />
            </MenuProvider>
          </UserContextProvider>
        </ColorContextProvider>
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
