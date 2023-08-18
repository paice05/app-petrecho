import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Block, Text } from 'galio-framework';
import { lastDayOfMonth } from 'date-fns';

import CardReportExit from '../../components/CardReportExit';
import { useRequestFindMany } from '../../components/hooks/useRequestFindMany';
import { formartDate } from '../../utils/formartDate';
import { optionsBirthDate } from '../../constants/month';

const ExitReport = ({ route }) => {
  const { date } = route.params;

  const [valueOut, setValueOut] = useState([]);

  const { execute, response } = useRequestFindMany({ path: '/reports' });

  useEffect(() => {
    if (response) {
      setValueOut(response.data);
    }
  }, [response]);

  useFocusEffect(
    useCallback(() => {
      const month = optionsBirthDate.findIndex((item) => item.title === date) + 1;

      const start = new Date(`${new Date().getFullYear()}-${month}-1 00:00:00`);
      const lastDay = formartDate(lastDayOfMonth(start), 'YYY-MM-dd');
      const end = new Date(`${lastDay} 23:59:59`);

      execute({
        where: {
          createdAt: {
            $between: [start, end],
          },
        },
      });
    }, [date])
  );

  return (
    <ScrollView showsVerticalScrollIndicator={true} contentContainerStyle={styles.card}>
      {valueOut.length === 0 ? <Text> Nenhum relatório encontrado no mês selecionado </Text> : null}
      {valueOut
        .filter((item) => item.out)
        .map((item) => (
          <Block>
            <CardReportExit
              data={formartDate(item.createdAt, 'dd/MM/YYY')}
              nome={item.description}
              value={`R$ ${Number(item.out).toFixed(2).replace('.', ',')}`}
            />
          </Block>
        ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 8,
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
