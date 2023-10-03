import React from "react";
import { StyleSheet } from "react-native";

import { Text, Block } from "galio-framework";

import { theme } from "galio-framework";
import { nowTheme } from "../../constants";
import { useColorContext } from "../../context/colors";

const CardReportExit = ({ navigation, id, data, nome, value }) => {
  const { colors } = useColorContext();

  return (
    <Block
      flex
      space="between"
      style={[styles.container, { backgroundColor: colors.BACKGROUND_CARD }]}
    >
      <Text
        size={18}
        center
        color={colors.SUB_TEXT}
        style={{ marginBottom: 16 }}
      >
        {data}
      </Text>
      <Block row space="between">
        <Text size={18} color={colors.TEXT}>
          {nome}
        </Text>
        <Text size={18} color={colors.DANGER}>
          {value}
        </Text>
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.SIZES.BASE / 2,
    marginBottom: 16,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  wraper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 5,
  },
  entryValue: {
    fontSize: 18,
    color: "#B22222",
  },
  styleText: {
    fontSize: 14,
    fontWeight: "500",
  },
  dateStyle: {
    textAlign: "center",
    fontSize: 16,
  },
});

export default CardReportExit;
