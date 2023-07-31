import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { theme, Block, Text, Button } from 'galio-framework';

const CardReport = ({ navigation, entryValue, outPutValue, id }) => {
  return (
    <Block flex space="between" style={styles.container}>
      <Block style={styles.wraper}>
        <Text style={{ fontSize: 16 }}>Entrada</Text>
        <TouchableOpacity onPress={() => navigation.navigate('EntryReports')}>
          <Text>Ver mais</Text>
        </TouchableOpacity>
      </Block>
      <Text style={styles.entryValue}>R$ {Number(entryValue).toFixed(2).replace('.', ',')}</Text>
      <Block style={styles.wraper}>
        <Text style={{ fontSize: 16, paddingTop: 15 }}>Saída</Text>
        <TouchableOpacity>
          <Text>Ver mais</Text>
        </TouchableOpacity>
      </Block>
      <Text style={styles.outPutValue}>{outPutValue}</Text>
      <Text style={styles.checkOut}>Registrar saída</Text>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.SIZES.BASE / 2,
    marginBottom: 16,
  },
  wraper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 5,
  },
  entryValue: {
    fontSize: 28,
    color: '#00CED1',
  },
  outPutValue: {
    fontSize: 28,
    color: '#B22222',
  },
  checkOut: {
    fontSize: 14,
    color: '#6495ED',
    textDecorationLine: 'underline',
  },
});

export default CardReport;
