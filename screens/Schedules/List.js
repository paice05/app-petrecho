import { Text, Block, theme, Button } from 'galio-framework';
import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  Dimensions,
  Animated,
  Alert,
} from 'react-native';
import CardSchedule from '../../components/CardSchedule';
import { PaginationSimple } from '../../components/PaginationSimple';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { Modal } from '../../components/Modal';
import { nowTheme } from '../../constants';
import ButtonToggleGroup from 'react-native-button-toggle-group';
import Tabs from '../../components/Tabs';
import tabs from '../../constants';
import dateFns from 'date-fns';

const { width } = Dimensions.get('screen');

export const ScheduleList = ({ navigation, tabIndex }) => {
  const [openCalendar, setOpenCalendar] = useState(false);
  const [date, setDate] = useState('');
  const [value, setValue] = useState('QUA');

  //const formatBr = (date = new Date()) => dateFns.format(date, 'DD/MM/YYYY');

  const defaultTab = tabs && tabs[0] && tabs[0].id;

  const defaultWeek = [
    { id: 'domingo', title: 'DOM' },
    { id: 'segunda', title: 'SEG' },
    { id: 'terca', title: 'TER' },
    { id: 'quarta', title: 'QUA' },
    { id: 'quinta', title: 'QUI' },
    { id: 'sexta', title: 'SEX' },
    { id: 'sabado', title: 'SAB' },
  ];

  return (
    <ScrollView showsVerticalScrollIndicator={true} contentContainerStyle={styles.card}>
      <TouchableOpacity style={styles.dateStyle} onPress={() => setOpenCalendar(true)}>
        <Text>{date || 'Selecionar um data'}</Text>
      </TouchableOpacity>

      <Modal
        isVisible={openCalendar}
        handleCancel={() => setOpenCalendar(false)}
        handleConfirm={() => setOpenCalendar(false)}
        title="Selecione um data"
        onRequestClose={() => {
          Alert.alert('Modal será fechado.');
          setOpenCalendar(!openCalendar);
        }}
      >
        <Calendar
          onDayPress={(day) => {
            setDate(day.dateString);
            setOpenCalendar(false);
          }}
        />

        <Button
          title="Fechar"
          onPress={() => {
            setOpenCalendar({ openCalendar: false });
          }}
        />
      </Modal>

      {/*  <ScrollView horizontal={true}>
        <Block style={{ padding: 5 }}>
          <ButtonToggleGroup
            highlightBackgroundColor={'blue'}
            highlightTextColor={'white'}
            inactiveBackgroundColor={'transparent'}
            inactiveTextColor={'grey'}
            values={['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB']}
            value={value}
            onSelect={(val) => setValue(val)}
          />
        </Block>
      </ScrollView> */}

      <Tabs
        data={defaultWeek || []}
        initialIndex={tabIndex || defaultTab}
        onChange={(id) => navigation.setParams({ tabId: id })}
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
    padding: 5,
  },
  dateStyle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: nowTheme.COLORS.BORDER,
    backgroundColor: '#FFFFFF',
    borderStyle: 'solid',
    borderWidth: 1,
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
