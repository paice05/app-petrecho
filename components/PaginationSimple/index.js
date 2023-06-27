import React, { useState } from 'react';

import { Block, Button as GButton } from 'galio-framework';
import { StyleSheet, Text } from 'react-native';

const Button = ({ label }) => {
  return (
    <GButton textStyle={{ fontSize: 10 }} small center style={styles.optionsButton}>
      {label}
    </GButton>
  );
};

export const PaginationSimple = ({ currentPage = 1, total = 50, lastPage = 5 }) => {
  return (
    <Block row center>
      <Button color="info" label={'Anterior'}></Button>
      <Text>
        Página {currentPage} de {lastPage}
      </Text>
      <Button color="info" label={'Próxima'}></Button>

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
  },
});
