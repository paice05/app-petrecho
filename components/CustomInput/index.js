import React from "react";
import { StyleSheet, View } from "react-native";
import { Block, Input, Text } from "galio-framework";
import { nowTheme } from "../../constants";
import { useColorContext } from "../../context/colors";

const CustomInput = ({
  labelText,
  placeholder,
  options,
  value,
  onChangeText,
  iconContent,
}) => {
  const { colors } = useColorContext();

  return (
    <Block>
      <Text size={16} bold style={{ marginLeft: 20 }} color={colors.TEXT}>
        {labelText}
      </Text>
      <Input
        placeholder={placeholder}
        // labelText={labelText}
        // label={labelText}
        options={options}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={colors.PLACEHOLDER}
        style={[styles.input, { backgroundColor: "transparent" }]}
        color={colors.TEXT}
        iconContent={iconContent}
        shadowless
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
    fontSize: 16,
  },
});

export default CustomInput;
