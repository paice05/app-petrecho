import React, { useState } from 'react';
import { Block, Text } from 'galio-framework';
import RNDateTimePicker from '@react-native-community/datetimepicker';

export const DateTimePicker = ({ onChange }) => {
  const [time, setTime] = useState(new Date(Date.now()));

  const onTimeSelected = (event, value) => {
    setTime(value);
    let tempTime = new Date(value);
    let fTime = tempTime.getHours() + ':' + tempTime.getMinutes();
    const [hour, minute] = tempTime.toLocaleTimeString('pt-Br').split(':');
    const fullTime = `${hour}:${minute}`;
    onChange(fullTime);
  };

  return (
    <Block>
      <RNDateTimePicker
        value={time}
        mode={'time'}
        display={'default'}
        is24Hour={true}
        onChange={onTimeSelected}
      />
    </Block>
  );
};
