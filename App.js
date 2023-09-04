import React from "react";
import { Block, GalioProvider } from "galio-framework";
import { NavigationContainer } from "@react-navigation/native";
import { MenuProvider } from "react-native-popup-menu";

import { nowTheme } from "./constants";
import { UserContextProvider } from "./context/user";
import Screens from "./navigation/Screens";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <NavigationContainer>
      <GalioProvider theme={nowTheme}>
        <UserContextProvider>
          <MenuProvider>
            <StatusBar style="dark" backgroundColor="#eee" />
            <Screens />
          </MenuProvider>
        </UserContextProvider>
      </GalioProvider>
    </NavigationContainer>
  );
}
