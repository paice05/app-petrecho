import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Dimensions, TouchableOpacity, Platform } from 'react-native';
import { Calendar } from 'react-native-calendars';

// Galio components
import { Block, Button as GaButton, Text, theme, Switch } from 'galio-framework';

// Now UI themed components
import { nowTheme } from '../../constants';
import { Button, Select, Icon, Input, Header } from '../../components';
import CustomInput from '../../components/CustomInput';
import { CustomSelectHour } from '../../components/CustonSelectHour';
import { Modal } from '../../components/Modal';
import { Config } from './Config';
import { DateTimePicker } from '../../components/DatePiker';
//import DateTimePicker from '@react-native-community/datetimepicker';
import { api } from '../../services/api';

const { width } = Dimensions.get('screen');

const SchedulesForm = ({ route, navigation }) => {
  const params = route.params;

  const isEditing = params?.itemId;

  const [selected, setSelected] = useState('');
  const [showDate, setShowDate] = useState(false);
  const [checked, setChecked] = useState(false);
  const [visible, setVisible] = useState(false);

  const [time, seTime] = useState(new Date());
  const [mode, setMode] = useState('time');
  const [show, setShow] = useState(false);
  const [text, setText] = useState('');

  const onChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;

    let tempTime = new Date(currentTime);
    let fTime = '' + tempTime.getHours() + ':' + tempTime.getMinutes();
    setText(fTime);

    console.log(fTime);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const [fields, setFields] = useState({
    userId: '',
    serviceId: '',
    employeeId: '',
    createdAt: '',
    sheduleAt: '',
    discount: '',
    addition: '',
  });

  const handleSubmitCreate = async () => {
    const payload = {
      ...fields,
      createdAt: fields.createdAt,
      sheduleAt: fields.sheduleAt,
      discount: fields.discount,
      addition: fields.addition,
    };

    try {
      const response = await api.post('/schedules', payload);
      setFields(response.data);
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitUpdate = async () => {
    const payload = {
      ...fields,
      createdAt: fields.createdAt,
      sheduleAt: fields.sheduleAt,
      discount: fields.discount,
      addition: fields.addition,
    };

    try {
      const response = await api.put(`/schedules/${isEditing}`, payload);
      setFields(response.data);
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isEditing) {
    } // busca dados da API
  }, []);

  const handleToggleShowDate = () => setShowDate(!showDate);

  const handleToggleSwitch = () => setChecked((previousState) => !previousState);

  const handleToggleVisible = () => setVisible(!visible);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Block flex style={styles.group}>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE, paddingTop: 50 }}>
          <CustomInput placeholder="Pesquise um cliente pelo nome" labelText="Cliente" />
        </Block>

        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <CustomInput placeholder="Pesquise um serviço pelo nome" labelText="Serviço" />
        </Block>

        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <CustomInput placeholder="Pesquise um funcionário pelo nome" labelText="Funcionário" />
        </Block>

        <Block flex row style={styles.wraperTime}>
          <Block flex>
            <Text>Data</Text>
            <Button onPress={handleToggleShowDate} style={styles.buttonDate}>
              <Text> {selected || 'Selecionar data'} </Text>
            </Button>
          </Block>
          <Block flex>
            <Text>Horário</Text>
            <Button onPress={() => showMode('time')} style={styles.buttonDate}>
              <Text> {text || 'Selecione um horário'} </Text>
            </Button>
            {show && (
              <DateTimePicker
                value={time}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}
          </Block>
        </Block>
      </Block>

      <Block flex style={styles.group}>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Block row right>
            <Switch
              value={checked}
              onChange={handleToggleSwitch}
              trackColor={{ false: theme.COLORS.HEADER, true: theme.COLORS.HEADER }}
            />
            <Text
              style={{ fontFamily: 'montserrat-regular', paddingBottom: 15, paddingHorizontal: 10 }}
              size={14}
              color={nowTheme.COLORS.TEXT}
            >
              Sessão de pacote
            </Text>
          </Block>
        </Block>
      </Block>
      <Config />
      <Block style={styles.container}>
        <Button
          textStyle={{ fontFamily: 'montserrat-regular', fontSize: 12 }}
          color="default"
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          Voltar
        </Button>
        <Button
          textStyle={{ fontFamily: 'montserrat-regular', fontSize: 12 }}
          color="success"
          style={styles.button}
        >
          Cadastrar
        </Button>
      </Block>

      <Modal
        title="Selecione uma data"
        isVisible={showDate}
        onRequestClose={() => {
          setShowDate(!showDate);
        }}
      >
        <Calendar
          onDayPress={(day) => {
            setSelected(day.dateString);
            handleToggleShowDate();
          }}
          markedDates={{
            [selected]: {
              selected: true,
              disableTouchEvent: true,
              selectedDotColor: 'blue',
            },
          }}
        />
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wraperTime: {
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    gap: 30,
  },
  title: {
    fontFamily: 'montserrat-bold',
    paddingBottom: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
    marginTop: 44,
    color: nowTheme.COLORS.HEADER,
  },
  group: {
    // paddingTop: theme.SIZES.BASE * 2,
  },
  button: {
    marginBottom: theme.SIZES.BASE,
    width: 100,
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: 2,
    fontFamily: 'montserrat-regular',
  },
  buttonDate: {
    borderRadius: 30,
    borderColor: nowTheme.COLORS.BORDER,
    backgroundColor: '#FFFFFF',
    borderStyle: 'solid',
    borderWidth: 1,
    marginLeft: 0,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.SIZES.BASE,
  },
  selectHour: {
    borderRadius: 30,
    borderColor: nowTheme.COLORS.BORDER,
    height: 20 + 'important',
    backgroundColor: '#FFFFFF',
    width: width * 0.1,
    marginBottom: 16,
  },
  optionsButton: {
    width: 'auto',
    height: 34,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});

export default SchedulesForm;
