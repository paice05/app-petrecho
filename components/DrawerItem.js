import { Block, Text, theme } from "galio-framework";
import { Linking, StyleSheet, TouchableOpacity, Vibration } from "react-native";

import Icon from "./Icon";
import React from "react";
import nowTheme from "../constants/Theme";
import { clearCache } from "../services/cache";

class DrawerItem extends React.Component {
  renderIcon = () => {
    const { title, focused, colors } = this.props;

    switch (title) {
      case "Clientes":
        return (
          <Icon
            name="user"
            size={22}
            color={focused ? colors.BACKGROUND : colors?.ICON}
            style={{ opacity: 0.5 }}
          />
        );
      case "Agendamentos":
        return (
          <Icon
            name="calendar"
            size={22}
            color={focused ? colors.BACKGROUND : colors?.ICON}
            style={{ opacity: 0.5 }}
          />
        );
      case "Relatorios":
        return (
          <Icon
            name="bar-chart-2"
            size={22}
            color={focused ? colors.BACKGROUND : colors?.ICON}
            style={{ opacity: 0.5 }}
          />
        );
      case "Serviços":
        return (
          <Icon
            name="tool"
            size={22}
            color={focused ? colors.BACKGROUND : colors?.ICON}
            style={{ opacity: 0.5 }}
          />
        );

      case "LOGOUT":
        return (
          <Icon
            name="log-out"
            size={22}
            color={focused ? colors.BACKGROUND : colors?.ICON}
          />
        );

      case "Configurações":
        return (
          <Icon
            name="settings"
            size={22}
            style={{ borderColor: "rgba(0,0,0,0.5)", opacity: 0.5 }}
            color={focused ? colors.BACKGROUND : colors?.ICON}
          />
        );
      default:
        return null;
    }
  };

  render() {
    const { focused, title, navigation, colors } = this.props;
    console.log({ colors });

    const containerStyles = [
      styles.defaultStyle,
      focused ? [styles.activeStyle, styles.shadow] : null,
    ];

    return (
      <TouchableOpacity
        style={{ height: 60 }}
        onPress={() => {
          const vibrationDuration = 100;

          // Faz o dispositivo vibrar
          Vibration.vibrate(vibrationDuration);

          if (title === "LOGOUT") {
            // limpar o token do cache
            clearCache("token").then(() => {
              navigation.navigate("Onboarding");
            });

            return;
          }

          navigation.navigate(title);
        }}
      >
        <Block flex row style={containerStyles}>
          <Block middle flex={0.1} style={{ marginRight: 5 }}>
            {this.renderIcon()}
          </Block>
          <Block row center flex={0.9}>
            <Text
              style={{
                textTransform: "uppercase",
                fontWeight: "300",
              }}
              size={16}
              bold={focused ? true : false}
              color={focused ? colors?.BACKGROUND : colors?.TEXT}
            >
              {title}
            </Text>
          </Block>
        </Block>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  defaultStyle: {
    paddingVertical: 15,
    paddingHorizontal: 14,
    color: "white",
  },
  activeStyle: {
    backgroundColor: nowTheme.COLORS.WHITE,
    borderRadius: 30,
    color: "white",
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
  },
});

export default DrawerItem;
