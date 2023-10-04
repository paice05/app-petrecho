import React, { useState } from "react";

import { Block, Text } from "galio-framework";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { UserSearch } from "../../../components/UserSearch";
import { nowTheme } from "../../../constants";
import { useColorContext } from "../../../context/colors";

export function Employees({}) {
  const { colors } = useColorContext();
  const navigation = useNavigation();
  const route = useRoute();
  const [itemSelected, setItemSelected] = useState();

  const { fields, setFields } = route.params;

  return (
    <Block style={[styles.container, { backgroundColor: colors.BACKGROUND }]}>
      <Block flex={1}>
        <Block
          style={[styles.group, { backgroundColor: colors.BACKGROUND_CARD }]}
        >
          <UserSearch
            path="/users"
            query={{ type: "pj" }}
            placeholder="Pesquise um funcionário"
            labelText="Funcionário"
            onSelectUser={(item) => {
              setFields({
                ...fields,
                employee: { value: item.id, label: item.name },
              });
              setItemSelected(item.name);
            }}
            icon="user"
          />
        </Block>
      </Block>

      {(itemSelected || fields?.employee?.label) && (
        <Block
          style={{
            padding: 15,
            borderRadius: 10,
            backgroundColor: colors.BACKGROUND_CARD,
          }}
        >
          <Text color={colors.TEXT}>
            Selecionado: {itemSelected || fields?.employee?.label}
          </Text>
        </Block>
      )}
      <Block row center gap={20}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
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
});
