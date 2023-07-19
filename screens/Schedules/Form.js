import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Dimensions, TouchableOpacity, Platform, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AntDesign from '@expo/vector-icons/AntDesign';

// Galio components
import { Block, Button as GaButton, Text, theme, Switch } from 'galio-framework';

// Now UI themed components
import { nowTheme } from '../../constants';
import { Button, Select, Icon, Input, Header } from '../../components';
import CustomInput from '../../components/CustomInput';
import { CustomSelectHour } from '../../components/CustonSelectHour';
import { Modal } from '../../components/Modal';
import { Config } from './Config';
import { AsyncSelect } from '../../components/AsyncSelect';
import { DateTimePicker } from '../../components/DatePiker';
import { api } from '../../services/api';
import { AsyncSelectMulti } from '../../components/AsyncSelectMulti';

const { width } = Dimensions.get('screen');

const SchedulesForm = ({ route, navigation }) => {
  const params = route.params;

  const isEditing = params?.itemId;

  const [selected, setSelected] = useState('');
  const [showDate, setShowDate] = useState(false);
  const [visible, setVisible] = useState(false);

  const [timePicker, setTimePicker] = useState(false);

  const showTimePicker = () => {
    setTimePicker(true);
  };

  const [fields, setFields] = useState({
    userId: '',
    services: [],
    employeeId: '',
    date: null,
    time: null,
    discount: 0,
    addition: 0,
    isPackage: false,
  });

  const handleSubmitCreate = async () => {
    const scheduleAt = new Date(`${fields.date} ${fields.time}:00`);

    const payload = {
      ...fields,
      services: fields.services.map((item) => item.value),
      scheduleAt,
    };

    try {
      await api.post('/schedules', payload);
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
  const handleToggleVisible = () => setVisible(!visible);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Block flex style={styles.group}>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE, paddingTop: 80 }}>
          <AsyncSelect
            path="/users"
            query={{ type: 'pf' }}
            placeholder="Pesquise um cliente pelo nome"
            labelText="Cliente"
            onChange={(item) => item && setFields({ ...fields, userId: item.value })}
          />
        </Block>

        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <AsyncSelectMulti
            isMulti
            path="/services"
            placeholder="Pesquise um serviço pelo nome"
            labelText="Serviços"
            value={fields.services}
            onChange={(item) => {
              setFields({ ...fields, services: [...fields.services, item] });
            }}
          />
        </Block>
        <Block>
          {fields.services.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  setFields({
                    ...fields,
                    services: fields.services.filter((service) => service.value !== item.value),
                  })
                }
              >
                <View style={styles.selectedStyle}>
                  <Text style={styles.textSelectedStyle}>{item?.label}</Text>
                  <AntDesign color="black" name="delete" size={17} />
                </View>
              </TouchableOpacity>
            );
          })}
        </Block>

        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <AsyncSelect
            path="/users"
            query={{ type: 'pj' }}
            placeholder="Pesquise um funcionário pelo nome"
            labelText="Funcionário"
            onChange={(item) => item && setFields({ ...fields, employeeId: item.value })}
          />
        </Block>

        <Block flex row style={styles.wraperTime}>
          <Block flex>
            <Text>Data</Text>
            <Button onPress={handleToggleShowDate} style={styles.buttonDate}>
              <Text> {fields.date || 'Selecionar data'} </Text>
            </Button>
          </Block>
          <Block flex>
            <Text>Horário</Text>
            {!timePicker && (
              <View style={{ margin: 10 }}>
                <Button
                  title="Selecione um horário"
                  style={styles.selectHour}
                  onPress={showTimePicker}
                >
                  <Text style={{ color: 'black' }}>{fields.time || 'Selecione um horário'}</Text>
                </Button>
              </View>
            )}
            {timePicker && (
              <DateTimePicker
                onChange={(value) => {
                  setFields({ ...fields, time: value });
                  setTimePicker(false);
                }}
              />
            )}
          </Block>
        </Block>
      </Block>

      <Block flex style={styles.group}>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Block row right>
            <Switch
              value={fields.isPackage}
              onChange={() => setFields({ ...fields, isPackage: !fields.isPackage })}
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
      <Config setFields={setFields} fields={fields} />
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
          onPress={isEditing ? handleSubmitUpdate : handleSubmitCreate}
        >
          {isEditing ? 'Editar' : 'Cadastrar'}
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
          onDayPress={(value) => {
            const [year, month, day] = value.dateString.split('-');

            setFields({ ...fields, date: `${day}-${month}-${year}` });
            setSelected(value.dateString);
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
    backgroundColor: '#FFFFFF',
    borderStyle: 'solid',
    borderWidth: 1,
    marginLeft: -9,
    marginTop: -2,
    marginBottom: 16,
  },
  optionsButton: {
    width: 'auto',
    height: 34,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  selectedStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: 'white',
    shadowColor: '#000',
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 16,
  },
});

export default SchedulesForm;
