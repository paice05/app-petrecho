import React, { useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { theme, Card, Block, Text, Button as GaButton } from 'galio-framework';

import { nowTheme } from '../../constants';
import { Modal } from '../Modal';
import Icon from '../Icon';

const { height, width } = Dimensions.get('window');

const CardClient = ({ navigation, nome, telefone, aniversario, id }) => {
  const [visible, setVisible] = useState(false);

  const handleToggleVisible = () => setVisible(!visible);

  const cardContainer = [styles.card, styles.shadow];

  const isLargeName = nome.length > 20;

  const handleDelete = () => {
    // chamar a API
    // talvez precise fazer um reload dos clientes de novo

    handleToggleVisible()
  }

  return (
    <Block flex space="between" style={styles.container}>
      <Block style={styles.wraper}>
        <Text style={styles.cardTitle}>
          {nome.slice(0, 20)}
          {isLargeName ? '...' : ''}
        </Text>

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
              navigation.navigate('ClientForm', {
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

      <Block flex>
        <Block row>
          <Icon family="feather" name="smartphone" />
          <Text style={styles.cardSubtitle}>{telefone}</Text>
        </Block>
        <Block row>
          <Icon family="feather" name="calendar" />
          <Text style={styles.cardSubtitle}>{aniversario}</Text>
        </Block>
      </Block>

      <Modal
        title="Deseja remover esse cliente?"
        isVisible={visible}
        handleConfirm={handleDelete}
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

export default CardClient;
