import { Block, Text } from 'galio-framework';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { MultiSelect } from 'react-native-element-dropdown';
import { api } from '../../services/api';
import { nowTheme } from '../../constants';
import { useDebounce } from '../hooks/useDebounce';

export function AsyncSelectMulti({ path, query = {}, labelText, placeholder, onChange, value }) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [items, setItems] = useState([]);
  const [textName, setTextName] = useState('');

  const debouncedValue = useDebounce(textName);

  useEffect(() => {
    if (debouncedValue) {
      api
        .get(path, {
          params: {
            where: {
              name: { $iLike: `%${debouncedValue}%` },
              ...query,
            },
          },
        })
        .then(({ data }) => {
          setItems(data.data.map((item) => ({ value: item.id, label: item.name })));
        });
    }
  }, [debouncedValue]);

  const handleChangeName = (text) => {
    setTextName(text);
  };

  return (
    <Block>
      <Text>{labelText}</Text>

      <MultiSelect
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        selectedStyle={styles.selectedStyle}
        search
        data={items}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        searchPlaceholder="Pesquise um registro"
        value={value}
        onChange={(item) => {
          onChange(item);
        }}
        onChangeText={handleChangeName}
      />
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 16,
  },
});
