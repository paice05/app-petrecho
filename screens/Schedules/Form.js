import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Block, Text, Switch } from 'galio-framework';

import { Button, Icon } from '../../components';
import { Modal } from '../../components/Modal';
import { AsyncSelect } from '../../components/AsyncSelect';
import { DateTimePicker } from '../../components/DatePiker';
import { AsyncSelectMulti } from '../../components/AsyncSelectMulti';
import { formartDate } from '../../utils/formartDate';
import { nowTheme } from '../../constants';
import { api } from '../../services/api';
import { Config } from './Config';

const { width } = Dimensions.get('screen');

const SchedulesForm = ({ route, navigation }) => {
  const params = route.params;

  const isEditing = params?.itemId;

  const [selected, setSelected] = useState('');
  const [showDate, setShowDate] = useState(false);
  const [timePicker, setTimePicker] = useState(false);

  const [fields, setFields] = useState({
    user: null,
    services: [], // value label
    employee: null,
    date: formartDate(new Date(), 'dd-MM-yyyy'),
    time: formartDate(new Date(), 'HH:mm'),
    discount: null,
    addition: null,
    isPackage: false,
  });

  useEffect(() => {
    if (isEditing) {
      const fetchSchedule = async () => {
        try {
          const response = await api.request().get(`/schedules/${isEditing}`);
          setFields({
            user: { value: response.data.user.id, label: response.data.user.name },
            services: response.data.services.map((item) => ({ value: item.id, label: item.name })),
            employee: { value: response.data.employee.id, label: response.data.employee.name },
            date: formartDate(response.data.scheduleAt, 'dd-MM-yyyy'),
            time: formartDate(response.data.scheduleAt, 'HH:mm'),
            discount: response.data.discount || null,
            addition: response.data.addition || null,
            isPackage: response.data.isPackage,
          });
        } catch (error) {
          console.log(error);
        }
      };

      fetchSchedule();
    } // busca dados da API
  }, []);

  const handleSubmitCreate = async () => {
    const [day, month, year] = fields.date.split('-');

    const scheduleAt = new Date(`${year}-${month}-${day} ${fields.time}:00`);

    const payload = {
      ...fields,
      services: fields.services.map((item) => item.value),
      scheduleAt,
      userId: fields.user.value,
      employeeId: fields.employee.value,
    };

    try {
      await api.request().post('/schedules', payload);
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitUpdate = async () => {
    const [day, month, year] = fields.date.split('-');

    const scheduleAt = new Date(`${year}-${month}-${day} ${fields.time}:00`);

    const payload = {
      ...fields,
      services: fields.services.map((item) => item.value),
      scheduleAt,
      userId: fields.user.value,
      employeeId: fields.employee.value,
    };

    try {
      await api.request().put(`/schedules/${isEditing}`, payload);
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggleShowDate = () => setShowDate(!showDate);
  const showTimePicker = () => {
    setTimePicker(true);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Block gap={15} flex style={styles.group}>
        <AsyncSelect
          path="/users"
          query={{ type: 'pf' }}
          placeholder="Pesquise um cliente"
          labelText="Cliente"
          onChange={(item) =>
            item && setFields({ ...fields, user: { value: item.value, label: item.label } })
          }
          value={fields.user}
          icon="user"
        />

        <AsyncSelectMulti
          isMulti
          path="/services"
          placeholder="Pesquise um serviço"
          labelText="Serviços"
          value={fields.services}
          onChange={(item) => {
            if (fields.services.some((service) => item.value === service.value)) return;

            setFields({ ...fields, services: [...fields.services, item] });
          }}
          icon="tool"
        />

        {fields?.services?.length > 0 && (
          <Text style={styles.selectedMulti}>
            {fields?.services?.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    setFields({
                      ...fields,
                      services: fields.services.filter((service) => service.value !== item.value),
                    })
                  }
                >
                  <Block
                    row
                    gap={5}
                    middle
                    style={{
                      margin: 5,
                      borderWidth: 1,
                      borderColor: 'gray',
                      padding: 5,
                      borderRadius: 5,
                    }}
                  >
                    <Text color="gray" size={14}>
                      {item?.label}
                    </Text>
                    <Icon
                      size={14}
                      color={nowTheme.COLORS.PRIMARY}
                      name="trash-2"
                      family="feather"
                    />
                  </Block>
                </TouchableOpacity>
              );
            })}
          </Text>
        )}

        <AsyncSelect
          path="/users"
          query={{ type: 'pj' }}
          placeholder="Pesquise um funcionário"
          labelText="Funcionário"
          onChange={(item) =>
            item && setFields({ ...fields, employee: { value: item.value, label: item.label } })
          }
          value={fields.employee}
          icon="user"
        />

        <Block row space="between" gap={10}>
          <Block flex={1}>
            <Text bold style={{ marginLeft: 20, marginBottom: 5 }}>
              Data
            </Text>
            <TouchableOpacity onPress={handleToggleShowDate} style={styles.buttonDate}>
              <Block row gap={10}>
                <Icon size={16} color={nowTheme.COLORS.PRIMARY} name="calendar" family="feather" />
                <Text size={14} color="gray">
                  {fields.date}
                </Text>
              </Block>
            </TouchableOpacity>
          </Block>
          <Block flex={1}>
            <Text bold style={{ marginLeft: 20, marginBottom: 5 }}>
              Horário
            </Text>
            {!timePicker && (
              <TouchableOpacity style={styles.buttonDate} onPress={showTimePicker}>
                <Block row gap={10}>
                  <Icon size={16} color={nowTheme.COLORS.PRIMARY} name="clock" family="feather" />
                  <Text size={14} color="gray">
                    {fields.time}
                  </Text>
                </Block>
              </TouchableOpacity>
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

        <Block row right>
          <Switch
            value={fields.isPackage}
            onChange={() => setFields({ ...fields, isPackage: !fields.isPackage })}
            trackColor={{ false: nowTheme.COLORS.HEADER, true: nowTheme.COLORS.PRIMARY }}
          />
          <Text
            style={{ paddingBottom: 15, paddingHorizontal: 10 }}
            size={14}
            color={nowTheme.COLORS.PRIMARY}
          >
            Sessão de pacote
          </Text>
        </Block>

        <Config setFields={setFields} fields={fields} />

        <Block row space="between">
          <Button style={styles.button} onPress={() => navigation.goBack()}>
            <Text bold>Voltar</Text>
          </Button>
          <Button
            style={styles.primary}
            onPress={isEditing ? handleSubmitUpdate : handleSubmitCreate}
          >
            <Text bold color="#fff">
              {isEditing ? 'Atualizar' : 'Cadastrar'}
            </Text>
          </Button>
        </Block>
      </Block>

      <Modal
        title="Selecione uma data"
        isVisible={showDate}
        onRequestClose={() => {
          setShowDate(!showDate);
        }}
        handleCancel={() => setShowDate(false)}
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
  title: {
    fontFamily: 'montserrat-bold',
    paddingBottom: nowTheme.SIZES.BASE,
    paddingHorizontal: nowTheme.SIZES.BASE * 2,
    marginTop: 44,
    color: nowTheme.COLORS.HEADER,
  },
  group: {
    margin: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 8,
  },
  button: {
    marginBottom: nowTheme.SIZES.BASE,
    borderRadius: 10,
    width: 120,
    height: 40,
    backgroundColor: '#eee',
  },
  primary: {
    marginBottom: nowTheme.SIZES.BASE,
    borderRadius: 10,
    width: 120,
    height: 40,
    backgroundColor: '#c84648',
  },
  articles: {
    width: width - nowTheme.SIZES.BASE * 2,
    paddingVertical: nowTheme.SIZES.BASE,
    paddingHorizontal: 2,
    fontFamily: 'montserrat-regular',
  },
  buttonDate: {
    borderRadius: 30,
    borderWidth: 1,
    borderColor: nowTheme.COLORS.BORDER,
    height: 44,
    backgroundColor: '#FFFFFF',
    padding: 12,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: nowTheme.SIZES.BASE,
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
  selectedMulti: {
    padding: 8,
  },
});

export default SchedulesForm;
