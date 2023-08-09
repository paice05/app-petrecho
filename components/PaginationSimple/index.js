import React, { useState } from 'react';

import { Block, Button as GButton } from 'galio-framework';
import { StyleSheet, Text } from 'react-native';

const Button = ({ label, onPress }) => {
  return (
    <GButton
      onPress={onPress}
      textStyle={{ fontSize: 10 }}
      small
      center
      style={styles.optionsButton}
    >
      {label}
    </GButton>
  );
};

export const PaginationSimple = ({
  currentPage = 0,
  total = 0,
  lastPage = 0,
  handleNextPage,
  handlePreviousPage,
}) => {
  return (
    <Block row center>
      <Button color="info" label={'Anterior'} onPress={handlePreviousPage}></Button>
      <Text>
        Página {currentPage} de {lastPage}
      </Text>
      <Button color="info" label={'Próxima'} onPress={handleNextPage}></Button>

      <Text>Total: {total}</Text>
    </Block>
  );
};

const styles = StyleSheet.create({
  optionsButton: {
    width: 'auto',
    height: 34,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
  },
});
