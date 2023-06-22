import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Block, theme, Text } from 'galio-framework';

import { Card, Button } from '../components';
import articles from '../constants/articles';
const { width } = Dimensions.get('screen');

class Clients extends React.Component {
  renderClients = () => {
    return (
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.articles}>
        <Block flex>
          <Card item={articles[7]} horizontal />
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
});

export default Clients;
