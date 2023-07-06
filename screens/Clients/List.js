import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';

import CardClient from '../../components/CardClient';

import { PaginationSimple } from '../../components/PaginationSimple';
import { Filters } from './Filters';
import { api } from '../../services/api';

const Clients = ({ navigation }) => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fecthClients = async () => {
      try {
        const response = await api.get('/users');

        setClients(response.data.data);
      } catch (error) {
        console.log({ error });
      }
    };

    fecthClients();
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={true} contentContainerStyle={styles.card}>
      <Filters />

      {clients.map((item) => {
        return (
          <CardClient
            navigation={navigation}
            id={1}
            nome={item.name}
            telefone={item.cellPhone}
            aniversario={item.birthDate}
          />
        );
      })}
      <PaginationSimple />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 8,
  },
});

export default Clients;
