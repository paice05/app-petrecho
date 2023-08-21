import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Dimensions } from 'react-native';

// Galio components
import { Block, theme } from 'galio-framework';

// Now UI themed components
import { nowTheme } from '../../constants';
import { Button, Icon } from '../../components';
import CustomInput from '../../components/CustomInput';
import { api } from '../../services/api';
import Theme from '../../constants/Theme';

const { width } = Dimensions.get('screen');

const ServiceForm = ({ route, navigation }) => {
  const params = route.params;

  const isEditing = params?.itemId;

  const [fields, setFields] = useState({
    name: '',
    price: '',
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
    <ScrollView showsVerticalScrollIndicator={true}>
      <Block flex style={styles.cardContainer}>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <CustomInput
            placeholder="Digite o nome do serviço"
            labelText="Nome"
            value={fields.name}
            onChangeText={(value) => setFields({ ...fields, name: value })}
            iconContent={
              <Icon
                size={16}
                color="#ADB5BD"
                name="file-text"
                family="feather"
                style={styles.inputIcons}
              />
            }
          />
        </Block>

        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <CustomInput
            placeholder="Digite o valor do serviço"
            labelText="Valor"
            value={fields.price.toString()}
            onChangeText={(value) => setFields({ ...fields, price: value })}
            iconContent={
              <Icon
                size={16}
                color="#ADB5BD"
                name="dollar-sign"
                family="feather"
                style={styles.inputIcons}
              />
            }
          />
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
  cardContainer: {
    padding: 12,
    margin: 15,
    paddingBottom: 25,
    borderRadius: 10,
    marginBottom: 16,
    backgroundColor: '#fff',
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
    paddingTop: 15,
  },
  inputIcons: {
    marginRight: 12,
    color: nowTheme.COLORS.ICON_INPUT,
  },
});

export default ServiceForm;
