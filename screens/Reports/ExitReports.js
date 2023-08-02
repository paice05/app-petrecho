import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import CardReportExit from '../../components/CardReportExit';
import { Block } from 'galio-framework';

const ExitReport = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={true} contentContainerStyle={styles.card}>
      <Block>
        <CardReportExit data={'29/07/23'} nome={'Alexandre Barbosa'} value={'R$ 20,00'} />
      </Block>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 8,
    marginTop: '18%',
  },
  totalValue: {
    color: '#00CED1',
    fontSize: 20,
  },
  totalValueText: {
    fontSize: 16,
    fontWeight: '500',
  },
  wraperTotalValue: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
  },
});
export default ExitReport;
