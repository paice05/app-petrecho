import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Dimensions } from 'react-native';

// Galio components
import { Block, Text, theme } from 'galio-framework';

// Now UI themed components
import { nowTheme } from '../../constants';
import { Button, Icon } from '../../components';
import CustomInput from '../../components/CustomInput';
import { api } from '../../services/api';

const { width } = Dimensions.get('screen');

const RegisterExitForm = ({ navigation }) => {
  const [fields, setFields] = useState({
    description: '',
    value: '',
  });

  const handleSubmitRegister = async () => {
    try {
      await api.request().post('/reports/register-out', fields);
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Block flex gap={10} style={styles.cardContainer}>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <CustomInput
            placeholder="Digite a descrição"
            style={[styles.inputStyle]}
            labelText="Descrição"
            value={fields.description}
            onChangeText={(value) => setFields({ ...fields, description: value })}
            iconContent={
              <Icon size={16} name="file-text" family="feather" style={styles.inputIcons} />
            }
          />

          <CustomInput
            placeholder="Digite o valor da saída"
            labelText="Valor"
            value={fields.value.toString()}
            onChangeText={(item) => setFields({ ...fields, value: item })}
            iconContent={
              <Icon size={16} name="dollar-sign" family="feather" style={styles.inputIcons} />
            }
          />
        </Block>

        <Block style={styles.wrapperButtons}>
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
            onPress={handleSubmitRegister}
          >
            Cadastrar
          </Button>
        </Block>
      </Block>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: 'montserrat-bold',
    padding: 8,
    paddingHorizontal: 18,
    marginTop: 20,
    color: nowTheme.COLORS.BORDER_COLOR,
    borderRadius: 4,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#00acc1',
    backgroundColor: '#00acc1',
  },
  cardContainer: {
    padding: 10,
    margin: 15,
    //paddingBottom: 25,
    borderRadius: 10,
    //marginBottom: 16,
    backgroundColor: '#fff',
  },
  button: {
    marginBottom: theme.SIZES.BASE,
    borderRadius: 10,
    width: 120,
    height: 40,
    backgroundColor: '#eee',
  },
  primary: {
    marginBottom: theme.SIZES.BASE,
    borderRadius: 10,
    width: 120,
    height: 40,
    backgroundColor: '#c84648',
  },
  wrapperButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.SIZES.BASE,
    marginTop: 15,
  },
  inputIcons: {
    marginRight: 12,
    color: nowTheme.COLORS.PRIMARY,
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 21.5,
  },
});

export default RegisterExitForm;
