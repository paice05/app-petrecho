import React from 'react';
import { StyleSheet, TouchableOpacity, Vibration } from 'react-native';
import { Block, Text, Button } from 'galio-framework';

import { nowTheme } from '../../constants';

import Icon from '../Icon';
import Menu from '../Menu';

const CardSchedule = ({
  navigation,
  id,
  nome,
  funcionario,
  servico,
  dia,
  horario,
  status,
  pacote,
  onFinished,
  onCanceled,
  onDeleted,
  onRevert,
}) => {
  const isLargeName = nome?.length > 30;

  const statusText = {
    pending: 'Pendente',
    finished: 'Finalizado',
    canceled: 'Cancelado',
  };

  const icon = {
    pending: 'alert-circle',
    finished: 'check-circle',
    canceled: 'x-circle',
  };

  return (
    <Block flex space="between" style={styles.container}>
      <Block row space="between">
        <Block gap={5} style={styles.wrapperName}>
          <TouchableOpacity
            onPress={() => {
              const vibrationDuration = 100;

              // Faz o dispositivo vibrar
              Vibration.vibrate(vibrationDuration);

              navigation.navigate('ScheduleForm', {
                itemId: id,
              });
            }}
          >
            <Block row style={{ alignItems: 'center' }}>
              <Text size={18} style={{ textDecorationLine: 'underline' }}>
                {nome?.slice(0, 30)}
                {isLargeName ? '...' : ''}
              </Text>
              {pacote ? (
                <Text color="gray" size={12}>
                  {' '}
                  (pacote)
                </Text>
              ) : null}
            </Block>
          </TouchableOpacity>
          <Text size={16} color="gray">
            {servico}
          </Text>
        </Block>

        <Block>
          <Menu
            items={[
              {
                onSelect: () =>
                  navigation.navigate('ScheduleForm', {
                    itemId: id,
                  }),
                text: 'Editar',
                icon: 'edit',
                color: nowTheme.COLORS.SWITCH_ON,
              },
              {
                onSelect: onDeleted,
                text: 'Deletar',
                icon: 'trash-2',
                color: nowTheme.COLORS.PRIMARY,
              },
              {
                onSelect: onRevert,
                text: 'Restaurar',
                icon: 'refresh-cw',
                color: nowTheme.COLORS.INFO,
                disable: status === 'pending',
              },
            ]}
          />
        </Block>
      </Block>
      <Block row style={styles.wrapperInfo}>
        <Block row gap={5} style={styles.actionIcon}>
          <Icon color={nowTheme.COLORS.PRIMARY} name="calendar" family="feather" />
          <Text bold size={14}>
            {dia}
          </Text>
        </Block>

        <Block row gap={5} style={styles.actionIcon}>
          <Icon color={nowTheme.COLORS.PRIMARY} name="clock" family="feather" />
          <Text bold size={14}>
            {horario}
          </Text>
        </Block>

        <Block row gap={5} style={styles.actionIcon}>
          <Icon color={nowTheme.COLORS.PRIMARY} name={icon[status] || ''} family="feather" />
          <Text bold size={14}>
            {statusText[status] || 'Não definido'}
          </Text>
        </Block>
      </Block>

      {status === 'pending' && (
        <Block row style={styles.wrapperButtons}>
          <Button onPress={onCanceled} style={styles.button}>
            <Text bold size={16}>
              Cancelar
            </Text>
          </Button>
          <Button onPress={onFinished} style={[styles.button, styles.primary]}>
            <Text color="white" bold size={16}>
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
    backgroundColor: nowTheme.COLORS.PRIMARY,
  },
  actionIcon: {
    alignItems: 'center',
  },
});

export default CardSchedule;
