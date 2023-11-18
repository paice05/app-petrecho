import React from "react";
import { StyleSheet, TouchableOpacity, Vibration } from "react-native";
import { Block, Text } from "galio-framework";

import { useColorContext } from "../../context/colors";

import IconExtra from "../Icon";
import Menu from "../Menu";

const CardTemplates = ({ navigation, id, title, content, onDeleted }) => {
  const isLargeTitle = title.length > 30;
  const isLargeContent = content.length > 50;
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

              Vibration.vibrate(vibrationDuration);
              navigation.navigate("TemplatesView", { itemId: id });
            }}
          >
            <Text
              size={18}
              bold
              color={colors.TEXT}
              style={{ textDecorationLine: "underline" }}
            >
              {title?.slice(0, 30)}
              {isLargeTitle ? "..." : ""}
            </Text>
          </TouchableOpacity>

          <Text size={15} color={colors.SUB_TEXT}>
            {content?.slice(0, 50)}
            {isLargeContent ? "..." : ""}
          </Text>
        </Block>
        <Menu
          items={[
            {
              onSelect: () =>
                navigation.navigate("TemplatesView", {
                  itemId: id,
                }),
              text: "Visualizar mensagem",
              icon: "eye",
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
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 5,
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

export default CardTemplates;
