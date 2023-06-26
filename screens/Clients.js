import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Block, theme, Text, Card } from 'galio-framework';

import CardClient from '../components/CardClient';
const { width } = Dimensions.get('screen');

const Clients = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={true} contentContainerStyle={styles.card}>
      <CardClient nome="Alexandre Barbosa" telefone="14 99103-8089" aniversario="Dezembro" />
      <CardClient nome="Alexandre Barbosa" telefone="14 99103-8089" aniversario="Dezembro" />
      <CardClient nome="Alexandre Barbosa" telefone="14 99103-8089" aniversario="Dezembro" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: 3,
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE * 3,
    minHeight: 114,
    marginBottom: 10,
    marginLeft: 20,
  },
});

export default Clients;
