import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
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
      <Block style={styles.wraper}>
        <Text style={styles.cardTitle}>
          {nome.slice(0, 20)}
          {isLargeName ? '...' : ''}
        </Text>

        <Text style={styles.cardTitle}>{valor}</Text>

        <Block row>
          <GaButton
            round
            onlyIcon
            shadowless
            icon="edit"
            iconFamily="Font-Awesome"
            iconColor={theme.COLORS.WHITE}
            iconSize={theme.SIZES.BASE * 0.8}
            color={nowTheme.COLORS.SUCCESS}
            style={[styles.social]}
            onPress={() =>
              navigation.navigate('ServiceForm', {
                itemId: id,
              })
            }
          />

          <GaButton
            round
            onlyIcon
            shadowless
            icon="trash"
            iconFamily="Font-Awesome"
            iconColor={theme.COLORS.WHITE}
            iconSize={theme.SIZES.BASE * 0.8}
            color={nowTheme.COLORS.ERROR}
            style={[styles.social]}
            onPress={handleToggleVisible}
          />
        </Block>
      </Block>

      <Modal
        title={`Deseja remover esse cliente? \n\n${nome}`}
        isVisible={visible}
        handleConfirm={handleSubmitDelete}
        handleCancel={handleToggleVisible}
      />
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.SIZES.BASE / 2,
    borderRadius: 4,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 16,
  },
  cardTitle: {
    paddingHorizontal: 9,
    paddingTop: 7,
    paddingBottom: 15,
    fontSize: 18,
    fontFamily: 'montserrat-regular',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: nowTheme.COLORS.PRIMARY,
  },
  cardSubtitle: {
    paddingHorizontal: 9,
    fontSize: 14,
    fontFamily: 'montserrat-regular',
    color: nowTheme.COLORS.BLACK,
  },
  wraper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default CardService;