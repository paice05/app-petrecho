import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Block, Text } from 'galio-framework';
import { useFocusEffect } from '@react-navigation/native';
import { lastDayOfMonth } from 'date-fns';

import CardReportEntry from '../../components/CardReportEntry';
import { useRequestFindMany } from '../../components/hooks/useRequestFindMany';
import { formartDate } from '../../utils/formartDate';
import { nowTheme } from '../../constants';
import { optionsBirthDate } from '../../constants/month';

const EntryReport = ({ route }) => {
  const { date } = route.params;

  const [valueEntry, setValueEntry] = useState([]);

  const { execute, response } = useRequestFindMany({ path: '/reports' });

  useEffect(() => {
    if (response) {
      setValueEntry(response.data);
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

  const dataEntry = valueEntry.filter((item) => item.entry) || [];

  return (
    <ScrollView showsVerticalScrollIndicator={true} contentContainerStyle={styles.card}>
      <Block>
        {dataEntry.length === 0 ? (
          <Text> Nenhum relatório encontrado no mês selecionado </Text>
        ) : null}
        {dataEntry.map((item) => {
          return (
            <CardReportEntry
              key={item.id}
              id={item.id}
              data={formartDate(item.createdAt, 'dd/MM/yyyy')}
              servico={item.schedule?.services.map((item) => item.name).join(', ')}
              value={`R$ ` + Number(item.entry).toFixed(2).replace('.', ',')}
              nome={item.schedule?.user.name}
              addition={`R$ ` + Number(item.schedule.addition).toFixed(2).replace('.', ',')}
              discount={`R$ ` + Number(item.schedule.discount).toFixed(2).replace('.', ',')}
            />
          );
        })}
      </Block>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 8,
  },
  totalValue: {
    color: nowTheme.COLORS.BORDER_COLOR,
    fontSize: 20,
  },
  totalValueText: {
    fontSize: 16,
    color: nowTheme.COLORS.BORDER_COLOR,
  },
  wraperTotalValue: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    color: nowTheme.COLORS.BORDER_COLOR,
    borderRadius: 4,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#00acc1',
    backgroundColor: '#00acc1',
  },
});

export default EntryReport;
