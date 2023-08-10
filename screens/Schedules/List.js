import React, { useCallback, useEffect, useState } from 'react';
import { Block, Button, Text } from 'galio-framework';
import { addDays, format, subDays } from 'date-fns';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Dimensions,
} from 'react-native';

import { api } from '../../services/api';
import CardSchedule from '../../components/CardSchedule';
import { PaginationSimple } from '../../components/PaginationSimple';
import { Modal } from '../../components/Modal';
import Tabs from '../../components/Tabs';
import { Calendar } from '../../components/Calendar';
import { nowTheme, tabs } from '../../constants';
import { useFocusEffect } from '@react-navigation/native';
import { useRequestFindMany } from '../../components/hooks/useRequestFindMany';
import { useRequestDestroy } from '../../components/hooks/useRequestDestroy';

const { width } = Dimensions.get('window');

const ScheduleList = ({ navigation }) => {
  const [openCalendar, setOpenCalendar] = useState(false);
  const [date, setDate] = useState(new Date());

  const [schedules, setSchedules] = useState([]);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    total: 0,
    lastPage: 0,
  });

  const {
    execute: findMany,
    response,
    loading,
  } = useRequestFindMany({
    path: '/schedules',
    defaultQuery: {
      page: pagination.currentPage,
      where: {
        scheduleAt: {
          $between: [
            new Date(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 00:00:00`),
            new Date(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 23:59:59`),
          ],
        },
      },
      order: [['scheduleAt', 'ASC']],
    },
  });
  const { execute: destroy } = useRequestDestroy({
    path: '/schedules',
    callbackSuccess: findMany,
  });

  useEffect(() => {
    if (response) {
      setPagination({
        currentPage: response.currentPage,
        lastPage: response.lastPage,
        total: response.total,
      });
      setSchedules(response.data);
    }
  }, [response]);

  const fetchChangeStatus = (id, payload) => {
    api
      .request()
      .put(`/schedules/${id}/status`, payload)
      .then(() => {
        findMany();
      });
  };

  useFocusEffect(
    useCallback(() => {
      findMany();
    }, [date])
  );

  const handleConfirmDelete = (id) =>
    Alert.alert('Cuidado', 'você deseja remover esse agendamento?', [
      {
        text: 'Cancelar',
        onPress: () => {},
        style: 'cancel',
      },
      { text: 'Confirmar', onPress: () => destroy(id) },
    ]);

  const handleNextPage = () => {
    if (pagination.currentPage === pagination.lastPage) return;

    findMany({ page: pagination.currentPage + 1 });
  };

  const handlePreviousPage = () => {
    if (pagination.currentPage === 1) return;

    findMany({ page: pagination.currentPage - 1 });
  };

  const handleFinished = (scheduleId) => {
    const payload = {
      status: 'finished',
    };

    fetchChangeStatus(scheduleId, payload);
  };
  const handleCanceled = (scheduleId) => {
    const payload = {
      status: 'canceled',
    };

    fetchChangeStatus(scheduleId, payload);
  };
  const handleRestore = (id) => {
    console.log('restore');

    api
      .request()
      .get(`/schedules/${id}/revert`)
      .then(() => {
        findMany();
      });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={true} contentContainerStyle={styles.card}>
      <TouchableOpacity style={styles.dateStyle} onPress={() => setOpenCalendar(true)}>
        <Text bold colo="#e6e6e6">
          {format(date, 'dd  MMMM YYY')}
        </Text>
      </TouchableOpacity>

      <Tabs
        data={tabs.week}
        selected={tabs.week[date.getDay()].id}
        onChange={(id) => {
          const currentDay = date.getDay();
          const result = currentDay - id;

          if (result > 0) setDate(subDays(date, result));
          if (result < 0) setDate(addDays(date, result * -1));
        }}
        date={date}
      />

      <Block>
        {loading ? (
          <ActivityIndicator size="large" colo="#0000ff" />
        ) : (
          <Block>
            {schedules.length === 0 && (
              <Text center style={{ marginTop: 20, marginBottom: 20 }}>
                Nenhum registro encontrado
              </Text>
            )}

            {schedules
              .sort((a, b) =>
                format(new Date(a.scheduleAt), 'HH:mm') > format(new Date(b.scheduleAt), 'HH:mm')
                  ? 1
                  : -1
              )
              .map((item) => {
                return (
                  <CardSchedule
                    key={item.id}
                    navigation={navigation}
                    id={item.id}
                    nome={item.user.name}
                    servico={item.services?.map((service) => service?.name).join(', ')}
                    horario={format(new Date(item.scheduleAt), 'HH:mm')}
                    dia={format(new Date(item.scheduleAt), 'dd/MM/YYY')}
                    status={item.status}
                    onFinished={() => handleFinished(item.id)}
                    onCanceled={() => handleCanceled(item.id)}
                    onDeleted={() => handleConfirmDelete(item.id)}
                    onRevert={() => handleRestore(item.id)}
                  />
                );
              })}
            <PaginationSimple
              currentPage={pagination.currentPage}
              total={pagination.total}
              lastPage={pagination.lastPage}
              handleNextPage={handleNextPage}
              handlePreviousPage={handlePreviousPage}
            />
          </Block>
        )}
      </Block>

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
    padding: 15,
    backgroundColor: '#eee',
  },

  dateStyle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#FFFFFF',
    paddingVertical: 5,
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

export default ScheduleList;
