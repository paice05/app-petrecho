import React from "react";
import { StyleSheet, TouchableOpacity, Vibration } from "react-native";
import { Block, Text } from "galio-framework";

import Menu from "../Menu";
import IconExtra from "../Icon";
import { useColorContext } from "../../context/colors";

const CardService = ({ navigation, id, nome, valor, onDeleted }) => {
  const isLargeName = nome.length > 20;

  const { colors } = useColorContext();

  return (
    <Block
      flex
      space="between"
      style={[styles.container, { backgroundColor: colors.PRIMARY_CARD_COLOR }]}
    >
      <Block row space="between">
        <Block gap={5} style={styles.wrapperName}>
          <TouchableOpacity
            onPress={() => {
              const vibrationDuration = 100;

              // Faz o dispositivo vibrar
              Vibration.vibrate(vibrationDuration);

              navigation.navigate("ServiceForm", {
                itemId: id,
              });
            }}
          >
            <Text
              size={18}
              style={[
                { color: colors.TEXT },
                { textDecorationLine: "underline" },
              ]}
            >
              {nome?.slice(0, 20)}
              {isLargeName ? "..." : ""}
            </Text>
          </TouchableOpacity>
          <Text size={16} color={colors.TEXT}>
            R$ {Number(valor).toFixed(2).replace(".", ",")}
          </Text>
        </Block>
        <Menu
          items={[
            {
              onSelect: () =>
                navigation.navigate("ServiceForm", {
                  itemId: id,
                }),
              text: "Editar",
              icon: "edit",
              color: colors.SWITCH_ON,
            },
            {
              onSelect: onDeleted,
              text: "Deletar",
              icon: "trash-2",
              color: colors.PRIMARY,
            },
          ]}
        >
          <Block center style={[styles.more, { borderColor: colors.PRIMARY }]}>
            <IconExtra
              size={20}
              color={colors.PRIMARY}
              name="more-vertical"
              family="feather"
            />
          </Block>
        </Menu>
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
  },
  wrapperName: {
    paddingBottom: 20,
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

export default CardService;
