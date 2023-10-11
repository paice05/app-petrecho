import React from "react";
import { StyleSheet, TouchableOpacity, Vibration } from "react-native";
import { Block, Text } from "galio-framework";

import { useColorContext } from "../../context/colors";

import IconExtra from "../Icon";
import Menu from "../Menu";

const CardTemplates = ({ navigation, id, title, content, onDeleted }) => {
  const isLargeTitle = title.length > 20;
  const isLargeContent = content.length > 40;
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
              navigation.navigate("TemplatesForm", { itemId: id });
            }}
          >
            <Text size={18} bold color={colors.TEXT}>
              {title?.slice(0, 20)}
              {isLargeTitle ? "..." : ""}
            </Text>
          </TouchableOpacity>

          <Text size={15} color={colors.SUB_TEXT}>
            {content?.slice(0, 40)}
            {isLargeContent ? "..." : ""}
          </Text>
        </Block>
        <Menu
          items={[
            {
              onSelect: () =>
                navigation.navigate("TemplatesForm", {
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
