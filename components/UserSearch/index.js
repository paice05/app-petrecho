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
import { useColorContext } from "../../context/colors";

export const UserSearch = ({
  path,
  query,
  placeholder,
  labelText,
  onSelectUser,
}) => {
  const [items, setItems] = useState([]);
  const [textName, setTextName] = useState("");
  const [loading, setLoading] = useState(false);

  const debouncedValue = useDebounce(textName);

  const { colors } = useColorContext();

  useEffect(() => {
    if (debouncedValue) {
      setLoading(true);

      api
        .request()
        .get(path, {
          params: {
            where: {
              name: { $iLike: `%${debouncedValue.trim()}%` },
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
      <Text
        size={16}
        bold
        style={{ marginLeft: 20, marginBottom: 5 }}
        color={colors.TEXT}
      >
        {labelText}
      </Text>
      <Block row style={styles.container}>
        <Icon size={16} name="user" color={colors.ICON} />
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={colors.TEXT}
          value={textName}
          onChangeText={(text) => setTextName(text)}
          flex={1}
          style={{
            fontSize: 16,
            color: colors.TEXT,
            backgroundColor: "transparent",
          }}
          selectionColor={colors.SUB_TEXT}
        />

        {loading && <ActivityIndicator size="small" color={colors.BUTTON} />}
      </Block>

      <FlatList
        data={!textName.length ? [] : items}
        keyExtractor={(item) => item.id}
        style={{ maxHeight: 200 }}
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
            <Text color={colors.BLACK}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 30,
    borderWidth: 1,
    borderColor: nowTheme.COLORS.BORDER,
    height: 44,
    paddingHorizontal: 10,
    alignItems: "center",

    gap: 10,
  },
});
