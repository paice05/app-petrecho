import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { Block } from 'galio-framework';
import { useFocusEffect } from '@react-navigation/native';
import { format } from 'date-fns';

import CardReportEntry from '../../components/CardReportEntry';
import { nowTheme } from '../../constants';
import { api } from '../../services/api';

const EntryReport = ({ navigation }) => {
  const [valueEntry, setValueEntry] = useState([]);

  const fetchReportsEntry = (params) => {
    api
      .get('/reports', {
        params,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(({ data }) => {
        setValueEntry(data.data);
      })
      .catch((error) => console.log({ error }));
  };

  useFocusEffect(
    useCallback(() => {
      fetchReportsEntry({});
    }, [])
  );

  const dataEntry = valueEntry.filter((item) => item.entry);

  const totalValue = dataEntry.reduce((acc, cur) => acc + cur.entry, 0);

  return (
    <ScrollView showsVerticalScrollIndicator={true} contentContainerStyle={styles.card}>
      <Block>
        <Block style={styles.wraperTotalValue}>
          <Text style={styles.totalValueText}>Saldo total:</Text>
          <Text style={styles.totalValue}>{`R$ ${Number(totalValue)
            .toFixed(2)
            .replace('.', ',')}`}</Text>
        </Block>

        {dataEntry.map((item) => {
          return (
            <CardReportEntry
              navigation={navigation}
              id={item.id}
              data={format(new Date(item.createdAt), 'dd/MM/yyyy')}
              servico={item.schedule?.services.map((item) => item.name).join(',')}
              value={`R$ ` + Number(item.entry).toFixed(2).replace('.', ',')}
              nome={item.schedule?.user.name}
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
    marginTop: '18%',
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
