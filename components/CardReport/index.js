import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { theme, Block, Text, Button } from 'galio-framework';
import { nowTheme } from '../../constants';

const CardReport = ({ navigation, date, entryValue, outPutValue, id }) => {
  return (
    <Block flex space="between" style={styles.container}>
      <Block style={styles.wrapper}>
        <Block row space="between">
          <Text size={18}>Entrada</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('EntryReports', {
                date,
              })
            }
          >
            <Text size={16} color={nowTheme.COLORS.PRIMARY}>
              Ver mais
            </Text>
          </TouchableOpacity>
        </Block>
        <Text style={styles.entryValue}>R$ {Number(entryValue).toFixed(2).replace('.', ',')}</Text>
      </Block>
      <Block style={styles.wrapper}>
        <Block row space="between">
          <Text size={18}>Saída</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ExitReports', {
                date,
              })
            }
          >
            <Text size={16} color={nowTheme.COLORS.PRIMARY}>
              Ver mais
            </Text>
          </TouchableOpacity>
        </Block>
        <Text style={styles.outPutValue}>
          R$ {Number(outPutValue).toFixed(2).replace('.', ',')}
        </Text>
      </Block>
      <TouchableOpacity onPress={() => navigation.navigate('FormRegisterExits', { itemId: id })}>
        <Text size={18} style={styles.checkOut}>
          Registrar saída
        </Text>
      </TouchableOpacity>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {},
  wrapper: {
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  entryValue: {
    fontSize: 28,
    color: nowTheme.COLORS.SUCCESS,
  },
  outPutValue: {
    fontSize: 28,
    color: nowTheme.COLORS.ERROR,
  },
  checkOut: {
    color: nowTheme.COLORS.PRIMARY,
    textDecorationLine: 'underline',
  },
});

export default CardReport;
