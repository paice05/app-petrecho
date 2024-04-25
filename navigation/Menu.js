import React from "react";
import { Block, Text, theme } from "galio-framework";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";

import { DrawerItem as DrawerCustomItem, Icon } from "../components";
import { version } from "../package.json";
import { useUserContext } from "../context/user";
import { useColorContext } from "../context/colors";
import { formartDate } from "../utils/formartDate";
import { nowTheme } from "../constants";

const menus = [
  "Relatorios",
  "Agendamentos",
  "Clientes",
  "Serviços",
  "Templates",
  "Campanhas",
  "Configurações",
];

function CustomDrawerContent({ navigation, state }) {
  const { user } = useUserContext();
  const { colors } = useColorContext();

  const screens = user.isAdmin ? menus : menus.splice(1);
  const isLargeName = user.account.name.length > 20;

  return (
    <Block
      style={[styles.container, { backgroundColor: colors.MENU }]}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      <Block style={styles.header}></Block>
      <Block flex style={{ paddingLeft: 8, paddingRight: 14 }}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <Block row space="between" style={styles.accountText}>
            <Text size={18} bold color={colors.TEXT}>
              {user.account.name.slice(0, 20)}
              {isLargeName ? "..." : ""}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Notifications")}
            >
              <Block row>
                <Icon name="bell" size={28} color="#fff" />
                <Text
                  bold
                  style={{
                    backgroundColor: "red",
                    color: "#fff",
                    paddingHorizontal: 8,
                    paddingVertical: 3,
                    borderRadius: 50,
                    fontSize: 16,

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  9+
                </Text>
              </Block>
            </TouchableOpacity>
          </Block>
          <Text color={colors.TEXT} style={styles.dueText}>
            {user.account.dueDate &&
              `Vencimento: ${formartDate(user.account.dueDate, "dd/MM/YYY")}`}
          </Text>

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
                colors={colors}
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
                backgroundColor: colors.TEXT,
              }}
            />
          </Block>
          <DrawerCustomItem
            title="LOGOUT"
            navigation={navigation}
            colors={colors}
          />
        </ScrollView>
      </Block>

      <Text color={colors.TEXT} center>
        versão {version}
      </Text>
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
  accountText: {
    marginLeft: 20,
    borderBottomColor: "#6c757d",
    borderBottomWidth: 2,
    borderBottomRightRadius: 18,
    fontSize: 18,
    fontWeight: "bold",
  },
  dueText: {
    marginLeft: 20,
    fontSize: 10,
    marginBottom: 10,
  },
});

export default CustomDrawerContent;
