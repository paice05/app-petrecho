import React from "react";
import { StyleSheet } from "react-native";
import { Block } from "galio-framework";
import { TextInputMask } from "react-native-masked-text";

import IconExtra from "../Icon";
import { useColorContext } from "../../context/colors";
import { nowTheme } from "../../constants";

export const CustomInputMaskHours = ({ onChangeText, value, placeholder }) => {
  const { colors } = useColorContext();

  const handleHoursChange = (formatted, extracted) => {
    onChangeText(formatted);
  };

  return (
    <Block row style={styles.container}>
      <IconExtra
        size={16}
        color={colors.ICON}
        name="clock"
        family="feather"
        style={styles.inputIcons}
      />
      <TextInputMask
        type={"datetime"}
        options={{
          format: "HH:mm",
        }}
        value={value}
        onChangeText={handleHoursChange}
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
