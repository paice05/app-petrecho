import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Dimensions } from 'react-native';

// Galio components
import { Block, theme } from 'galio-framework';

// Now UI themed components
import { nowTheme } from '../../constants';
import { Button, S } from '../../components';
import CustomInput from '../../components/CustomInput';
import { api } from '../../services/api';

const { width } = Dimensions.get('screen');

const ServiceForm = ({ route, navigation }) => {
  const params = route.params;

  const isEditing = params?.itemId;

  const [fields, setFields] = useState({
    name: '',
    price: 0,
  });

  const handleSubmitCreate = async () => {
    try {
      await api.request().post('/services', fields);

      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitUpdate = async () => {
    try {
      await api.request().put(`/services/${isEditing}`, fields);

      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isEditing) {
      const fecthServices = async () => {
        try {
          const response = await api.request().get(`/services/${isEditing}`);

          setFields({
            name: response.data.name,
            price: response.data.price,
          });
        } catch (error) {
          console.log(error);
        }
      };

      fecthServices();
    } // busca dados da API
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Block flex style={styles.group}>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <CustomInput
            placeholder="Digite o nome do serviço"
            labelText="Nome"
            value={fields.name}
            onChangeText={(value) => setFields({ ...fields, name: value })}
          />
        </Block>

        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <CustomInput
            placeholder="Digite o valor do serviço"
            labelText="Valor"
            value={fields.price.toString()}
            onChangeText={(value) => setFields({ ...fields, price: value })}
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
    paddingTop: theme.SIZES.BASE * 4,
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

export default ServiceForm;
