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
import { optionsBirthDate } from '../../constants/month';
import Theme from '../../constants/Theme';

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

const ClientForm = ({ route, navigation }) => {
  const params = route.params;

  const isEditing = params?.itemId;

  const [fields, setFields] = useState({
    name: '',
    cellPhone: '',
    birthDate: { title: '', data: '' },
    type: isEditing ? { title: '', data: '' } : { title: 'Cliente', data: 'pf' },
  });

  const handleSubmitCreate = async () => {
    const payload = {
      ...fields,
      type: fields.type.data,
      birthDate: fields.birthDate.data,
    };

    try {
      const response = await api.request().post('/users', payload);

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
      const response = await api.request().put(`/users/${isEditing}`, payload);

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
          const response = await api.request().get(`/users/${isEditing}`);

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
    <ScrollView showsVerticalScrollIndicator={true}>
      <Block flex style={styles.cardContainer}>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <CustomInput
            placeholder="Digite seu nome"
            labelText="Nome"
            value={fields.name}
            onChangeText={(value) => setFields({ ...fields, name: value })}
            iconContent={
              <Icon
                size={16}
                color="#ABD5BD"
                name="user"
                family="feather"
                style={styles.inputIcons}
              />
            }
          />
        </Block>

        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <CustomInput
            placeholder="Digite o telefone do cliente"
            labelText="Telefone"
            value={fields.cellPhone}
            onChangeText={(value) => setFields({ ...fields, cellPhone: value })}
            iconContent={
              <Icon
                size={16}
                color="#ABD5BD"
                name="phone"
                family="feather"
                style={styles.inputIcons}
              />
            }
          />
        </Block>

        <Block flex center style={{ marginTop: 8 }}>
          <Text style={styles.styleLabelText}>Mês de aniversário</Text>
          <CustomSelectBottom
            //labelText="Mês de aniversário"
            placeholder="Escolha um mês"
            value={fields.birthDate}
            onChange={(item) => setFields({ ...fields, birthDate: item })}
            options={optionsBirthDate}
            textStyle={{ fontSize: 14, marginLeft: 10 }}
          />
        </Block>

        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Text style={styles.styleLabelText}>Tipo de cliente</Text>
          <CustomSelectBottom
            //labelText="Tipo de cliente"
            placeholder="Escolha um tipo"
            value={fields.type}
            onChange={(item) => setFields({ ...fields, type: item })}
            options={optionsType}
            textStyle={{ fontSize: 14, marginLeft: 10 }}
          />
        </Block>
      </Block>

      <Block style={styles.container}>
        <Button
          textStyle={{
            fontFamily: 'montserrat-regular',
            fontSize: 12,
            fontWeight: 'bold',
            color: 'black',
          }}
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          Voltar
        </Button>
        <Button
          textStyle={{
            fontFamily: 'montserrat-regular',
            fontSize: 12,
            color: 'white',
            fontWeight: 'bold',
          }}
          style={styles.primary}
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
    // marginTop: 44,
    color: nowTheme.COLORS.HEADER,
  },
  button: {
    marginBottom: theme.SIZES.BASE,
    borderRadius: 10,
    width: 120,
    height: 40,
    backgroundColor: '#eee',
    borderWidth: 1,
    borderColor: Theme.COLORS.BORDER,
  },
  primary: {
    marginBottom: theme.SIZES.BASE,
    borderRadius: 10,
    width: 120,
    height: 40,
    backgroundColor: '#c84648',
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
  cardContainer: {
    padding: 12,
    margin: 15,
    paddingBottom: 25,
    borderRadius: 10,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  inputIcons: {
    marginRight: 12,
    color: nowTheme.COLORS.ICON_INPUT,
  },
  styleLabelText: {
    fontSize: 14,
    alignSelf: 'flex-start',
    marginLeft: 16,
    fontWeight: 500,
    marginBottom: -6,
  },
});

export default ClientForm;
