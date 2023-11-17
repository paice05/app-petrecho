import React, { useState } from "react";

import { Block, Text } from "galio-framework";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { UserSearch } from "../../../components/UserSearch";
import { Icon } from "../../../components";
import { nowTheme } from "../../../constants";
import { useColorContext } from "../../../context/colors";

export function Clients({}) {
  const { colors } = useColorContext();
  const navigation = useNavigation();
  const route = useRoute();

  const { fields, setFields } = route.params;

  const [itemSelected, setItemSelected] = useState(fields.clients);

  const items =
    itemSelected.length === 0 && fields.clients.length > 0
      ? []
      : itemSelected.length
      ? itemSelected
      : fields.clients;

  const handleRemoveItem = ({ userId }) => {
    if (itemSelected.findIndex((item) => item.value === userId) !== -1) {
      setItemSelected(itemSelected.filter((item) => item.value !== userId));

      setFields({
        ...fields,
        clients: itemSelected.filter((item) => item.value !== userId),
      });

      return;
    }
  };

  const handleChangeClientSelected = ({ userId, name }) => {
    if (itemSelected.findIndex((item) => item.value === userId) !== -1) {
      setItemSelected(itemSelected.filter((item) => item.value !== userId));

      setFields({
        ...fields,
        clients: itemSelected.filter((item) => item.value !== userId),
      });

      return;
    }

    setItemSelected([...itemSelected, { value: userId, label: name }]);

    setFields({
      ...fields,
      clients: [...itemSelected, { value: userId, label: name }],
    });
  };

  return (
    <Block style={[styles.container, { backgroundColor: colors.BACKGROUND }]}>
      <Block flex={1}>
        <Block
          style={[styles.group, { backgroundColor: colors.BACKGROUND_CARD }]}
        >
          <UserSearch
            path="/users"
            query={{ type: "pf" }}
            placeholder="Pesquise clientes pelo nome"
            labelText="Clientes"
            onSelectUser={(item) => {
              handleChangeClientSelected({ name: item.name, userId: item.id });
            }}
            icon="user"
          />
        </Block>
      </Block>

      {items.length > 0 && (
        <ScrollView
          style={[
            styles.wrapperClient,
            { backgroundColor: colors.BACKGROUND_CARD },
          ]}
        >
          {items.map((item) => (
            <Block row space="between" style={styles.wrapperClientItem}>
              <Text color={colors.TEXT}>{item.label}</Text>
              <TouchableOpacity
                onPress={() => handleRemoveItem({ userId: item.value })}
              >
                <Icon color={colors.DANGER} name="trash-2" />
              </TouchableOpacity>
            </Block>
          ))}
        </ScrollView>
      )}
      <Block row center gap={20}>
        <TouchableOpacity
          onPress={() => {
            setFields({
              ...fields,
              clients: fields.clients,
            });

            navigation.goBack();
          }}
          style={[
            styles.button,
            {
              backgroundColor: colors.BUTTON_BACK,
            },
          ]}
        >
          <Text center bold color={colors.TEXT_BUTTON_BACK}>
            Cancelar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[
            styles.button,
            {
              backgroundColor: colors.BUTTON_REGISTER_OR_UPDATE,
            },
          ]}
        >
          <Text center bold color={colors.TEXT_BUTTON_REGISTER_UPDATE}>
            Confirmar
          </Text>
        </TouchableOpacity>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    gap: 20,
  },
  group: {
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 20,
  },
  button: {
    marginBottom: nowTheme.SIZES.BASE,
    borderRadius: 10,
    width: 120,
    height: 40,
    borderWidth: 1,
    borderColor: nowTheme.COLORS.BORDER,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  wrapperClient: {
    padding: 15,
    borderRadius: 10,
    maxHeight: 150,
  },
  wrapperClientItem: {
    marginBottom: 20,
    borderBottomWidth: 1,
    paddingBottom: 3,
  },
});
