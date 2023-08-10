import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Block, Text, Button as GaButton } from 'galio-framework';

import Menu from '../Menu';

const CardService = ({ navigation, id, nome, valor, onDeleted }) => {
  const isLargeName = nome.length > 20;

  return (
    <Block flex space="between" style={styles.container}>
      <Block row space="between">
        <Block gap={5} style={styles.wrapperName}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ServiceForm', {
                itemId: id,
              })
            }
          >
            <Text style={{ textDecorationLine: 'underline' }}>
              {nome?.slice(0, 20)}
              {isLargeName ? '...' : ''}
            </Text>
          </TouchableOpacity>
          <Text color="gray">R$ {Number(valor).toFixed(2).replace('.', ',')}</Text>
        </Block>
        <Menu
          items={[
            {
              onSelect: () =>
                navigation.navigate('ServiceForm', {
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
});

export default CardService;
