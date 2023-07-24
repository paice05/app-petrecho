import { Block, Text } from 'galio-framework';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
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

  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.selectedTextStyle}>{item.label}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text>{labelText}</Text>

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
  placeholderStyle: {
    fontSize: 16,
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
  icon: {
    marginRight: 5,
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