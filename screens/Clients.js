import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';

import CardClient from '../components/CardClient';

import { PaginationSimple } from '../components/PaginationSimple';

const Clients = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={true} contentContainerStyle={styles.card}>
      <CardClient nome="Alexandre Barbosa" telefone="14 99103-8089" aniversario="Dezembro" />
      <CardClient nome="Matheus Paice" telefone="14 99802-2422" aniversario="Novembro" />
      <CardClient
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
