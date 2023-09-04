import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const TopServicesList = ({ data, renderItem }) => {
  return (
    <View style={styles.container}>
      <FlatList data={data} renderItem={renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
});

export default TopServicesList;
