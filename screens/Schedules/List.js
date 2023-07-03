import { Text } from 'galio-framework';
import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import CardSchedule from '../../components/CardSchedule';
import { PaginationSimple } from '../../components/PaginationSimple';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

export const ScheduleList = ({ navigation }) => {
  return (
    <ScrollView showsVerticalScrollIndicator={true} contentContainerStyle={styles.card}>
      <Text>Modal - Calendario</Text>
      <Calendar
        onDayPress={(day) => {
          console.log('Select day', day);
        }}
      />
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
