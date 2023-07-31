import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import CardReportEntry from '../../components/CardReportEntry';

const EntryReport = ({ navigation }) => {
  return (
    <ScrollView showsVerticalScrollIndicator={true} contentContainerStyle={styles.card}>
      <CardReportEntry data={'28/07/23'} servico={'Corte + Barba'} name={'Alexandre Barbosa'} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 8,
  },
});

export default EntryReport;
