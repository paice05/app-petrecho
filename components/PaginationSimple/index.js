import React from 'react';

import { Block, Text } from 'galio-framework';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { nowTheme } from '../../constants';

const Button = ({ label, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text color={nowTheme.COLORS.PRIMARY} style={styles.text}>
        {label}
      </Text>
    </TouchableOpacity>
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
  text: {
    textDecorationLine: 'underline',
    paddingHorizontal: 10,
  },
});
