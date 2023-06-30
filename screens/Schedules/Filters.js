import { Block, theme } from 'galio-framework';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Button, Icon } from '../../components';
import CustomInput from '../../components/CustomInput';

export const Filters = () => {
  const [show, setShow] = useState(false);

  const handleToggleShow = () => setShow(!show);

  return (
    <Block>
      <TouchableOpacity
        onPress={handleToggleShow}
        style={{ marginLeft: 10, marginTop: 15, marginRight: 220 }}
      >
        <Block style={show ? styles.containerOpen : styles.containerClose} row>
          <Block row style={{ gap: 5 }}>
            <Text> Configurações gerais </Text>
          </Block>

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
        <Block row>
          <CustomInput labelText="Desconto" placeholder="R$10,00" />
          <CustomInput labelText="Adicional" placeholder="R$5,00" />
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
