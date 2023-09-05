import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Block, Text } from "galio-framework";

import { useDebounce } from "../hooks/useDebounce";
import { api } from "../../services/api";
import { nowTheme } from "../../constants";
import Icon from "../Icon";

export const UserSearch = ({
  path,
  query,
  placeholder,
  labelText,
  onSelectUser,
  value,
  clear,
}) => {
  const [items, setItems] = useState([]);
  const [textName, setTextName] = useState(value || "");
  const [loading, setLoading] = useState(false);

  const debouncedValue = useDebounce(textName);

  useEffect(() => {
    if (value) return;

    if (debouncedValue) {
      setLoading(true);

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
          setItems(data.data.map((item) => ({ id: item.id, name: item.name })));
          setLoading(false);
        });
    }
  }, [debouncedValue]);

  const handleSelectUser = (user) => {
    onSelectUser(user);
    setItems([]);
  };

  return (
    <View>
      <Text size={16} bold style={{ marginLeft: 20, marginBottom: 5 }}>
        {labelText}
      </Text>
      <Block row style={styles.container}>
        <Icon size={16} name="user" color={nowTheme.COLORS.PRIMARY} />
        <TextInput
          placeholder={placeholder}
          value={value || textName}
          onChangeText={(text) => setTextName(text)}
          flex={1}
          style={{ fontSize: 16 }}
        />
        {value && (
          <TouchableOpacity
            onPress={() => {
              setTextName("");
              clear();
            }}
          >
            <Text size={14} color={nowTheme.COLORS.PRIMARY}>
              Limpar
            </Text>
          </TouchableOpacity>
        )}
        {loading && (
          <ActivityIndicator size="small" color={nowTheme.COLORS.PRIMARY} />
        )}
      </Block>

      <ScrollView style={{ maxHeight: 200 }}>
        <FlatList
          data={!textName.length ? [] : items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                {
                  backgroundColor: "#eee",
                  padding: 8,
                  borderRadius: 4,
                  flex: 1,
                  marginVertical: 5,
                },
              ]}
              onPress={() => handleSelectUser(item)}
            >
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 30,
    borderWidth: 1,
    borderColor: nowTheme.COLORS.BORDER,
    height: 44,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    alignItems: "center",

    gap: 10,
  },
});