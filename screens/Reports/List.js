import React, { useCallback, useState } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Block, Text, theme } from 'galio-framework';

import { api } from '../../services/api';
import CardReport from '../../components/CardReport';
import { CustomSelectBottom } from '../../components/CustomSelectBottom';
import SimpleMenu from '../../components/Menu';
import { nowTheme } from '../../constants';

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

  const fetchReports = (params) => {
    api
      .request()
      .get('/reports', {
        params,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(({ data }) => {
        setValueEntry(data.data.reduce((acc, cur) => acc + cur.entry, 0));
        setValueExit(data.data.reduce((acc, cur) => acc + cur.out, 0));
      });
  };

  useFocusEffect(
    useCallback(() => {
      fetchReports({});
    }, [])
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

      <CardReport navigation={navigation} entryValue={valueEntry} outPutValue={valueExit} />
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
