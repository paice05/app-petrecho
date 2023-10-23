import React from "react";
import { StyleSheet, TouchableOpacity, Vibration } from "react-native";
import { Block, Text } from "galio-framework";

import Menu from "../Menu";
import IconExtra from "../Icon";
import { useColorContext } from "../../context/colors";

const CardService = ({
  navigation,
  id,
  nome,
  valor,
  onDeleted,
  tempoMedio,
}) => {
  const isLargeName = nome.length > 20;

  const { colors } = useColorContext();

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
          <Text size={16} color={colors.SUB_TEXT}>
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
              color: colors.TEXT,
            },
            {
              onSelect: onDeleted,
              text: "Deletar",
              icon: "trash-2",
              color: colors.TEXT,
            },
          ]}
        >
          <Block center style={[styles.more, { borderColor: colors.TEXT }]}>
            <IconExtra
              size={20}
              color={colors.TEXT}
              name="more-vertical"
              family="feather"
            />
          </Block>
        </Menu>
      </Block>
      <Block center row>
        {tempoMedio && <Block row gap={5} style={{ alignItems: "center" }}>
          <IconExtra color={colors.ICON} name="clock" family="feather" />
          <Text bold size={16} color={colors.TEXT}>
            {tempoMedio}
          </Text>
        </Block>}
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
