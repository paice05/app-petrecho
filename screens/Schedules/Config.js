import { Block, theme } from 'galio-framework';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Button, Icon } from '../../components';
import CustomInput from '../../components/CustomInput';

export const Config = ({ fields, setFields }) => {
  const [show, setShow] = useState(false);

  const handleToggleShow = () => setShow(!show);

  return (
    <Block>
      <TouchableOpacity onPress={handleToggleShow}>
        <Block flex row style={show ? styles.containerOpen : styles.containerClose}>
          <Text> Configurações gerais </Text>

          <Icon
            name="chevron-down"
            family="feather"
            size={18}
            color={'black'}
            style={show ? styles.iconRotate : {}}
          />
        </Block>
      </TouchableOpacity>

      {show && (
        <Block flex row style={{ gap: 20 }}>
          <Block flex>
            <CustomInput
              onChangeText={(text) => setFields({ ...fields, discount: text })}
              labelText="Desconto"
              placeholder="R$10,00"
              value={fields.discount?.toString()}
            />
          </Block>
          <Block flex>
            <CustomInput
              onChangeText={(text) => setFields({ ...fields, addition: text })}
              labelText="Adicional"
              placeholder="R$5,00"
              value={fields.addition?.toString()}
            />
          </Block>
        </Block>
      )}
    </Block>
  );
};

const styles = StyleSheet.create({
  containerOpen: {
    justifyContent: 'space-between',
  },
  containerClose: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  iconRotate: {
    transform: 'rotate(180deg)',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingHorizontal: theme.SIZES.BASE,
  },
  button: {
    marginBottom: theme.SIZES.BASE,
    width: 100,
  },
  count: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 20,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#666eee',
  },
});
