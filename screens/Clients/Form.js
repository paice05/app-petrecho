import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Dimensions } from 'react-native';

// Galio components
import { Block, Text, theme } from 'galio-framework';

// Now UI themed components
import { Button, Icon } from '../../components';
import CustomInput from '../../components/CustomInput';
import { CustomSelectBottom } from '../../components/CustomSelectBottom';
import { useValidateRequiredFields } from '../../components/hooks/useValidateRequiredFields';
import { api } from '../../services/api';
import { optionsBirthDate } from '../../constants/month';
import { nowTheme } from '../../constants';
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

  const { validate, errors } = useValidateRequiredFields({
    fields: ['name'],
  });

  useEffect(() => {
    validate(fields);
  }, [fields]);

  const handleSubmitCreate = async () => {
    if (Object.values(errors).filter(Boolean).length) return;

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
    if (Object.values(errors).filter(Boolean).length) return;

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
      <Block flex gap={10} style={styles.cardContainer}>
        <Block>
          <CustomInput
            placeholder="Digite seu nome"
            labelText="Nome"
            value={fields.name}
            onChangeText={(value) => setFields({ ...fields, name: value })}
            iconContent={<Icon size={16} name="user" family="feather" style={styles.inputIcons} />}
          />
          {errors?.['name'] && (
            <Text center size={12} color={nowTheme.COLORS.PRIMARY}>
              campo obrigatório
            </Text>
          )}
        </Block>

        <CustomInput
          placeholder="Digite o telefone do cliente"
          labelText="Telefone"
          value={fields.cellPhone}
          onChangeText={(value) => setFields({ ...fields, cellPhone: value })}
          iconContent={<Icon size={16} name="phone" family="feather" style={styles.inputIcons} />}
        />

        <Block gap={-12} marginBottom={8}>
          <Text style={styles.styleLabelText}>Mês de aniversário</Text>
          <CustomSelectBottom
            placeholder="Escolha um mês"
            value={fields.birthDate}
            onChange={(item) => setFields({ ...fields, birthDate: item })}
            options={optionsBirthDate}
          />
        </Block>

        <Block gap={-12} marginBottom={10}>
          <Text style={styles.styleLabelText}>Tipo de cliente</Text>
          <CustomSelectBottom
            placeholder="Escolha um tipo"
            value={fields.type}
            onChange={(item) => setFields({ ...fields, type: item })}
            options={optionsType}
          />
        </Block>

        <Block row center style={styles.buttonContainer}>
          <Button style={styles.button} onPress={() => navigation.goBack()}>
            <Text bold>Voltar</Text>
          </Button>
          <Button
            style={styles.primary}
            onPress={isEditing ? handleSubmitUpdate : handleSubmitCreate}
          >
            <Text bold color="#fff">
              {isEditing ? 'Editar' : 'Cadastrar'}
            </Text>
          </Button>
        </Block>
      </Block>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  button: {
    marginBottom: nowTheme.SIZES.BASE,
    borderRadius: 10,
    width: 120,
    height: 40,
    backgroundColor: '#eee',
    borderWidth: 1,
    borderColor: nowTheme.COLORS.BORDER,
  },
  primary: {
    marginBottom: nowTheme.SIZES.BASE,
    borderRadius: 10,
    width: 120,
    height: 40,
    backgroundColor: nowTheme.COLORS.PRIMARY,
  },
  buttonContainer: {
    paddingHorizontal: nowTheme.SIZES.BASE,
  },
  cardContainer: {
    margin: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 10,
  },
  inputIcons: {
    marginRight: 12,
    color: nowTheme.COLORS.PRIMARY,
  },
  styleLabelText: {
    fontSize: 14,
    alignSelf: 'flex-start',
    marginLeft: 22,
    fontWeight: 'bold',
  },
});

export default ClientForm;
