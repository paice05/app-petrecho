import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

import { Block } from 'galio-framework';
import { Divider } from '@rneui/themed';

import { nowTheme } from '../../constants';
import { theme } from 'galio-framework';

const CardReportEntry = ({ navigation, id, data, servico, nome, value }) => {
  return (
    <>
      <Block flex space="between" style={styles.container}>
        <Text style={styles.dateStyle}>{data}</Text>
        <Block style={styles.wraper}>
          <Text styles={{ fontSize: 14 }}>{servico}</Text>
          <Text style={styles.entryValue}>{value}</Text>
        </Block>

        <Text style={styles.styleText}>{nome}</Text>
        <Divider />
      </Block>
    </>
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
    color: '#00CED1',
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

export default CardReportEntry;
