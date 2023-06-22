import React from 'react';
import { ScrollView, StyleSheet, Dimensions } from 'react-native';

// Galio components
import { Block, Text, Button as GaButton, theme } from 'galio-framework';

// Now UI themed components
import { Images, nowTheme, articles, tabs } from '../constants';
import { Button, Select, Icon, Input, Header, Switch } from '../components';

const { width } = Dimensions.get('screen');

class ClientForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkSelected: [],
      'switch-1': true,
      'switch-2': false,
    };
  }

  renderInputs = () => {
    return (
      <Block flex style={styles.group}>
        <Text size={16} style={styles.title}>
          Nome
        </Text>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Input
            primary={this.state.primaryFocus}
            right
            placeholder="Digite o nome do cliente"
            onFocus={() => this.setState({ primaryFocus: true })}
            onBlur={() => this.setState({ primaryFocus: false })}
            iconContent={<Block />}
            shadowless
          />
        </Block>
        <Text size={16} style={styles.title}>
          Telefone
        </Text>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Input
            primary={this.state.primaryFocus}
            right
            placeholder="Digite o telefone do cliente"
            onFocus={() => this.setState({ primaryFocus: true })}
            onBlur={() => this.setState({ primaryFocus: false })}
            iconContent={<Block />}
            shadowless
          />
        </Block>
        <Text size={16} style={styles.title}>
          Mês de aniversário
        </Text>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Input
            success={this.state.successFocus}
            right
            shadowless
            placeholder="Escolha o mês de aniversáio"
            onFocus={() => this.setState({ successFocus: true })}
            onBlur={() => this.setState({ successFocus: false })}
            iconContent={<Block />}
          />
        </Block>
        <Text size={16} style={styles.title}>
          Tipo de cliente
        </Text>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Input
            success={this.state.successFocus}
            right
            shadowless
            placeholder="Escolha um tipo"
            onFocus={() => this.setState({ successFocus: true })}
            onBlur={() => this.setState({ successFocus: false })}
            iconContent={<Block />}
          />
        </Block>
      </Block>
    );
  };

  renderButtons = () => {
    return (
      <Block flex>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Block center>
            <Button
              textStyle={{ fontFamily: 'montserrat-regular', fontSize: 12 }}
              color="success"
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
      </Block>
    );
  };

  render() {
    return (
      <Block flex center>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30, width }}
        >
          {this.renderInputs()}
          {this.renderButtons()}
        </ScrollView>
      </Block>
    );
  }
}

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
    width: width - theme.SIZES.BASE * 2,
  },
});

export default ClientForm;
