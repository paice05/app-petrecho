import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Vibration } from 'react-native';
import { Block, Text } from 'galio-framework';

import { nowTheme } from '../../constants';

export const Navigation = ({ items = [] }) => {
  const [active, setActive] = useState(0);

  return (
    <Block>
      <Block row center>
        {items.map((item, index) => (
          <Block key={index} row center>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                const vibrationDuration = 100;

                // Faz o dispositivo vibrar
                Vibration.vibrate(vibrationDuration);

                setActive(index);
              }}
            >
              <Text size={16} color={index === active && nowTheme.COLORS.PRIMARY}>
                {item.title}
              </Text>
            </TouchableOpacity>
            {index < items.length - 1 && <Block style={styles.divider} />}
          </Block>
        ))}
      </Block>
      <Block>{items[active].children}</Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  divider: {
    backgroundColor: 'gray',
    width: 1,
    height: 20,
    marginHorizontal: 20,
  },
  button: {
    padding: 8,
  },
});
