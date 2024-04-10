import React from "react";
import { StyleSheet, TouchableOpacity, Vibration } from "react-native";
import { Block, Text } from "galio-framework";

import Menu from "../Menu";
import IconExtra from "../Icon";
import { useColorContext } from "../../context/colors";
import Avatar from "../Avatar";
//import { Avatar } from "../Avatar";

const CardService = ({
  navigation,
  id,
  nome,
  image,
  valor,
  onDeleted,
  tempoMedio,
}) => {
  const isLargeName = nome.length > 20;

  const { colors } = useColorContext();

  return (
    <Block
      style={[styles.container, { backgroundColor: colors.BACKGROUND_CARD }]}
    >
      <Block row space="between" alignItems="flex-start">
        <Block style={styles.avatarContainer}>
          <Avatar url={image || ""} />
        </Block>
        <Block gap={5} style={styles.detailsContainer}>
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
            <Text size={17} style={[styles.name, { color: colors.TEXT }]}>
              {nome?.slice(0, 20)}
              {isLargeName ? "..." : ""}
            </Text>
          </TouchableOpacity>

          <Text size={15} bold color={colors.SUB_TEXT}>
            R$ {Number(valor).toFixed(2).replace(".", ",")}
          </Text>

          <Block>
            {tempoMedio && (
              <Block row gap={5} style={{ alignItems: "center" }}>
                <IconExtra color={colors.ICON} name="clock" family="feather" />
                <Text bold size={15} color={colors.TEXT}>
                  {tempoMedio}
                </Text>
              </Block>
            )}
          </Block>
        </Block>
        <Block>
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
  avatarContainer: {
    marginRight: 10,
  },
  detailsContainer: {
    flex: 1,
  },
  name: {
    textDecorationLine: "underline",
  },
});

export default CardService;
