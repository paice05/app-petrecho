import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Dimensions } from 'react-native';

// Galio components
import { Block, Text, theme } from 'galio-framework';

// Now UI themed components
import { nowTheme } from '../../constants';
import { Button } from '../../components';
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
      <Block flex style={styles.group}>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE, paddingTop: 70 }}>
          <Text style={styles.title}>Preencha os dados do registro de saída</Text>
          <CustomInput
            placeholder="Digite a descrição"
            labelText="Descrição"
            value={fields.description}
            onChangeText={(value) => setFields({ ...fields, description: value })}
          />

          <CustomInput
            placeholder="Digite o valor da saída"
            labelText="Valor"
            value={fields.value?.toString()}
            onChangeText={(item) => setFields({ ...fields, value: item })}
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
          onPress={handleSubmitRegister}
        >
          Cadastrar
        </Button>
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
  button: {
    marginBottom: theme.SIZES.BASE,
    width: 100,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.SIZES.BASE,
  },
});

export default RegisterExitForm;
