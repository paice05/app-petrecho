import React from 'react';
import { StyleSheet, TouchableOpacity, Vibration } from 'react-native';
import { Block, Text } from 'galio-framework';

import { nowTheme } from '../../constants';

import Icon from '../Icon';
import Menu from '../Menu';
import { useUserContext } from '../../context/user';

const CardClient = ({ navigation, id, nome, tipo, telefone, aniversario, isAdmin, onDeleted }) => {
  const isLargeName = nome.length > 20;

  const { user } = useUserContext();

  const userIsAdmin = user.isAdmin;

  return (
    <Block flex space="between" style={styles.container}>
      <Block row space="between">
        <Block gap={5} style={styles.wrapperName}>
          <TouchableOpacity
            onPress={() => {
              const vibrationDuration = 100;

              // Faz o dispositivo vibrar
              Vibration.vibrate(vibrationDuration);

              if (!userIsAdmin && isAdmin) return;

              navigation.navigate('ClientForm', {
                itemId: id,
              });
            }}
          >
            <Text size={18} style={{ textDecorationLine: 'underline' }}>
              {nome?.slice(0, 20)}
              {isLargeName ? '...' : ''}
              {isAdmin ? (
                <Text color="gray" size={12}>
                  {' '}
                  (admin)
                </Text>
              ) : null}
            </Text>
          </TouchableOpacity>
          <Text size={16} color="gray">
            {tipo}
          </Text>
        </Block>
        <Menu
          items={[
            {
              onSelect: () =>
                navigation.navigate('ClientForm', {
                  itemId: id,
                }),
              text: 'Editar',
              icon: 'edit',
              color: nowTheme.COLORS.SWITCH_ON,
              disable: !userIsAdmin && isAdmin,
            },
            {
              onSelect: onDeleted,
              text: 'Deletar',
              icon: 'trash-2',
              color: nowTheme.COLORS.PRIMARY,
              disable: !userIsAdmin,
            },
          ]}
        />
      </Block>

      <Block row style={styles.wrapperInfo}>
        <Block row gap={5} style={{ alignItems: 'center' }}>
          <Icon size={18} color={nowTheme.COLORS.PRIMARY} name="phone" family="feather" />
          <Text size={16} bold>
            {telefone}
          </Text>
        </Block>

        <Block row gap={5} style={{ alignItems: 'center' }}>
          <Icon size={18} color={nowTheme.COLORS.PRIMARY} name="calendar" family="feather" />
          <Text size={16} bold>
            {aniversario}
          </Text>
        </Block>
      </Block>
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
});

export default CardClient;
