import React, { useState } from 'react';
import { StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { theme, Card, Block, Text, Button } from 'galio-framework';

import { nowTheme } from '../../constants';
import { Modal } from '../Modal';
import Icon from '../Icon';

const { height, width } = Dimensions.get('window');

const CardSchedule = ({
  navigation,
  nome,
  servico,
  dia,
  horario,
  id,
  status,
  onFinished,
  onCanceled,
}) => {
  const isLargeName = nome?.length > 20;

  const statusText = {
    pending: 'Pendente',
    finished: 'Finalizado',
    canceled: 'Cancelado',
  };

  return (
    <Block flex space="between" style={styles.container}>
      <Block gap={5} style={styles.wrapperName}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ScheduleForm', {
              itemId: id,
            })
          }
        >
          <Text style={{ textDecorationLine: 'underline' }}>
            {nome?.slice(0, 20)}
            {isLargeName ? '...' : ''}
          </Text>
        </TouchableOpacity>
        <Text color="gray">{servico}</Text>
      </Block>
      <Block row style={styles.wrapperInfo}>
        <Block row gap={5}>
          <Icon color="#c84648" name="calendar" family="feather" />
          <Text bold size={12}>
            {dia}
          </Text>
        </Block>

        <Block row gap={5}>
          <Icon color="#c84648" name="clock" family="feather" />
          <Text bold size={12}>
            {horario}
          </Text>
        </Block>

        <Block row gap={5}>
          <Icon color="#c84648" name="check-circle" family="feather" />
          <Text bold size={12}>
            {statusText[status] || 'Não definido'}
          </Text>
        </Block>
      </Block>

      {status === 'pending' && (
        <Block row style={styles.wrapperButtons}>
          <Button onPress={onCanceled} style={styles.button}>
            <Text bold size={12}>
              Cancelar
            </Text>
          </Button>
          <Button onPress={onFinished} style={[styles.button, styles.primary]}>
            <Text color="white" bold size={12}>
              Confirmar
            </Text>
          </Button>
        </Block>
      )}
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  wrapperName: {
    paddingBottom: 20,
  },
  wrapperInfo: {
    justifyContent: 'center',
    gap: 25,
  },
  wrapperButtons: {
    justifyContent: 'center',
    gap: 15,
  },

  button: {
    borderRadius: 10,
    width: 100,
    height: 35,
    backgroundColor: '#eee',
  },
  primary: {
    backgroundColor: '#c84648',
  },
});

export default CardSchedule;
