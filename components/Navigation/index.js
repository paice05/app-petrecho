import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Vibration } from 'react-native';
import { Block, Text } from 'galio-framework';

import { nowTheme } from '../../constants';

export const Navigation = ({ items = [] }) => {
  const [active, setActive] = useState(0);

  return (
    <Block>
      <Block row center gap={20} style={styles.container}>
        {items.map((item, index) => (
          <Block key={index}>
            <TouchableOpacity
              onPress={() => {
                const vibrationDuration = 100;

                // Faz o dispositivo vibrar
                Vibration.vibrate(vibrationDuration);

                setActive(index);
              }}
            >
              <Text
                style={index === 0 ? styles.divider : {}}
                size={18}
                color={index === active && nowTheme.COLORS.PRIMARY}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
          </Block>
        ))}
      </Block>
      <Block>{items[active].children}</Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  divider: {
    borderColor: 'gray',
    borderRightWidth: 1,
    paddingRight: 20,
  },
  container: {
    padding: 8,
  },
});
