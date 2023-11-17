import React from "react";
import { Block, Text } from "galio-framework";
import { TouchableOpacity } from "react-native";

import { useColorContext } from "../../context/colors";

export const CustomInputRadio = ({ label, checked, onChange }) => {
  const { colors } = useColorContext();

  return (
    <Block>
      <TouchableOpacity onPress={onChange}>
        <Block row alignItems="center" gap={10}>
          <Block
            style={{
              width: 24,
              height: 24,
              borderWidth: 1,
              borderColor: colors.ICON,
              borderRadius: 12,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {checked && (
              <Block
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 6,
                  backgroundColor: colors.ICON,
                }}
              />
            )}
          </Block>
          <Text size={18} color={colors.TEXT}>
            {label}
          </Text>
        </Block>
      </TouchableOpacity>
    </Block>
  );
};
