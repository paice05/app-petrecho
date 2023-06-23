import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Block, Input } from 'galio-framework';
import { nowTheme } from '../../constants';

const CustomInput = ({ labelText, placeholder, options }) => {
  return (
    <View>
      <Input
        placeholder={placeholder}
        labelText={labelText}
        label={labelText}
        options={options}
        placeholderTextColor={nowTheme.COLORS.MUTED}
        style={styles.input}
        color={nowTheme.COLORS.HEADER}
        iconContent={<Block />}
        shadowless
      />
    </View>
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
