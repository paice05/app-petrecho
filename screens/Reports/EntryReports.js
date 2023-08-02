import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import CardReportEntry from '../../components/CardReportEntry';
import { Block } from 'galio-framework';

const EntryReport = ({ navigation }) => {
  return (
    <ScrollView showsVerticalScrollIndicator={true} contentContainerStyle={styles.card}>
      <Block>
        <CardReportEntry
          data={'28/07/23'}
          servico={'Corte + Barba'}
          value={'R$ 20,00'}
          nome={'Alexandre Barbosa'}
        />

        <CardReportEntry
          data={'29/07/23'}
          servico={'Corte'}
          value={'R$ 20,00'}
          nome={'Arthur Barbosa'}
        />

        <CardReportEntry
          data={'30/07/23'}
          servico={'Unha + sobrancelha'}
          value={'R$ 20,00'}
          nome={'Ane Barbosa'}
        />
      </Block>
      <Block style={styles.wraperTotalValue}>
        <Text style={styles.totalValueText}>Valor total entradas:</Text>
        <Text style={styles.totalValue}>{'R$ 60,00'}</Text>
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

export default EntryReport;
