import React, { useState } from 'react';
import { Dimensions, Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native';
import { Text } from 'galio-framework';

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
      <Text bold>{labelText}</Text>

      <SelectList
        style={Platform.OS === 'ios' ? styles.inputIOS : styles.input}
        placeHolder={placeholder}
        onSelect={(item, index) => {
          onChange(item);
        }}
        value={value?.title}
        data={options}
        headerTitle={labelText}
        listHeight={300}
        textStyle={styles.textStyleChange}
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
    width: 360,
    // marginBottom: 16,
    paddingHorizontal: 20,

    display: 'flex',
    flexDirection: 'row-reverse',
  },
  inputIOS: {
    borderRadius: 35,
    borderWidth: 1,
    borderColor: nowTheme.COLORS.BORDER,
    height: 44,
    backgroundColor: '#FFFFFF',
    width: 375,
    // marginBottom: 16,
    paddingHorizontal: 18,

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
  textStyleChange: {
    fontSize: 14,
    marginLeft: 10,
    color: nowTheme.COLORS.PLACEHOLDER,
    //'&::after': {
    //  color: nowTheme.COLORS.BLACK,
    //},
  },
});
