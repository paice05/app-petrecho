import { Text } from 'galio-framework';
import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import CardSchedule from '../../components/CardSchedule';
import { PaginationSimple } from '../../components/PaginationSimple';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { Modal } from '../../components/Modal';

export const ScheduleList = ({ navigation }) => {
  const [openCalendar, setOpenCalendar] = useState(false);
  const [date, setDate] = useState('');

  return (
    <ScrollView showsVerticalScrollIndicator={true} contentContainerStyle={styles.card}>
      <TouchableOpacity  onPress={() => setOpenCalendar(true)}>
        <Text>{date || 'Selecionar um data'}</Text>
      </TouchableOpacity>

      <Modal
        isVisible={openCalendar}
        handleCancel={() => setOpenCalendar(false)}
        handleConfirm={() => setOpenCalendar(false)}
        title="Selecione um data"
      >
        <Calendar
          onDayPress={(day) => {
            setDate(day.dateString);
            setOpenCalendar(false);
          }}
        />
      </Modal>

      <CardSchedule
        navigation={navigation}
        id={1}
        nome="Alexandre Barbosa"
        servico="Cabelo, barba"
        horario="14:00"
      />
      <CardSchedule
        navigation={navigation}
        id={1}
        nome="Maria da Silva"
        servico="Unha, Cabelo, sobrancelha"
        horario="15:00"
      />

      <CardSchedule
        navigation={navigation}
        id={1}
        nome="Priscila Mascarenhas"
        servico="Cabelo, sobrancelha"
        horario="16:00"
      />
      <PaginationSimple />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 8,
  },
});
