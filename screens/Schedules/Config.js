import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Block, Text } from 'galio-framework';

import { Button, Icon } from '../../components';
import CustomInput from '../../components/CustomInput';
import { nowTheme } from '../../constants';
import { CustomInputMask } from '../../components/CustomInputMask';

export const Config = ({ fields, setFields }) => {
  const [show, setShow] = useState(false);

  const handleToggleShow = () => setShow(!show);

  return (
    <Block gap={20}>
      <TouchableOpacity onPress={handleToggleShow}>
        <Block row space="between" style={show ? styles.containerOpen : styles.containerClose}>
          <Text color={nowTheme.COLORS.PRIMARY}> configurações gerais </Text>

          <Icon
            name="chevron-down"
            family="feather"
            size={18}
            color={nowTheme.COLORS.PRIMARY}
            style={show ? styles.iconRotate : {}}
          />
        </Block>
      </TouchableOpacity>

      {show && (
        <Block row gap={10}>
          <Block flex={1}>
            <Text bold style={{ marginLeft: 20, marginBottom: 5 }}>
              Desconto
            </Text>
            <CustomInputMask
              value={fields.discount}
              onChangeText={(text) => setFields({ ...fields, discount: text })}
            />
          </Block>
          <Block flex={1}>
            <Text bold style={{ marginLeft: 20, marginBottom: 5 }}>
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
    transform: 'rotate(180deg)',
  },
  inputIcons: {
    marginRight: 10,
  },
});
