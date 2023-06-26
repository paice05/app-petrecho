import React from 'react';
import { StyleSheet } from 'react-native';
import { theme, Card, Block, Text } from 'galio-framework';

import { nowTheme } from '../../constants';

const CardClient = ({ nome, telefone, aniversario }) => {
  const cardContainer = [styles.card, styles.shadow];
  return (
    <Block card flex style={styles.card}>
      <Block flex space="between" style={styles.cardDescription}>
        <Block flex>
          <Text style={styles.cardTitle}>{nome}</Text>
          <Block flex>
            <Text style={styles.cardSubtitle}>{telefone}</Text>
          </Block>
          <Block flex>
            <Text style={styles.cardSubtitle}>{aniversario}</Text>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: theme.SIZES.BASE,
    backgroundColor: nowTheme.COLORS.BEHANCE,
    borderRadius: 8,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: 'black',
    minHeight: 114,
    marginBottom: 4,
    height: 120,
    width: 370,
    bor,
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2,
    borderRadius: 8,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: 'black',
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
    paddingTop: 7,
    paddingBottom: 15,
    fontSize: 32,
    fontFamily: 'montserrat-regular',
    color: nowTheme.COLORS.BLACK,
  },
  shadow: {
    shadowColor: '#8898AA',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});

export default CardClient;
