import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';

import CardClient from '../../components/CardClient';

import { PaginationSimple } from '../../components/PaginationSimple';
import { Filters } from './Filters';

const Clients = ({ navigation }) => {
  return (
    <ScrollView showsVerticalScrollIndicator={true} contentContainerStyle={styles.card}>
      <Filters />

      <CardClient
        navigation={navigation}
        id={1}
        nome="Alexandre Barbosa"
        telefone="14 99103-8089"
        aniversario="Dezembro"
      />
      <CardClient
        navigation={navigation}
        id={2}
        nome="Matheus Paice"
        telefone="14 99802-2422"
        aniversario="Novembro"
      />
      <CardClient
        navigation={navigation}
        id={3}
        nome="Ana Maria Braga da Silva Junior"
        telefone="14 99103-8089"
        aniversario="Dezembro"
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

export default Clients;
