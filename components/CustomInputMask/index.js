import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import { Block } from "galio-framework";

import { nowTheme } from "../../constants";
import IconExtra from "../Icon";
import { useColorContext } from "../../context/colors";

export const CustomInputMask = ({ onChangeText, value, placeholder }) => {
  const { colors } = useColorContext();

  const handlePriceChange = (formatted, extracted) => {
    onChangeText(formatted);
  };

  return (
    <Block row style={styles.container}>
      <IconExtra
        size={16}
        color={colors.ICON}
        name="dollar-sign"
        family="feather"
        style={styles.inputIcons}
      />
      <TextInputMask
        type={"money"}
        options={{
          precision: 2,
          separator: ",",
          delimiter: ".",
          unit: "R$",
        }}
        value={value}
        onChangeText={handlePriceChange}
        placeholder={placeholder}
        placeholderTextColor={colors.PLACEHOLDER}
        style={[
          styles.input,
          { backgroundColor: "transparent", color: colors.TEXT },
        ]}
      />
    </Block>
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
  },
  input: {
    flex: 1,
    fontSize: 14,
  },
  inputIcons: {
    marginRight: 10,
  },
});
