import { Block, Text } from "galio-framework";
import { StyleSheet, TouchableOpacity } from "react-native";

import { Icon } from "..";
import { useColorContext } from "../../context/colors";
import { nowTheme } from "../../constants";

export function CustomInputTouch({ icon, label, value, placeholder, onPress }) {
  const { colors } = useColorContext();

  return (
    <TouchableOpacity onPress={onPress}>
      <Text
        size={16}
        bold
        style={{ marginLeft: 20, marginBottom: 8 }}
        color={colors.TEXT}
      >
        {label}
      </Text>
      <Block row alignItems="center" style={styles.input}>
        {icon && (
          <Icon
            size={16}
            name={icon}
            style={{ color: colors.ICON, marginRight: 12 }}
          />
        )}

        {placeholder && !value && (
          <Text color={colors.PLACEHOLDER}>{placeholder}</Text>
        )}
        <Text style={{ width: "90%" }}>
          {value && <Text color={colors.TEXT}>{value}</Text>}
        </Text>
      </Block>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 30,
    borderWidth: 1,
    borderColor: nowTheme.COLORS.BORDER,
    height: "auto",
    minHeight: 44,
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
});
