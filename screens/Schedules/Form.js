import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Dimensions } from 'react-native';

// Galio components
import { Block, Button as GaButton, theme } from 'galio-framework';

// Now UI themed components
import { nowTheme } from '../../constants';
import { Button, Select, Icon, Input, Header, Switch } from '../../components';
import CustomInput from '../../components/CustomInput';
import { CustomSelectBottom } from '../../components/CustomSelectBottom';

const { width } = Dimensions.get('screen');

const SchedulesForm = ({ route, navigation }) => {
  const params = route.params;

  const isEditing = params?.itemId;

  useEffect(() => {
    if (isEditing) {
    } // busca dados da API
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Block flex style={styles.group}>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE, paddingTop: 70 }}>
          <CustomInput placeholder="Pesquise um cliente pelo nome" labelText="Cliente" />
        </Block>

        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <CustomInput placeholder="Pesquise um serviço pelo nome" labelText="Serviço" />
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

export default SchedulesForm;
