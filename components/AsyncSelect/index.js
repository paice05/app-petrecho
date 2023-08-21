import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'galio-framework';
import { Dropdown } from 'react-native-element-dropdown';

import { api } from '../../services/api';
import { nowTheme } from '../../constants';
import { useDebounce } from '../hooks/useDebounce';
import IconExtra from '../Icon';

export function AsyncSelect({ path, query = {}, labelText, placeholder, onChange, value, icon }) {
  const [items, setItems] = useState([]);
  const [textName, setTextName] = useState('');

  const debouncedValue = useDebounce(textName);

  useEffect(() => {
    if (debouncedValue) {
      api
        .request()
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
      <Text bold style={{ marginLeft: 20, marginBottom: 5 }}>
        {labelText}
      </Text>
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
        renderLeftIcon={() => (
          <IconExtra
            size={16}
            color={nowTheme.COLORS.PRIMARY}
            name={icon}
            family="feather"
            style={styles.icon}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingBottom: 16,
  },
  icon: {
    marginRight: 10,
  },
  dropdown: {
    borderRadius: 30,
    borderWidth: 1,
    borderColor: nowTheme.COLORS.BORDER,
    height: 44,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
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
    fontSize: 14,
    color: 'gray',
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 14,
  },
});
