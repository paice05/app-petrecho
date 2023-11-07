import React from "react";
import { View, StyleSheet } from "react-native";
import { Block, Text, Button, Input } from "galio-framework";

import { nowTheme } from "../../constants";
import Icon from "../Icon";
import { useColorContext } from "../../context/colors";

export const CustomInputAverageTime = ({
  iconContent,
  options,
  value,
  onChangeText,
}) => {
  const { colors } = useColorContext();

  return (
    <Block style={styles.container}>
      <Input
        color={colors.TEXT}
        style={[styles.input, { backgroundColor: "transparent" }]}
        iconContent={iconContent}
        options={options}
        value={value}
        onChangeText={onChangeText}
        editable={false}
      />
    </Block>
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 30,
    borderWidth: 1,
    borderColor: nowTheme.COLORS.BORDER,
    height: 44,
    width: "85%",
    fontSize: 16,
    alignItems: "center",
    top: -5,
  },
  container: {
    marginLeft: 25,
  },
});
