import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Dimensions } from 'react-native';

// Galio components
import { Block, Text, Button as GaButton, theme } from 'galio-framework';

// Now UI themed components
import { Images, nowTheme, articles, tabs } from '../../constants';
import { Button, Select, Icon, Input, Header, Switch } from '../../components';
import CustomInput from '../../components/CustomInput';
import { CustomSelectBottom } from '../../components/CustomSelectBottom';
import { api } from '../../services/api';

const { width } = Dimensions.get('screen');

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

const optionsBirthDate = [
  { title: 'Janeiro', data: 'Janeiro' },
  { title: 'Fevereiro', data: 'Fevereiro' },
  { title: 'Março', data: 'Março' },
  { title: 'Abril', data: 'Abril' },
  { title: 'Maio', data: 'Maio' },
  { title: 'Junho', data: 'Junho' },
  { title: 'Julho', data: 'Julho' },
  { title: 'Agosto', data: 'Agosto' },
  { title: 'Setembro', data: 'Setembro' },
  { title: 'Outubro', data: 'Outubro' },
  { title: 'Novembro', data: 'Novembro' },
  { title: 'Dezembro', data: 'Dezembro' },
];

const ClientForm = ({ route, navigation }) => {
  const params = route.params;

  const isEditing = params?.itemId;

  const [fields, setFields] = useState({
    name: '',
    cellPhone: '',
    birthDate: { title: '', data: '' },
    type: { title: '', data: '' },
  });

  const handleSubmitCreate = async () => {
    const payload = {
      ...fields,
      type: fields.type.data,
      birthDate: fields.birthDate.data,
    };

    try {
      const response = await api.post('/users', payload);
     
      setFields(response.data);
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitUpdate = async () => {
    const payload = {
      ...fields,
      type: fields?.type?.data,
      birthDate: fields?.birthDate?.data,
    };

    try {
      const response = await api.put(`/users/${isEditing}`, payload);
     
      setFields(response.data);
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isEditing) {
      const fecthClients = async () => {
        try {
          const response = await api.get(`/users/${isEditing}`);

          setFields({
            ...fields,
            name: response.data.name,
            cellPhone: response.data.cellPhone,
            birthDate: optionsBirthDate.find((item) => item.data === response.data.birthDate),
            type: optionsType.find((item) => item.data === response.data.type),
          });
        } catch (error) {
          console.log(error);
        }
      };

      fecthClients();
    } // busca dados da API
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Block flex style={styles.group}>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE, paddingTop: 70 }}>
          <CustomInput
            placeholder="Digite seu nome"
            labelText="Nome"
            value={fields.name}
            onChangeText={(value) => setFields({ ...fields, name: value })}
          />
        </Block>

        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <CustomInput
            placeholder="Digite o telefone do cliente"
            labelText="Telefone"
            value={fields.cellPhone}
            onChangeText={(value) => setFields({ ...fields, cellPhone: value })}
          />
        </Block>

        <Block flex center style={{ marginTop: 8 }}>
          <CustomSelectBottom
            labelText="Mês de aniversário"
            placeholder="Escolha um mês"
            value={fields.birthDate}
            onChange={(item) => setFields({ ...fields, birthDate: item })}
            options={optionsBirthDate}
          />
        </Block>

        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <CustomSelectBottom
            labelText="Tipo de cliente"
            placeholder="Escolha um tipo"
            value={fields.type}
            onChange={(item) => setFields({ ...fields, type: item })}
            options={optionsType}
          />
        </Block>
      </Block>

      <Block style={styles.container}>
        <Button
          textStyle={{ fontFamily: 'montserrat-regular', fontSize: 12 }}
          color="default"
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          Voltar
        </Button>
        <Button
          textStyle={{ fontFamily: 'montserrat-regular', fontSize: 12 }}
          color="success"
          style={styles.button}
          onPress={isEditing ? handleSubmitUpdate : handleSubmitCreate}
        >
          {isEditing ? 'Editar' : 'Cadastrar'}
        </Button>
      </Block>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: 'montserrat-bold',
    paddingBottom: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
    marginTop: 44,
    color: nowTheme.COLORS.HEADER,
  },
  group: {
    paddingTop: theme.SIZES.BASE * 2,
  },
  button: {
    marginBottom: theme.SIZES.BASE,
    width: 100,
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: 2,
    fontFamily: 'montserrat-regular',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.SIZES.BASE,
  },
});

export default ClientForm;
