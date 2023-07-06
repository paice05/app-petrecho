import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native';

import { SelectList } from 'react-native-select-bottom-list';
import { nowTheme } from '../../constants';

const { width } = Dimensions.get('window');

export const CustomSelectBottom = ({ labelText, placeholder, onChange, value, options }) => {
  return (
    <SafeAreaView>
      <Text>{labelText}</Text>

      <SelectList
        style={styles.input}
        placeHolder={placeholder}
        onSelect={(item, index) => {
          onChange(item);
        }}
        value={value?.title}
        data={options}
        headerTitle={labelText}
        listHeight={300}
        // showSearch
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 30,
    borderColor: nowTheme.COLORS.BORDER,
    height: 44,
    backgroundColor: '#FFFFFF',
    width: width * 0.9,
    marginBottom: 16,
  },
  success: {
    borderColor: nowTheme.COLORS.INPUT_SUCCESS,
  },
  error: {
    borderColor: nowTheme.COLORS.INPUT_ERROR,
  },
  primary: {
    borderColor: nowTheme.COLORS.PRIMARY,
  },
  shadow: {
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 0.5 },
    shadowRadius: 1,
    shadowOpacity: 0.13,
    elevation: 2,
  },
});
