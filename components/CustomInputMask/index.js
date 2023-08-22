import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { Block } from 'galio-framework';

import { nowTheme } from '../../constants';
import IconExtra from '../Icon';

export const CustomInputMask = ({ onChangeText, value }) => {
  const handlePriceChange = (formatted, extracted) => {
    onChangeText(formatted);
  };

  return (
    <Block row style={styles.container}>
      <IconExtra
        size={16}
        color={nowTheme.COLORS.PRIMARY}
        name="dollar-sign"
        family="feather"
        style={styles.inputIcons}
      />
      <TextInputMask
        type={'money'}
        options={{
          precision: 2,
          separator: ',',
          delimiter: '.',
          unit: 'R$',
        }}
        value={value}
        onChangeText={handlePriceChange}
        style={styles.input}
        placeholder="R$ 10,00"
      />
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 30,
    borderWidth: 1,
    borderColor: nowTheme.COLORS.BORDER,
    height: 44,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
  },
  inputIcons: {
    marginRight: 10,
  },
});
