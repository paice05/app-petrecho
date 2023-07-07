import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';

import CardClient from '../../components/CardClient';

import { PaginationSimple } from '../../components/PaginationSimple';
import { Filters } from './Filters';
import { api } from '../../services/api';

const Clients = ({ navigation }) => {
  const [clients, setClients] = useState([]);

  const [pagination, setPagination] = useState({
    currentPage: 0,
    total: 0,
    lastPage: 0,
  });

  const fetchClients = (params) => {
    console.log(params)

    api
      .get('/users', {
        params,
      })
      .then(({ data }) => {

        console.log({ data });

        setPagination({
          currentPage: data.currentPage,
          lastPage: data.lastPage,
          total: data.total,
        });
        setClients(data.data);
      });
  };

  useEffect(() => {
    navigation.addListener('focus', () => {
      fetchClients({});
    });
  }, []);

  const handleNextPage = () => {
    if (pagination.currentPage === pagination.lastPage) return;

    fetchClients({ page: pagination.currentPage + 1 });
  };

  const handlePreviousPage = () => {
    if (pagination.currentPage === 1) return;

    fetchClients({ page: pagination.currentPage - 1 });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={true} contentContainerStyle={styles.card}>
      <Filters fetchClients={fetchClients} />

      {clients.map((item) => {
        return (
          <CardClient
            navigation={navigation}
            id={item.id}
            nome={item.name}
            telefone={item.cellPhone}
            aniversario={item.birthDate}
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 8,
  },
});

export default Clients;
