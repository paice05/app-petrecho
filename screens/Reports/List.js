import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Block, Text } from 'galio-framework';
import { lastDayOfMonth } from 'date-fns';

import CardReport from '../../components/CardReport';
import SimpleMenu from '../../components/Menu';
import { useRequestFindMany } from '../../components/hooks/useRequestFindMany';
import { nowTheme } from '../../constants';
import { formartDate } from '../../utils/formartDate';

const optionsBirthDate = [
  { title: 'Janeiro', data: 'Janeiro' },
  { title: 'Fevereiro', data: 'Fevereiro' },
  { title: 'Março', data: 'Março' },
  { title: 'Abril', data: 'Abril' },
  { title: 'Maio', data: 'Maio' },
  { title: 'Junho', data: 'Junho' },
  { title: 'Julho', data: 'Julho' },
  { title: 'Agosto', data: 'Agosto' },
  { title: 'Setembro', data: 'Setembro' },
  { title: 'Outubro', data: 'Outubro' },
  { title: 'Novembro', data: 'Novembro' },
  { title: 'Dezembro', data: 'Dezembro' },
];

const ReportList = ({ navigation }) => {
  const [date, setDate] = useState(optionsBirthDate[new Date().getMonth()].title);

  const [valueEntry, setValueEntry] = useState(0);
  const [valueExit, setValueExit] = useState(0);

  const { execute, response } = useRequestFindMany({ path: '/reports' });

  useEffect(() => {
    if (response) {
      console.log({ response });
      setValueEntry(response.data.reduce((acc, cur) => acc + cur.entry, 0));
      setValueExit(response.data.reduce((acc, cur) => acc + cur.out, 0));
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
      <Block style={{ marginBottom: 16 }}>
        <SimpleMenu
          items={optionsBirthDate.map((item) => ({
            text: item.title,
            onSelect: (value) => setDate(value),
          }))}
        >
          <Text>
            Relatório de{' '}
            <Text style={styles.text} color={nowTheme.COLORS.PRIMARY}>
              {date}
            </Text>
          </Text>
        </SimpleMenu>
      </Block>

      <CardReport
        navigation={navigation}
        date={date}
        entryValue={valueEntry}
        outPutValue={valueExit}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 8,
  },
  text: {
    textDecorationLine: 'underline',
    paddingHorizontal: 10,
  },
});

export default ReportList;
