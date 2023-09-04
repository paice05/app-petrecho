import React, { useState } from "react";
import { Dimensions, Platform, StyleSheet, SafeAreaView } from "react-native";
import { Text } from "galio-framework";

import { SelectList } from "react-native-select-bottom-list";
import { nowTheme } from "../../constants";
import Icon from "../Icon";

const { width } = Dimensions.get("window");

export const CustomSelectBottom = ({
  labelText,
  placeholder,
  onChange,
  value,
  options,
  itemTextStyle,
}) => {
  return (
    <SafeAreaView>
      <Text bold>{labelText}</Text>

      <SelectList
        style={Platform.OS === "ios" ? styles.inputIOS : styles.input}
        placeHolder={placeholder}
        onSelect={(item) => onChange(item)}
        value={value?.title}
        data={options}
        headerTitle={labelText}
        listHeight={300}
        textStyle={styles.textStyleChange}
        itemStyle={{ fontSize: 24 }}
        itemTextStyle={itemTextStyle}
        renderIcon={() => (
          <Icon family="feather" name="user" color={nowTheme.COLORS.PRIMARY} />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 30,
    borderWidth: 1,
    borderColor: nowTheme.COLORS.BORDER,
    height: 44,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "row-reverse",
    color: "black",
    fontSize: 16,
  },
  inputIOS: {
    borderRadius: 35,
    borderWidth: 1,
    borderColor: nowTheme.COLORS.BORDER,
    height: 44,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 18,
    display: "flex",
    flexDirection: "row-reverse",
    color: "black",
    fontSize: 16,
  },
  shadow: {
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 0.5 },
    shadowRadius: 1,
    shadowOpacity: 0.13,
    elevation: 2,
  },
  textStyleChange: {
    fontSize: 14,
    marginLeft: 10,
  },
});
