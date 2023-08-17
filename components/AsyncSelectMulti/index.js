import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'galio-framework';
import { MultiSelect } from 'react-native-element-dropdown';

import { nowTheme } from '../../constants';
import { useDebounce } from '../hooks/useDebounce';
import { api } from '../../services/api';
import IconExtra from '../Icon';

export function AsyncSelectMulti({
  path,
  query = {},
  labelText,
  placeholder,
  onChange,
  value,
  icon,
}) {
  const [selectedItems, setSelectedItems] = useState([]);
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

  const handleChangeName = (text) => {
    setTextName(text);
  };

  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.selectedTextStyle}>{item.label}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text bold style={{ marginLeft: 20, marginBottom: 5 }}>
        {labelText}
      </Text>

      <MultiSelect
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        search
        data={items}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        searchPlaceholder="Pesquise um registro..."
        value={value}
        onChange={(item) => {
          const id = item[item.length - 1];
          onChange(items.find((item) => item.value === id));
        }}
        onChangeText={handleChangeName}
        selectedStyle={styles.selectedStyle}
        renderItem={renderItem}
        renderSelectedItem={(item, unSelect) => <Text> </Text>}
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
    fontSize: 16,
  },

  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: 'white',
    shadowColor: '#000',
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 16,
  },
});
