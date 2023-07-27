import react from 'react';

import { Block, Button as GButton } from 'galio-framework';
import { StyleSheet, Text } from 'react-native';

const status = {
  pending: 'Pendente',
  finished: 'Finalizado',
  canceled: 'Cancelado',
};

export const ScheduleList = ({ item, changeStatus }) => {
  return (
    <Block>
      <Block>
        <Text>{status}:</Text>
        <Text
          style={
            item.status === 'canceled'
              ? { color: '#f44336', fontWeight: 'bold' }
              : item.status === 'finished'
              ? { color: '#4caf50', fontWeight: 'bold' }
              : { fontWeight: 'bold' }
          }
        >
          {status[item.status] || 'Nenhum'}
        </Text>
      </Block>
      <Block>
        {item.status === 'pending' && (
          <>
            <GButton color="sucess" onPress={() => changeStatus(item.id, { status: 'finished' })}>
              Confirmar
            </GButton>
            <GButton color="danger" onPress={() => changeStatus(item.id, { status: ' canceled' })}>
              Cancelar
            </GButton>
          </>
        )}
      </Block>
    </Block>
  );
};
