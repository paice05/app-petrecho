import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Dimensions } from 'react-native';

// Galio components
import { Block, Text, theme } from 'galio-framework';

// Now UI themed components
import { nowTheme } from '../../constants';
import { Button, Icon } from '../../components';
import CustomInput from '../../components/CustomInput';
import { api } from '../../services/api';
import { useValidateRequiredFields } from '../../components/hooks/useValidateRequiredFields';

const RegisterExitForm = ({ navigation }) => {
  const [fields, setFields] = useState({
    description: '',
    value: '',
  });

  const { validate, errors } = useValidateRequiredFields({
    fields: ['description', 'value'],
  });

  useEffect(() => {
    validate(fields);
  }, [fields]);

  const handleSubmitRegister = async () => {
    if (Object.values(errors).filter(Boolean).length) return;

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
        <Block>
          <Block>
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
            {errors?.['description'] && (
              <Text center size={14} color={nowTheme.COLORS.PRIMARY}>
                campo obrigatório
              </Text>
            )}
          </Block>

          <Block>
            <CustomInput
              placeholder="Digite o valor da saída"
              labelText="Valor"
              value={fields.value.toString()}
              onChangeText={(item) => setFields({ ...fields, value: item })}
              iconContent={
                <Icon size={16} name="dollar-sign" family="feather" style={styles.inputIcons} />
              }
            />
            {errors?.['value'] && (
              <Text center size={14} color={nowTheme.COLORS.PRIMARY}>
                campo obrigatório
              </Text>
            )}
          </Block>
        </Block>

        <Block style={styles.wrapperButtons}>
          <Button
            textStyle={{
              fontFamily: 'montserrat-regular',
              fontSize: 16,
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
              fontSize: 16,
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
    borderRadius: 10,
    backgroundColor: '#fff',
  },
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
    marginBottom: theme.SIZES.BASE,
    borderRadius: 10,
    width: 120,
    height: 40,
    backgroundColor: nowTheme.COLORS.PRIMARY,
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
