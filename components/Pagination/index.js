import React, { useState } from 'react';

import { Block, Button as GButton } from 'galio-framework';
import { StyleSheet } from 'react-native';

const Button = ({ label }) => {
  return (
    <GButton textStyle={{ fontSize: 10 }} small center style={styles.optionsButton}>
      {label}
    </GButton>
  );
};

export const Pagination = ({ total = 50, perPage = 5 }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handleNextPage = () => {
    setCurrentPage((prevState) => prevState + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage == 1) return;

    setCurrentPage((prevState) => prevState - 1);
  };

  return (
    <Block row center>
      <Button label={'1'} />
      <Button label={'2'} />
      <Button label={'3'} />
      <Button label={'4'} />
      <Button label={'5'} />
    </Block>
  );
};

const styles = StyleSheet.create({
  optionsButton: {
    width: 'auto',
    height: 34,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});
