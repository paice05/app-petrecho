import React, { useEffect, useState } from 'react';
import { Block, Text } from 'galio-framework';
import { format } from 'date-fns';
import { StyleSheet, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';

import { api } from '../../services/api';
import CardSchedule from '../../components/CardSchedule';
import { PaginationSimple } from '../../components/PaginationSimple';
import { Modal } from '../../components/Modal';
import Tabs from '../../components/Tabs';
import { Calendar } from '../../components/Calendar';
import { nowTheme, tabs } from '../../constants';

export const ScheduleList = ({ navigation }) => {
  const [openCalendar, setOpenCalendar] = useState(false);
  const [date, setDate] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [hasClean, setHasClean] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const defaultTab = tabs.week[new Date().getDay()].id;

  const [pagination, setPagination] = useState({
    currentPage: 0,
    total: 0,
    lastPage: 0,
  });

  const fetchSchedules = (params = {}) => {
    setIsLoading(true);

    api
      .get('/schedules', {
        params,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(({ data }) => {
        setPagination({
          currentPage: data.currentPage,
          lastPage: data.lastPage,
          total: data.total,
        });
        setSchedules(data);
        setIsLoading(false);
      })
      .catch((error) => console.log({ error }));
  };

  navigation.addListener('focus', () => {
    setHasClean(!hasClean);
    fetchSchedules({});
  });

  const handleDelete = (id) => {
    try {
      api.delete(`/schedules/${id}`).then(() => {
        setSchedules(schedules.filter((item) => item.id !== id));
      });
    } catch (error) {
      console.error('Ocorreu um erro na requisição:', error);
    }
  };

  const handleNextPage = () => {
    if (pagination.currentPage === pagination.lastPage) return;

    fetchSchedules({ page: pagination.currentPage + 1 });
  };

  const handlePreviousPage = () => {
    if (pagination.currentPage === 1) return;

    fetchSchedules({ page: pagination.currentPage - 1 });
  };

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
      <Block>
        {isLoading ? (
          <ActivityIndicator size="large" colo="#0000ff" />
        ) : (
          <Block>
            {schedules.length === 0 && (
              <Text center style={{ marginTop: 20, marginBottom: 20 }}>
                Nenhum registro encontrado
              </Text>
            )}

            {schedules.map((item) => {
              return (
                <CardSchedule
                  navigation={navigation}
                  nome={item.user.name}
                  servico={item.services?.map((service) => service?.name).join(',')}
                  horario={format(new Date(item.scheduleAt), 'HH:mm')}
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
