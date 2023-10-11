import React from "react";
import { TextInput, StyleSheet } from "react-native";
import { Block, Text } from "galio-framework";
import { useColorContext } from "../../context/colors";
import { nowTheme } from "../../constants";

const CustomTextInput = ({
  labelText,
  rows,
  numbersOfLines,
  maxLength,
  placeholder,
  onChangeText,
  value,
}) => {
  const { colors } = useColorContext();

  return (
    <Block>
      <Text size={16} bold style={{ marginLeft: 20 }} color={colors.TEXT}>
        {labelText}
      </Text>
      <TextInput
        editable
        multiline
        rows={rows}
        numbersOfLines={numbersOfLines}
        maxLength={maxLength}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        style={[
          styles.textInput,
          { color: colors.TEXT, backgroundColor: "transparent" },
        ]}
      />
    </Block>
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: nowTheme.COLORS.BORDER,
    fontSize: 15,
    maxHeight: 300,
    padding: 10,
    verticalAlign: "top",
  },
});

export default CustomTextInput;
