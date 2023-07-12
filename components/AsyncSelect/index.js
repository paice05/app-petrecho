import { Block, Text } from 'galio-framework';
import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';

import SearchableDropDown from 'react-native-searchable-dropdown';
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
  const [selectedItems, setSelectedItems] = useState(null);
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
    console.log({ items });
  }, [items])

  return (
    <Block>
      <Text>{labelText}</Text>
      <SearchableDropDown
        multi={true}
        selectedItems={selectedItems}
        onItemSelect={(item) => {
          if (isMulti) setSelectedItems([...selectedItems, item]);
          else setSelectedItems([item]);

          // onChange(item);
        }}
        containerStyle={{ padding: 5 }}
        onRemoveItem={(item, index) => {
          const items = selectedItems.filter((sitem) => sitem.id !== item.id);
          setSelectedItems(items);
        }}
        itemStyle={{
          padding: 10,
          marginTop: 2,
          backgroundColor: '#ddd',
          borderColor: '#bbb',
          borderWidth: 1,
          borderRadius: 5,
        }}
        itemTextStyle={{ color: '#222' }}
        itemsContainerStyle={{ maxHeight: 140, marginTop: 5 }}
        items={items}
        // defaultIndex={2}
        // chip={true}
        resetValue
        textInputProps={{
          placeholder: placeholder,
          underlineColorAndroid: 'transparent',
          style: {
            padding: 12,
            borderRadius: 30,
            borderColor: nowTheme.COLORS.BORDER,
            height: 44,
            backgroundColor: '#FFFFFF',
            borderWidth: 1,
          },
          onTextChange: handleChangeName,
        }}
        listProps={{
          nestedScrollEnabled: true,
        }}
      />

      <ScrollView>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingBottom: 10, marginTop: 5 }}>
          {selectedItems &&
            Array.isArray(selectedItems) &&
            selectedItems.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    width: item.name.length * 8 + 30,
                    justifyContent: 'center',
                    flex: 0,
                    backgroundColor: '#eee',
                    flexDirection: 'row',
                    alignItems: 'center',
                    margin: 5,
                    borderRadius: 15,
                  }}
                >
                  <Text style={{ color: '#555' }}>{item.name}</Text>
                  <TouchableOpacity
                    onPress={() =>
                      setSelectedItems((prevState) => prevState.filter((v) => v.id !== item.id))
                    }
                    style={{
                      backgroundColor: '#f16d6b',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 20,
                      height: 20,
                      borderRadius: 100,
                      marginLeft: 10,
                    }}
                  >
                    <Text>X</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
        </View>
      </ScrollView>
    </Block>
  );
}
