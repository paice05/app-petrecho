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
]

const ClientForm = ({ route, navigation }) => {
  const params = route.params;

  const isEditing = params?.itemId;

  const [fields, setFields] = useState({
    name: '',
    cellPhone: '',
    birthDate: null,
    type: { title: '', data: '' },
  });

  const handleSubmit = async () => {
    const payload = {
      ...fields,
      type: fields.type.data,
    };

    try {
      const response = await api.post('/users', payload);
      console.log(response.data);
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
            type: optionsType.find(item => item.data === response.data.type)
          });
        } catch (error) {
          console.log({ error });
        }
      };

      fecthClients();
    } // busca dados da API
  }, []);

  useEffect(() => {
    console.log({ fields });
  }, [fields]);

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
            onSelect={(item, index) => setFields({ ...fields, birthDate: item })}
            options={[]}
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
          onPress={handleSubmit}
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
