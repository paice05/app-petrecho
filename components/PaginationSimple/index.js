import React from 'react';

import { Block, Text } from 'galio-framework';
import { StyleSheet, TouchableOpacity, Vibration } from 'react-native';
import { nowTheme } from '../../constants';

export const PaginationSimple = ({
  currentPage = 0,
  total = 0,
  lastPage = 0,
  handleNextPage,
  handlePreviousPage,
}) => {
  return (
    <Block row center>
      <TouchableOpacity
        color="info"
        onPress={() => {
          const vibrationDuration = 100;

          // Faz o dispositivo vibrar
          Vibration.vibrate(vibrationDuration);

          handlePreviousPage();
        }}
      >
        <Text color={nowTheme.COLORS.PRIMARY} size={18} style={{ textDecorationLine: 'underline' }}>
          Anterior
        </Text>
      </TouchableOpacity>
      <Text size={16}>
        {' '}
        Página {currentPage} de {lastPage}{' '}
      </Text>
      <TouchableOpacity
        color="info"
        onPress={() => {
          const vibrationDuration = 100;

          // Faz o dispositivo vibrar
          Vibration.vibrate(vibrationDuration);

          handleNextPage();
        }}
      >
        <Text color={nowTheme.COLORS.PRIMARY} size={18} style={{ textDecorationLine: 'underline' }}>
          Próxima
        </Text>
      </TouchableOpacity>

      <Text size={16}> Total: {total}</Text>
    </Block>
  );
};

const styles = StyleSheet.create({
  text: {
    textDecorationLine: 'underline',
    paddingHorizontal: 10,
  },
});
