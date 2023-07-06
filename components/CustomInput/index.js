import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Block, Input } from 'galio-framework';
import { nowTheme } from '../../constants';

const CustomInput = ({ labelText, placeholder, options, value, onChangeText }) => {
  return (
    <Input
      placeholder={placeholder}
      labelText={labelText}
      label={labelText}
      options={options}
      value={value}
      onChangeText={onChangeText}
      placeholderTextColor={nowTheme.COLORS.MUTED}
      style={styles.input}
      color={nowTheme.COLORS.HEADER}
      iconContent={<Block />}
      shadowless
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 30,
    borderColor: nowTheme.COLORS.BORDER,
    height: 44,
    backgroundColor: '#FFFFFF',
  },
});

export default CustomInput;
