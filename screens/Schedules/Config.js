import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Vibration } from "react-native";
import { Block, Text } from "galio-framework";

import { Icon } from "../../components";
import { nowTheme } from "../../constants";
import { CustomInputMask } from "../../components/CustomInputMask";
import { useColorContext } from "../../context/colors";

export const Config = ({ fields, setFields }) => {
  const [show, setShow] = useState(false);

  const { colors } = useColorContext();

  const handleToggleShow = () => {
    const vibrationDuration = 100;

    // Faz o dispositivo vibrar
    Vibration.vibrate(vibrationDuration);

    setShow(!show);
  };
  return (
    <Block gap={20}>
      <TouchableOpacity onPress={handleToggleShow}>
        <Block
          row
          space="between"
          style={[
            { paddingHorizontal: 10 },
            show ? styles.containerOpen : styles.containerClose,
          ]}
        >
          <Text size={16} color={colors.BUTTON}>
            Configurações gerais
          </Text>

          <Icon
            name="chevron-down"
            family="feather"
            size={18}
            color={colors.BUTTON}
            style={show ? styles.iconRotate : {}}
          />
        </Block>
      </TouchableOpacity>

      {show && (
        <Block row gap={10}>
          <Block flex={1}>
            <Text
              size={16}
              bold
              style={{ marginLeft: 20, marginBottom: 5 }}
              color={colors.TEXT}
            >
              Desconto
            </Text>
            <CustomInputMask
              value={fields.discount}
              onChangeText={(text) => setFields({ ...fields, discount: text })}
            />
          </Block>
          <Block flex={1}>
            <Text
              size={16}
              bold
              style={{ marginLeft: 20, marginBottom: 5 }}
              color={colors.TEXT}
            >
              Adicional
            </Text>
            <CustomInputMask
              value={fields.addition}
              onChangeText={(text) => setFields({ ...fields, addition: text })}
            />
          </Block>
        </Block>
      )}
    </Block>
  );
};

const styles = StyleSheet.create({
  iconRotate: {
    transform: "rotate(180deg)",
  },
  inputIcons: {
    marginRight: 10,
  },
});
