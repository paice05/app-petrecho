import React, { useState } from 'react';
import { StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { theme, Card, Block, Text, Button as GaButton, Button } from 'galio-framework';

import { nowTheme } from '../../constants';
import { Modal } from '../Modal';
import Icon from '../Icon';

const { height, width } = Dimensions.get('window');

const CardSchedule = ({
  navigation,
  nome,
  servico,
  horario,
  id,
  status,
  onFinished,
  onCanceled,
}) => {
  const isLargeName = nome?.length > 20;

  return (
    <Block
      flex
      space="between"
      style={{
        ...styles.container,
        ...(status === 'finished'
          ? { borderColor: nowTheme.COLORS.SUCCESS }
          : status === 'canceled'
          ? { borderColor: nowTheme.COLORS.ERROR }
          : { borderColor: nowTheme.COLORS.TUMBLR }),
      }}
    >
      <Block style={styles.wraper}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ScheduleForm', {
              itemId: id,
            })
          }
        >
          <Text style={styles.cardTitle}>
            {nome?.slice(0, 20)}
            {isLargeName ? '...' : ''}
          </Text>
        </TouchableOpacity>

        <Block row>
          <Icon family="feather" name="clock" />
          <Text style={styles.wraperHour}>{horario}</Text>
        </Block>
      </Block>

      <Block flex>
        <Block row>
          <Icon family="feather" name="scissors" style={{ marginTop: -10 }} />
          <Text style={styles.cardSubtitle}>{servico}</Text>
        </Block>
      </Block>
      <Block style={styles.containerButton}>
        <Button
          textStyle={{
            fontFamily: 'montserrat-regular',
            fontSize: 12,
            color: nowTheme.COLORS.BEHANCE,
          }}
          color={nowTheme.COLORS.WHITE}
          style={styles.buttonCancel}
          onPress={onCanceled}
        >
          Cancelado
        </Button>
        <Button
          textStyle={{ fontFamily: 'montserrat-regular', fontSize: 12 }}
          color="info"
          style={styles.buttonConfirm}
          onPress={onFinished}
        >
          Concluído
        </Button>
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.SIZES.BASE / 2,
    borderRadius: 4,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: nowTheme.COLORS.TUMBLR,
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
    color: nowTheme.COLORS.BEHANCE,
  },
  cardSubtitle: {
    paddingHorizontal: 9,
    fontSize: 14,
    fontFamily: 'montserrat-regular',
    color: nowTheme.COLORS.BLACK,
    marginTop: -12,
  },
  wraperHour: {
    paddingHorizontal: 9,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'montserrat-regular',
    color: nowTheme.COLORS.BLACK,
    marginTop: -5,
  },
  wraper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.SIZES.BASE,
    marginTop: 10,
    marginBottom: -15,
  },
  buttonConfirm: {
    marginBottom: theme.SIZES.BASE,
    width: 100,
  },
  buttonCancel: {
    marginBottom: theme.SIZES.BASE,
    width: 100,
    borderRadius: 4,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: nowTheme.COLORS.MUTED,
  },
  buttonEdit: {
    marginBottom: theme.SIZES.BASE,
    width: 100,
    borderRadius: 4,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: nowTheme.COLORS.WHITE,
    backgroundColor: nowTheme.COLORS.BORDER,
  },
});

export default CardSchedule;
