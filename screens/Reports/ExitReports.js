import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Block } from 'galio-framework';
import { format } from 'date-fns';

import CardReportExit from '../../components/CardReportExit';
import { api } from '../../services/api';

const ExitReport = () => {
  const [valueOut, setValueOut] = useState([]);

  const fetchReportsOut = (params) => {
    api
      .request()
      .get('/reports', {
        params,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(({ data }) => {
        setValueOut(data.data);
      })
      .catch((error) => console.log({ error }));
  };

  useFocusEffect(
    useCallback(() => {
      fetchReportsOut({});
    }, [])
  );

  return (
    <ScrollView showsVerticalScrollIndicator={true} contentContainerStyle={styles.card}>
      {valueOut
        .filter((item) => item.out)
        .map((item) => (
          <Block>
            <CardReportExit
              data={format(new Date(item.createdAt), 'dd/MM/YYY')}
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
