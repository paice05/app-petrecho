import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Block, Text } from "galio-framework";

import { nowTheme } from "../../constants";
import Icon from "../Icon";
import { useColorContext } from "../../context/colors";

export const WrapperInput = ({ placeholder, labelText, value, icon }) => {
  const { colors } = useColorContext();

  return (
    <View>
      <Text
        size={16}
        bold
        style={{ marginLeft: 20, marginBottom: 5 }}
        color={colors.TEXT}
      >
        {labelText}
      </Text>
      <Block row style={styles.container}>
        <Icon size={16} name={icon} color={colors.ICON} />
        <Text color={colors.PLACEHOLDER}>{value || placeholder}</Text>
      </Block>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 30,
    borderWidth: 1,
    borderColor: nowTheme.COLORS.BORDER,
    height: 44,
    paddingHorizontal: 10,
    alignItems: "center",
    gap: 10,
  },
});
