import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Block, theme, Text, Card } from 'galio-framework';

import articles from '../constants/articles';
import { nowTheme } from '../constants';
const { width } = Dimensions.get('screen');

class Clients extends React.Component {
  renderClients = () => {
    return (
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.articles}>
        <Block flex>
          <Card
            flex
            borderless
            style={styles.card}
            title="Alexandre Barbosa"
            caption="14 99103-8089"
            location="Bauru, SP"
          />
        </Block>
      </ScrollView>
    );
  };

  render() {
    return (
      <Block flex center style={styles.clients}>
        {this.renderClients()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  clients: {
    width: width,
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: 2,
    fontFamily: 'montserrat-regular',
  },
  card: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
    marginBottom: 4,
  },
});

export default Clients;
