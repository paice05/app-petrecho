import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

import Icon from '../Icon';
import { Block } from 'galio-framework';
import { Divider } from '@rneui/themed';

import { nowTheme } from '../../constants';
import { theme } from 'galio-framework';

const CardReportEntry = ({ navigation, id, data, servico, nome }) => {
  return (
    <>
      <Block style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('ReportList')}>
          <Icon family="feather" name="minimal-left2x" />
          <Text>Entradas</Text>
        </TouchableOpacity>
      </Block>
      <Block>
        <Text>{data}</Text>
        <Text>{servico}</Text>
        <Text>{nome}</Text>
        <Divider />
      </Block>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.SIZES.BASE / 2,
    borderRadius: 4,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: nowTheme.COLORS.TUMBLR,
    marginBottom: 16,
  },
});

export default CardReportEntry;
