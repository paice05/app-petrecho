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

  const [fields, setFields] = useState({
    user: null,
    services: [], // value label
    employee: null,
    date: formartDate(new Date(), 'dd-MM-yyyy'),
    time: new Date(),
    discount: 0,
    addition: 0,
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
            time: new Date(response.data.scheduleAt),
            isPackage: response.data.isPackage,
            discount:
              Number(response.data.discount).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                currencyDisplay: 'symbol',
              }) || null,
            addition:
              Number(response.data.addition).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                currencyDisplay: 'symbol',
              }) || null,
          });
        } catch (error) {
          console.log(error);
        }
      };

      fetchSchedule();
    } // busca dados da API
  }, []);

  const handleSubmitCreate = async () => {
    console.log({ fields });

    const [day, month, year] = fields.date.split('-');

    const scheduleAt = new Date(`${year}-${month}-${day} ${formartDate(fields.time, 'HH:mm')}:00`);
    const discount = fields.discount.toString().replace('R$', '').replace(',', '.');
    const addition = fields.addition.toString().replace('R$', '').replace(',', '.');

    const payload = {
      ...fields,
      services: fields.services.map((item) => item.value),
      scheduleAt,
      userId: fields.user.value,
      employeeId: fields.employee.value,
      discount,
      addition,
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

    const scheduleAt = new Date(`${year}-${month}-${day} ${formartDate(fields.time, 'HH:mm')}:00`);
    const discount = fields?.discount.replace('R$', '').replace(',', '.');
    const addition = fields?.addition.replace('R$', '').replace(',', '.');

    const payload = {
      ...fields,
      services: fields.services.map((item) => item.value),
      scheduleAt,
      userId: fields.user.value,
      employeeId: fields.employee.value,
      discount,
      addition,
    };

    try {
      await api.request().put(`/schedules/${isEditing}`, payload);
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggleShowDate = () => setShowDate(!showDate);

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
          <Block flex={1} style={{ paddingHorizontal: 20 }}>
            {fields?.services?.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    setFields({
                      ...fields,
                      services: fields.services.filter((service) => service.value !== item.value),
                    })
                  }
                  style={{ flex: 1 }}
                >
                  <Block
                    row
                    gap={5}
                    style={{
                      paddingBottom: 7,
                      paddingRight: 15,
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
          </Block>
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
                <Text size={14}>{fields.date}</Text>
              </Block>
            </TouchableOpacity>
          </Block>
          <Block flex={1}>
            <Text bold style={{ marginLeft: 20, marginBottom: 5 }}>
              Horário
            </Text>

            <DateTimePicker
              value={fields.time}
              onChange={(time) => setFields({ ...fields, time })}
            />
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
            sessão de pacote
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

  buttonDate: {
    borderRadius: 30,
    borderWidth: 1,
    borderColor: nowTheme.COLORS.BORDER,
    height: 44,
    backgroundColor: '#FFFFFF',
    padding: 12,
  },
});

export default SchedulesForm;
