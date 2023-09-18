import React from "react";
import { Block, Text, theme } from "galio-framework";
import { ScrollView, StyleSheet } from "react-native";

import { DrawerItem as DrawerCustomItem } from "../components";
import { version } from "../package.json";
import { useUserContext } from "../context/user";

function CustomDrawerContent({ navigation, state }) {
  const { user } = useUserContext();

  const screens = user.isAdmin
    ? ["Relatorios", "Agendamentos", "Clientes", "Serviços", "Configurações"]
    : ["Agendamentos", "Clientes", "Serviços", "Configurações"];

  return (
    <Block
      style={styles.container}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      <Block style={styles.header}></Block>
      <Block flex style={{ paddingLeft: 8, paddingRight: 14 }}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {screens.map((item, index) => {
            return (
              <DrawerCustomItem
                title={item}
                key={index}
                navigation={navigation}
                focused={
                  state.index === (user.isAdmin ? index : index + 1)
                    ? true
                    : false
                }
              />
            );
          })}
          <Block
            flex
            style={{ marginTop: 24, marginVertical: 8, paddingHorizontal: 8 }}
          >
            <Block
              style={{
                borderColor: "black",
                width: "93%",
                borderWidth: StyleSheet.hairlineWidth,
                marginHorizontal: 10,
              }}
            />
          </Block>
          <DrawerCustomItem title="LOGOUT" navigation={navigation} />
        </ScrollView>
      </Block>

      <Text center>versão {version}</Text>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 28,
    paddingBottom: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE * 3,
    justifyContent: "center",
  },
  headerIcon: {
    marginTop: -20,
  },
  logo: {
    height: 40,
    width: 37,
    tintColor: "black",
  },
});

export default CustomDrawerContent;
