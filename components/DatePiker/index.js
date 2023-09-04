import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { Block, Text } from 'galio-framework';

import IconExtra from '../Icon';
import { formartDate } from '../../utils/formartDate';
import { nowTheme } from '../../constants';

export const DateTimePicker = ({ onChange, value = new Date() }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onTimeSelected = (event, value) => {
    setShowDatePicker(false);

    onChange(new Date(value));
  };

  return (
    <Block>
      <TouchableOpacity style={styles.buttonDate} onPress={() => setShowDatePicker(true)}>
        <Block row gap={10} style={{ alignItems: 'center' }}>
          <IconExtra size={16} color={nowTheme.COLORS.PRIMARY} name="clock" family="feather" />
          <Text size={16}>{formartDate(value, 'HH:mm')}</Text>
        </Block>
      </TouchableOpacity>
      {showDatePicker && (
        <RNDateTimePicker
          value={value}
          mode={'time'}
          display={'default'}
          is24Hour={true}
          onChange={onTimeSelected}
        />
      )}
    </Block>
  );
};

const styles = StyleSheet.create({
  buttonDate: {
    borderRadius: 30,
    borderWidth: 1,
    borderColor: nowTheme.COLORS.BORDER,
    height: 44,
    backgroundColor: '#FFFFFF',
    padding: 12,
  },
});
