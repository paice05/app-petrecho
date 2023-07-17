import { Block, Text } from 'galio-framework';
import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';

import MultiSelect from 'react-native-multiple-select';
import { api } from '../../services/api';
import { nowTheme } from '../../constants';
import { useDebounce } from '../hooks/useDebounce';

export function AsyncSelect({
  path,
  query = {},
  labelText,
  placeholder,
  onChange,
  value = [],
  isMulti = false,
}) {
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
          console.log(data.data);
          setItems(data.data);
        });
    }
  }, [debouncedValue]);

  const handleChangeName = (text) => {
    setTextName(text);
  };

  useEffect(() => {
    onChange(selectedItems);
  }, [selectedItems]);

  return (
    <Block>
      <Text>{labelText}</Text>
      <MultiSelect
          hideTags
          items={items}
          uniqueKey="id"
          // ref={(component) => { this.multiSelect = component }}
          onSelectedItemsChange={(item) => {
            console.log({ item });
            if (isMulti) setSelectedItems([...selectedItems, item]);
            else setSelectedItems([item]);
          }}
          selectedItems={selectedItems}
          selectText={labelText}
          searchInputPlaceholderText={placeholder}
          onChangeInput={ (text)=> handleChangeName(text)}
          altFontFamily="ProximaNova-Light"
          noItemsText='Nenhum item encontrado'
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          displayKey="name"
          searchInputStyle={{ color: '#CCC' }}
          // submitButtonColor="#CCC"
          submitButtonText="Buscar"
          hideSubmitButton
        />

      
    </Block>
  );
}
