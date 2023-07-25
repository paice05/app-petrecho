import { Block, Text } from 'galio-framework';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { Dropdown } from 'react-native-element-dropdown';
import { api } from '../../services/api';
import { nowTheme } from '../../constants';
import { useDebounce } from '../hooks/useDebounce';

export function AsyncSelect({ path, query = {}, labelText, placeholder, onChange, value }) {
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

  useEffect(() => {
    if (value) setItems([value]);
  }, [value]);

  const handleChangeName = (text) => {
    setTextName(text);
  };

  return (
    <View style={styles.container}>
      <Text>{labelText}</Text>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={items}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        searchPlaceholder="Pesquisar um registro"
        onChange={(item) => onChange(item)}
        onChangeText={handleChangeName}
        value={value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 16,
  },
  dropdown: {
    height: 44,
    backgroundColor: '#FFFFFF',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    borderRadius: 30,
    borderColor: nowTheme.COLORS.BORDER,
    paddingHorizontal: 8,
    paddingLeft: 15,
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
});
