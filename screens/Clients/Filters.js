import { Block, theme } from 'galio-framework';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Button, Icon } from '../../components';
import CustomInput from '../../components/CustomInput';
import { CustomSelectBottom } from '../../components/CustomSelectBottom';

export const Filters = ({ fetchClients }) => {
  const [show, setShow] = useState(false);

  const [fields, setFields] = useState({
    name: '',
  });

  const handleToggleShow = () => setShow(!show);

  const handleSubmitFilter = () => {
    fetchClients({
      where: {
        ...(fields?.name && { name: { $like: `%${fields.name}%` } }),
      },
    });

    setShow(false);
  };

  return (
    <Block>
      <TouchableOpacity onPress={handleToggleShow}>
        <Block style={show ? styles.containerOpen : styles.containerClose} row>
          <Block row style={{ gap: 5 }}>
            <Icon name="filter" family="feather" size={15} color={'black'} />
            <Text> Filtros </Text>
            <Text style={styles.count}> 1 </Text>
          </Block>

          <Icon
            name="chevron-down"
            family="feather"
            size={15}
            color={'black'}
            style={show ? styles.iconRotate : {}}
          />
        </Block>
      </TouchableOpacity>

      {show && (
        <Block>
          <CustomInput
            value={fields.name}
            onChangeText={(value) => setFields({ ...fields, name: value })}
            labelText="Nome"
            placeholder="Digite o nome do cliente"
          />

          <CustomSelectBottom
            labelText="Mês de aniversário"
            placeholder="Escolha um mês"
            options={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',
            ]}
          />

          <CustomSelectBottom
            labelText="Tipo de cliente"
            placeholder="Escolha um tipo"
            options={['Cliente', 'Funcionário']}
          />

          <Block style={styles.wrapper}>
            <Button
              textStyle={{ fontFamily: 'montserrat-regular', fontSize: 12 }}
              color="default"
              style={styles.button}
            >
              Limpar
            </Button>
            <Button
              textStyle={{ fontFamily: 'montserrat-regular', fontSize: 12 }}
              color="primary"
              style={styles.button}
              onPress={handleSubmitFilter}
            >
              Filtrar
            </Button>
          </Block>
        </Block>
      )}
    </Block>
  );
};

const styles = StyleSheet.create({
  containerOpen: {
    justifyContent: 'space-between',
  },
  containerClose: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  iconRotate: {
    transform: 'rotate(180deg)',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingHorizontal: theme.SIZES.BASE,
  },
  button: {
    marginBottom: theme.SIZES.BASE,
    width: 100,
  },
  count: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 20,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#666eee',
  },
});
