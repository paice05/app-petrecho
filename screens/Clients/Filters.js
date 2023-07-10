import { Block, theme } from 'galio-framework';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Button, Icon } from '../../components';
import CustomInput from '../../components/CustomInput';
import { CustomSelectBottom } from '../../components/CustomSelectBottom';

const initialFields = {
  name: '',
  type: { title: '', data: '' },
};

const optionsType = [
  {
    title: 'Cliente',
    data: 'pf',
  },
  {
    title: 'Funcionário',
    data: 'pj',
  },
];

export const Filters = ({ fetchClients, hasClean }) => {
  const [show, setShow] = useState(false);

  const [fields, setFields] = useState(initialFields);

  const handleToggleShow = () => setShow(!show);

  const handleSubmitFilter = () => {
    fetchClients({
      where: {
        ...(fields?.name && { name: { $iLike: `%${fields.name}%` } }),
        ...(fields?.type?.data && { type: { $iLike: `%${fields.type.data}%` } }),
      },
    });

    setShow(false);
  };

  const handleClearFields = () => {
    setFields(initialFields);
  };

  useEffect(() => {
    handleClearFields();
  }, [hasClean]);

  const countFieldsPopulate = Object.values(fields).filter((item) =>
    typeof item === 'object' ? item.data : item
  ).length;

  return (
    <Block>
      <TouchableOpacity onPress={handleToggleShow}>
        <Block style={show ? styles.containerOpen : styles.containerClose} row>
          <Block row style={{ gap: 5 }}>
            <Icon name="filter" family="feather" size={15} color={'black'} />
            <Text> Filtros </Text>
            <Text style={countFieldsPopulate > 0 ? styles.count : {}}>
              {' '}
              {countFieldsPopulate || ''}{' '}
            </Text>
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
            value={fields.type}
            onChange={(item) => setFields({ ...fields, type: item })}
            options={optionsType}
          />

          <Block style={styles.wrapper}>
            <Button
              textStyle={{ fontFamily: 'montserrat-regular', fontSize: 12 }}
              color="default"
              style={styles.button}
              onPress={handleClearFields}
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
