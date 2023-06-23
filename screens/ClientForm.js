import React from 'react';
import { ScrollView, StyleSheet, Dimensions } from 'react-native';

// Galio components
import { Block, Text, Button as GaButton, theme } from 'galio-framework';

// Now UI themed components
import { Images, nowTheme, articles, tabs } from '../constants';
import { Button, Select, Icon, Input, Header, Switch } from '../components';
import CustomInput from '../components/CustomInput';

const { width } = Dimensions.get('screen');

const ClientForm = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Block flex style={styles.group}>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE, paddingTop: 50 }}>
          <CustomInput placeholder="Digite seu nome" labelText="Nome" />
        </Block>

        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <CustomInput placeholder="Digite o telefone do cliente" labelText="Telefone" />
        </Block>

        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <CustomInput
            placeholder="Escolha o mês de aniversáio"
            labelText="Mês de aniversário"
            options={['Janeiro', 'Fevereiro', 'Março']}
          />
        </Block>

        <Block flex center style={{ marginTop: 8 }}>
          <Select
            labelText="Mês de aniversário"
            defaultIndex={''}
            options={['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio']}
          />
        </Block>

        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <CustomInput placeholder="Escolha um tipo" labelText="Tipo de cliente" />
        </Block>
      </Block>
      <Block flex>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Button
            textStyle={{ fontFamily: 'montserrat-regular', fontSize: 12 }}
            color="default"
            style={styles.button}
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
});

export default ClientForm;
