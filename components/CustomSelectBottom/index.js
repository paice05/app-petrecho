import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native';

import { SelectList } from 'react-native-select-bottom-list';
import { nowTheme } from '../../constants';
import Icon from '../Icon';

const { width } = Dimensions.get('window');

export const CustomSelectBottom = ({
  labelText,
  placeholder,
  onChange,
  value,
  options,
  textStyle,
  itemTextStyle,
}) => {
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
        textStyle={{ fontSize: 14, marginLeft: 18, color: nowTheme.COLORS.BORDER }}
        itemTextStyle={itemTextStyle}
        renderIcon={() => <Icon family="feather" name="user" color={nowTheme.COLORS.PRIMARY} />}
        // showSearch
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 30,
    borderWidth: 1,
    borderColor: nowTheme.COLORS.BORDER,
    height: 44,
    backgroundColor: '#FFFFFF',
    width: width * 0.8,
    marginBottom: 16,
    paddingHorizontal: 20,

    display: 'flex',
    flexDirection: 'row-reverse',
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
