import React, { useEffect, useState } from 'react';
import { Text } from 'galio-framework';
import { StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';

import CardSchedule from '../../components/CardSchedule';
import { PaginationSimple } from '../../components/PaginationSimple';
import { Modal } from '../../components/Modal';
import Tabs from '../../components/Tabs';
import { Calendar } from '../../components/Calendar';
import { nowTheme, tabs } from '../../constants';

export const ScheduleList = ({ navigation }) => {
  const [openCalendar, setOpenCalendar] = useState(false);
  const [date, setDate] = useState(null);

  const defaultTab = tabs.week[new Date().getDay()].id;

  return (
    <ScrollView showsVerticalScrollIndicator={true} contentContainerStyle={styles.card}>
      <TouchableOpacity style={styles.dateStyle} onPress={() => setOpenCalendar(true)}>
        <Text>{date || 'Selecionar um data'}</Text>
      </TouchableOpacity>

      <Modal
        isVisible={openCalendar}
        handleCancel={() => setOpenCalendar(false)}
        handleConfirm={() => setOpenCalendar(false)}
        title="Selecione uma data para buscar seus agendamentos"
        onRequestClose={() => {
          Alert.alert('Modal será fechado.');
          setOpenCalendar(!openCalendar);
        }}
      >
        <Calendar
          onChange={(value) => {
            setDate(value);
            setOpenCalendar(false);
          }}
        />
      </Modal>

      <Tabs
        data={tabs.week}
        initialIndex={defaultTab}
        onChange={(id) => {}}
        selected={date && new Date(date).getDay()}
      />

      <CardSchedule
        navigation={navigation}
        id={1}
        nome="Alexandre Barbosa"
        servico="Cabelo, barba"
        horario="14:00"
      />
      <PaginationSimple />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 5,
  },
  dateStyle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    padding: 5,
    marginBottom: 5,
    marginTop: 5,
  },
  containerButton: {
    display: 'flex',
    flexDirection: 'row',
    //padding: 12,
    position: 'relative',
  },
  buttonWeek: {
    borderRadius: 30,
    borderColor: nowTheme.COLORS.BORDER,
    backgroundColor: '#FFFFFF',
    borderStyle: 'solid',
    borderWidth: 1,
    padding: 5,
    gap: 3,
    margin: 5,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    width: '10%',
  },
  text: {
    marginHorizontal: 20,
    fontSize: 12,
  },
});
