import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { Block, Text } from "galio-framework";

import IconExtra from "../Icon";
import { formartDate } from "../../utils/formartDate";
import { nowTheme } from "../../constants";
import { useColorContext } from "../../context/colors";

export const DateTimePicker = ({
  onChange,
  value,
  placeholder,
  noInput,
  formart = "dd-MM-YYY",
  mode,
  icon,
  clear = false,
  onClickClear,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const { colors } = useColorContext();

  const onTimeSelected = (event, value) => {
    setShowDatePicker(false);

    onChange(new Date(value));
  };

  return (
    <Block>
      <TouchableOpacity
        style={
          noInput
            ? { alignItems: "center", paddingVertical: 20 }
            : styles.buttonDate
        }
        onPress={() => setShowDatePicker(true)}
      >
        <Block
          row
          gap={10}
          style={{
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Block row middle padding={4}>
            <IconExtra
              size={16}
              color={colors.ICON}
              name={icon}
              family="feather"
            />
            {placeholder && !value && (
              <Text marginLeft={14} color={colors.ICON}>
                {placeholder}
              </Text>
            )}
            {value && (
              <Text
                marginLeft={14}
                size={noInput ? 18 : 15}
                color={colors.TEXT}
              >
                {formartDate(value, mode === "time" ? "HH:mm" : formart)}
              </Text>
            )}
          </Block>
          {value && clear && (
            <Block justifyContent="flex-end">
              <TouchableOpacity onPress={onClickClear}>
                <Text size={16} color={colors.TEXT}>
                  limpar
                </Text>
              </TouchableOpacity>
            </Block>
          )}
        </Block>
      </TouchableOpacity>
      {showDatePicker && (
        <RNDateTimePicker
          value={value ?? new Date()}
          mode={mode}
          display={"default"}
          is24Hour={true}
          onChange={onTimeSelected}
        />
      )}
    </Block>
  );
};

const styles = StyleSheet.create({
  buttonDate: {
    borderRadius: 30,
    borderWidth: 1,
    borderColor: nowTheme.COLORS.BORDER,
    height: 50,
    backgroundColor: "transparent",
    padding: 9,
  },
});
