import React, { useState } from 'react';
import { Block, Text } from 'galio-framework';
import RNDateTimePicker from '@react-native-community/datetimepicker';

export const DateTimePicker = ({ time = new Date(), setTime, onClose }) => {
  return (
    <Block>
      <RNDateTimePicker
        onTouchCancel={onClose}
        onTouchEndCapture={onClose}
        onTouchEnd={onClose}
        is24Hour
        value={time}
        onChange={(event, value) => setTime(value)}
        mode="time"
      />
    </Block>
  );
};
