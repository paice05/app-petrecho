import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { theme, Card, Block, Text, Button as GaButton } from 'galio-framework';

import { nowTheme } from '../../constants';
import { Modal } from '../Modal';
import Icon from '../Icon';

const CardService = ({ navigation, nome, valor, id, handleDelete }) => {
  const [visible, setVisible] = useState(false);

  const handleToggleVisible = () => setVisible(!visible);

  const isLargeName = nome.length > 20;

  const handleSubmitDelete = () => {
    handleDelete(id);
    handleToggleVisible();
  };

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
        <TouchableOpacity style={styles.more}>
          <Icon size={12} color={nowTheme.COLORS.PRIMARY} name="more-vertical" family="feather" />
        </TouchableOpacity>
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
  more: {
    width: 25,
    height: 25,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: nowTheme.COLORS.PRIMARY,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
});

export default CardService;
