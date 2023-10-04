import React, { useState, useEffect } from "react";
import {
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import * as Contacts from "expo-contacts";
import { Block, Text } from "galio-framework";
import { nowTheme } from "../../../constants";
import { Button } from "../../../components";
import { api } from "../../../services/api";
import { LoadingOverlay } from "../../../components/LoadingOverlay";
import { useColorContext } from "../../../context/colors";

export const ImportContacts = ({ navigation }) => {
  const [contacts, setContacts] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);

  const { colors } = useColorContext();

  useEffect(() => {
    (async () => {
      setLoading(true);

      const { status } = await Contacts.requestPermissionsAsync();

      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
        });

        if (data.length > 0) {
          setContacts(
            data.map((item) => ({
              id: `${item.name}_${Math.random()}`,
              name: item.name || "",
              phoneNumbers: item.phoneNumbers || [],
            }))
          );

          setLoading(false);
        }
      }
    })();
  }, []);

  const handleClick = (key, value) => {
    if (selected.findIndex((item) => item.id === key) !== -1)
      return setSelected(selected.filter((item) => item.id !== key));

    setSelected([
      ...selected,
      {
        id: value.id,
        name: value?.name,
        phone:
          Array.isArray(value.phoneNumbers) && value.phoneNumbers.length
            ? value.phoneNumbers[0].number
            : "",
      },
    ]);
  };

  const handleClickSelectAll = () => {
    setSelected(
      contacts.map((value) => ({
        id: value.id,
        name: value?.name,
        phone:
          Array.isArray(value.phoneNumbers) && value.phoneNumbers.length
            ? value.phoneNumbers[0].number
            : "",
      }))
    );
  };

  const handleSubmitImport = () => {
    api
      .request()
      .post("/users/import", { users: selected })
      .then(() => {
        Alert.alert("Muito bem!", "Contatos sincronizados com sucesso!", [
          {
            text: "Continuar",
            onPress: () => navigation.goBack(),
          },
        ]);
      });
  };

  return (
    <Block
      gap={20}
      style={[styles.container, { backgroundColor: colors.BACKGROUND }]}
    >
      {loading && <LoadingOverlay />}

      <Block row space="between" style={{ alignItems: "center" }}>
        <TouchableOpacity onPress={handleClickSelectAll}>
          <Text style={{ padding: 8 }} color={colors.TEXT} size={16}>
            Selecionar todos
          </Text>
        </TouchableOpacity>
        <Text size={16} color={colors.TEXT}>
          Selecionados ({selected.length})
        </Text>
      </Block>
      <ScrollView style={{ flexGrow: 1 }}>
        <FlatList
          data={contacts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const itemChecked =
              selected.findIndex(
                (itemSelected) => itemSelected.id === item.id
              ) !== -1;

            return (
              <TouchableOpacity
                onPress={() => handleClick(item.id, item)}
                style={[
                  { backgroundColor: colors.BACKGROUND_CARD },
                  styles.card,
                  itemChecked && styles.selected,
                ]}
              >
                <Text color={itemChecked && "white"}>{item.name}</Text>
                {item.phoneNumbers.map((phoneNumber) => (
                  <Text color={itemChecked && "white"} key={phoneNumber.id}>
                    {phoneNumber.number}
                  </Text>
                ))}
              </TouchableOpacity>
            );
          }}
        />
      </ScrollView>

      <Block row center>
        <Button
          style={styles.button}
          backgroundColor={colors.BUTTON_BACK}
          onPress={() => navigation.goBack()}
        >
          <Text size={16} bold color={colors.TEXT_BUTTON_BACK}>
            Voltar
          </Text>
        </Button>
        <Button
          style={styles.primary}
          backgroundColor={colors.BUTTON_REGISTER_OR_UPDATE}
          onPress={handleSubmitImport}
        >
          <Text size={16} bold color={colors.TEXT_BUTTON_REGISTER_UPDATE}>
            Importar
          </Text>
        </Button>
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
  },
  card: {
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
  },
  selected: {
    backgroundColor: nowTheme.COLORS.PRIMARY,
  },
  confirm: {
    paddingHorizontal: 80,
    paddingVertical: 15,
    backgroundColor: nowTheme.COLORS.PRIMARY,
    borderRadius: 4,
  },
  button: {
    marginBottom: nowTheme.SIZES.BASE,
    borderRadius: 10,
    width: 120,
    height: 40,
    backgroundColor: "#eee",
    borderWidth: 1,
    borderColor: nowTheme.COLORS.BORDER,
    backgroundColor: "white",
  },
  primary: {
    marginBottom: nowTheme.SIZES.BASE,
    borderRadius: 10,
    width: 120,
    height: 40,
    backgroundColor: nowTheme.COLORS.PRIMARY,
  },
});
