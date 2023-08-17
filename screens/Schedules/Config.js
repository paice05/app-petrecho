import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Block, Text } from 'galio-framework';

import { Button, Icon } from '../../components';
import CustomInput from '../../components/CustomInput';
import { nowTheme } from '../../constants';

export const Config = ({ fields, setFields }) => {
  const [show, setShow] = useState(false);

  const handleToggleShow = () => setShow(!show);

  return (
    <Block>
      <TouchableOpacity onPress={handleToggleShow}>
        <Block row space="between" style={show ? styles.containerOpen : styles.containerClose}>
          <Text color={nowTheme.COLORS.PRIMARY}> Configurações gerais </Text>

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
            <CustomInput
              onChangeText={(text) => setFields({ ...fields, discount: text })}
              labelText="Desconto"
              placeholder="10,00"
              value={fields.discount?.toString()}
              iconContent={
                <Icon
                  size={16}
                  color={nowTheme.COLORS.PRIMARY}
                  name="dollar-sign"
                  family="feather"
                  style={styles.inputIcons}
                />
              }
            />
          </Block>
          <Block flex={1}>
            <CustomInput
              onChangeText={(text) => setFields({ ...fields, addition: text })}
              labelText="Adicional"
              placeholder="5,00"
              value={fields.addition?.toString()}
              iconContent={
                <Icon
                  size={16}
                  color={nowTheme.COLORS.PRIMARY}
                  name="dollar-sign"
                  family="feather"
                  style={styles.inputIcons}
                />
              }
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
});
