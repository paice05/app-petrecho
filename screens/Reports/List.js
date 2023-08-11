import React, { useCallback, useState } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import format from 'date-fns/format';

import CardReport from '../../components/CardReport';
import CustomFlatList from '../../components/CustomFlatList';
import Icon from '../../components/Icon';
import { nowTheme } from '../../constants';
import { Modal } from '../../components/Modal';
import { Calendar } from '../../components/Calendar';
import { useFocusEffect } from '@react-navigation/native';
import { api } from '../../services/api';

const ReportList = ({ navigation }) => {
  const [openCalendar, setOpenCalendar] = useState(false);
  const [date, setDate] = useState(new Date());

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
      <Block style={styles.dateFilter}>
        <TouchableOpacity style={styles.dateStyle} onPress={() => setOpenCalendar(true)}>
          <Icon
            name="calendar-602x"
            family="NowExtra"
            size={18}
            color={nowTheme.COLORS.ICON_INPUT}
          />
          <Text>{format(date, 'dd/MM/YYY')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dateStyle} onPress={() => setOpenCalendar(true)}>
          <Icon
            name="calendar-602x"
            family="NowExtra"
            size={18}
            color={nowTheme.COLORS.ICON_INPUT}
          />
          <Text>{format(date, 'dd/MM/YYY')}</Text>
        </TouchableOpacity>
      </Block>
      <Block>
        <CardReport navigation={navigation} entryValue={valueEntry} outPutValue={valueExit} />
      </Block>

      <Modal
        isVisible={openCalendar}
        handleCancel={() => setOpenCalendar(false)}
        handleConfirm={() => setOpenCalendar(false)}
        title="Selecione uma data para buscar seus agendamentos"
        onRequestClose={() => {
          setOpenCalendar(!openCalendar);
        }}
      >
        <Calendar
          onChange={(value) => {
            setDate(new Date(`${value} 00:00:00`));
            setOpenCalendar(false);
          }}
        />
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 8,
  },
  dateFilter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.SIZES.BASE / 2,
  },
  dateStyle: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',

    padding: 5,
    marginBottom: 10,
  },
  subtitleSchedules: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    fontSize: 16,
  },
  item: {
    fontSize: 16,
    paddingBottom: 10,
  },
});

export default ReportList;
