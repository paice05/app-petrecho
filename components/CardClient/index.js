import React from "react";
import { StyleSheet, TouchableOpacity, Vibration } from "react-native";
import { Block, Text } from "galio-framework";

import { nowTheme } from "../../constants";

import Icon from "../Icon";
import Menu from "../Menu";
import { useUserContext } from "../../context/user";
import { useColorContext } from "../../context/colors";

const CardClient = ({
  navigation,
  id,
  nome,
  tipo,
  telefone,
  aniversario,
  isAdmin,
  onDeleted,
}) => {
  const isLargeName = nome.length > 20;

  const { user } = useUserContext();
  const { colors } = useColorContext();

  const userIsAdmin = user.isAdmin;

  return (
    <Block
      flex
      space="between"
      style={[styles.container, { backgroundColor: colors.BACKGROUND_CARD }]}
    >
      <Block row space="between">
        <Block gap={5} style={styles.wrapperName}>
          <TouchableOpacity
            onPress={() => {
              const vibrationDuration = 100;

              // Faz o dispositivo vibrar
              Vibration.vibrate(vibrationDuration);

              if (!userIsAdmin && isAdmin) return;

              navigation.navigate("ClientForm", {
                itemId: id,
              });
            }}
          >
            <Text
              size={18}
              style={{ textDecorationLine: "underline" }}
              color={colors.TEXT}
            >
              {nome?.slice(0, 20)}
              {isLargeName ? "..." : ""}
              {isAdmin ? (
                <Text color="gray" size={12} color={colors.SUB_TEXT}>
                  {" "}
                  (admin)
                </Text>
              ) : null}
            </Text>
          </TouchableOpacity>
          <Text size={16} color={colors.SUB_TEXT}>
            {tipo}
          </Text>
        </Block>
        <Menu
          items={[
            {
              onSelect: () =>
                navigation.navigate("ClientForm", {
                  itemId: id,
                }),
              text: "Editar",
              icon: "edit",
              color: colors.TEXT,
              disable: !userIsAdmin && isAdmin,
            },
            {
              onSelect: onDeleted,
              text: "Deletar",
              icon: "trash-2",
              color: colors.TEXT,
              disable: !userIsAdmin,
            },
          ]}
        >
          <Block center style={[styles.more, { borderColor: colors.TEXT }]}>
            <Icon
              size={20}
              color={colors.TEXT}
              name="more-vertical"
              family="feather"
            />
          </Block>
        </Menu>
      </Block>

      <Block row style={styles.wrapperInfo}>
        <Block row gap={5} style={{ alignItems: "center" }}>
          <Icon size={18} color={colors.ICON} name="phone" family="feather" />
          <Text size={16} bold color={colors.TEXT}>
            {telefone}
          </Text>
        </Block>

        <Block row gap={5} style={{ alignItems: "center" }}>
          <Icon
            size={18}
            color={colors.ICON}
            name="calendar"
            family="feather"
          />
          <Text size={16} bold color={colors.TEXT}>
            {aniversario}
          </Text>
        </Block>
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 5,
    marginBottom: 16,
  },
  wrapperName: {
    paddingBottom: 20,
  },
  wrapperInfo: {
    justifyContent: "center",
    gap: 25,
  },
  more: {
    width: 35,
    height: 35,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CardClient;
