import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { theme, Card, Block, Text, Button as GaButton } from 'galio-framework';

import { nowTheme } from '../../constants';

const { height, width } = Dimensions.get('window');

const CardClient = ({ nome, telefone, aniversario }) => {
  const cardContainer = [styles.card, styles.shadow];

  const isLargeName = nome.length > 20;

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
            iconSize={theme.SIZES.BASE * 0.5}
            color={nowTheme.COLORS.SUCCESS}
            style={[styles.social]}
          />

          <GaButton
            round
            onlyIcon
            shadowless
            icon="trash"
            iconFamily="Font-Awesome"
            iconColor={theme.COLORS.WHITE}
            iconSize={theme.SIZES.BASE * 0.5}
            color={nowTheme.COLORS.ERROR}
            style={[styles.social]}
          />
        </Block>
      </Block>

      <Block flex>
        <Text style={styles.cardSubtitle}>{telefone}</Text>
        <Text style={styles.cardSubtitle}>{aniversario}</Text>
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.SIZES.BASE / 2,
    borderRadius: 8,
    borderStyle: 'solid',
    borderWidth: 2,
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
    color: nowTheme.COLORS.ICON,
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
