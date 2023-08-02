import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

import { Block } from 'galio-framework';
import { Divider } from '@rneui/themed';

import { theme } from 'galio-framework';

const CardReportExit = ({ navigation, id, data, nome, value }) => {
  return (
    <Block flex space="between" style={styles.container}>
      <Text style={styles.dateStyle}>{data}</Text>
      <Block style={styles.wraper}>
        <Text style={styles.styleText}>{nome}</Text>
        <Text style={styles.entryValue}>{value}</Text>
      </Block>
      <Divider />
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
    fontSize: 18,
    color: '#B22222',
  },
  styleText: {
    fontSize: 14,
    fontWeight: '500',
  },
  dateStyle: {
    textAlign: 'center',
    fontSize: 16,
  },
});

export default CardReportExit;
