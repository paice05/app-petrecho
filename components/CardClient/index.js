import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Block, Text } from 'galio-framework';

import { nowTheme } from '../../constants';

import Icon from '../Icon';
import Menu from '../Menu';

const CardClient = ({ navigation, id, nome, tipo, telefone, aniversario, onDeleted }) => {
  const isLargeName = nome.length > 20;

  return (
    <Block flex space="between" style={styles.container}>
      <Block row space="between">
        <Block gap={5} style={styles.wrapperName}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ClientForm', {
                itemId: id,
              })
            }
          >
            <Text style={{ textDecorationLine: 'underline' }}>
              {nome?.slice(0, 20)}
              {isLargeName ? '...' : ''}
            </Text>
          </TouchableOpacity>
          <Text color="gray">{tipo}</Text>
        </Block>

        <Menu
          items={[
            {
              onSelect: () =>
                navigation.navigate('ClientForm', {
                  itemId: id,
                }),
              text: 'Editar',
            },
            {
              onSelect: onDeleted,
              text: 'Deletar',
            },
          ]}
        />
      </Block>

      <Block row style={styles.wrapperInfo}>
        <Block row gap={5}>
          <Icon color={nowTheme.COLORS.PRIMARY} name="phone" family="feather" />
          <Text bold size={12}>
            {telefone}
          </Text>
        </Block>

        <Block row gap={5}>
          <Icon color={nowTheme.COLORS.PRIMARY} name="calendar" family="feather" />
          <Text bold size={12}>
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
