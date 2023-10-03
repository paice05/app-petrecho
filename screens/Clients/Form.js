import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Dimensions, View } from "react-native";

// Galio components
import { Block, Text, theme } from "galio-framework";

// Now UI themed components
import { Button, Icon, Input } from "../../components";
import CustomInput from "../../components/CustomInput";
import { CustomSelectBottom } from "../../components/CustomSelectBottom";
import { useValidateRequiredFields } from "../../components/hooks/useValidateRequiredFields";
import { api } from "../../services/api";
import { optionsBirthDate } from "../../constants/month";
import { nowTheme } from "../../constants";
import Theme from "../../constants/Theme";
import { useColorContext } from "../../context/colors";

const { width } = Dimensions.get("screen");

const optionsType = [
  {
    title: "Cliente",
    data: "pf",
  },
  {
    title: "Funcionário",
    data: "pj",
  },
];

const ClientForm = ({ route, navigation }) => {
  const params = route.params;
  const { colors } = useColorContext();

  const isEditing = params?.itemId;

  const [fields, setFields] = useState({
    name: "",
    cellPhone: "",
    birthDate: { title: "", data: "" },
    type: isEditing
      ? { title: "", data: "" }
      : { title: "Cliente", data: "pf" },
    password: "",
  });

  const { validate, errors } = useValidateRequiredFields({
    fields: ["name"],
  });

  useEffect(() => {
    validate(fields);
  }, [fields]);

  const handleSubmitCreate = async () => {
    if (Object.values(errors).filter(Boolean).length) return;

    const payload = {
      ...fields,
      type: fields.type.data,
      birthDate: fields.birthDate.data,
    };

    if (!fields.password) delete payload.password;

    try {
      const response = await api.request().post("/users", payload);

      setFields(response.data);
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitUpdate = async () => {
    if (Object.values(errors).filter(Boolean).length) return;

    const payload = {
      ...fields,
      type: fields?.type?.data,
      birthDate: fields?.birthDate?.data,
    };

    if (!fields.password) delete payload.password;

    try {
      const response = await api.request().put(`/users/${isEditing}`, payload);

      setFields(response.data);
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isEditing) {
      const fecthClients = async () => {
        try {
          const response = await api.request().get(`/users/${isEditing}`);

          setFields({
            ...fields,
            name: response.data.name,
            cellPhone: response.data.cellPhone,
            birthDate: optionsBirthDate.find(
              (item) => item.data === response.data.birthDate
            ),
            type: optionsType.find((item) => item.data === response.data.type),
            password: "",
          });
        } catch (error) {
          console.log(error);
        }
      };

      fecthClients();
    } // busca dados da API
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.BACKGROUND }]}>
      <ScrollView showsVerticalScrollIndicator={true}>
        <Block
          flex
          gap={10}
          style={[
            styles.cardContainer,
            { backgroundColor: colors.BACKGROUND_CARD },
          ]}
        >
          <Block>
            <CustomInput
              placeholder="Digite seu nome"
              labelText="Nome"
              value={fields.name}
              onChangeText={(value) => setFields({ ...fields, name: value })}
              iconContent={
                <Icon
                  size={16}
                  name="user"
                  family="feather"
                  style={[styles.inputIcons, { color: colors.ICON }]}
                />
              }
            />
            {errors?.["name"] && (
              <Text center size={14} color={nowTheme.COLORS.PRIMARY}>
                campo obrigatório
              </Text>
            )}
          </Block>

          <CustomInput
            placeholder="Digite o telefone do cliente"
            labelText="Telefone"
            value={fields.cellPhone}
            onChangeText={(value) => setFields({ ...fields, cellPhone: value })}
            iconContent={
              <Icon
                size={16}
                name="phone"
                family="feather"
                style={[styles.inputIcons, { color: colors.ICON }]}
              />
            }
          />

          <Block gap={-12} marginBottom={8}>
            <Text
              bold
              size={16}
              style={styles.styleLabelText}
              color={colors.TEXT}
            >
              Mês de aniversário
            </Text>
            <CustomSelectBottom
              placeholder="Escolha um mês"
              value={fields.birthDate}
              onChange={(item) => setFields({ ...fields, birthDate: item })}
              options={optionsBirthDate}
            />
          </Block>

          <Block gap={-12} marginBottom={10}>
            <Text
              bold
              size={16}
              style={styles.styleLabelText}
              color={colors.TEXT}
            >
              Tipo de cliente
            </Text>
            <CustomSelectBottom
              placeholder="Escolha um tipo"
              value={fields.type}
              onChange={(item) => setFields({ ...fields, type: item })}
              options={optionsType}
            />
          </Block>

          {fields.type.data === "pj" ? (
            <Block Block gap={-12} marginBottom={10}>
              <Text
                bold
                size={16}
                marginBottom={12}
                style={styles.styleLabelText}
              >
                Senha
              </Text>
              <Input
                placeholder="Senha"
                password
                viewPass
                value={fields.password}
                onChangeText={(value) =>
                  setFields({ ...fields, password: value })
                }
                style={styles.inputPassword}
                iconContent={
                  <Icon
                    size={16}
                    color="#ADB5BD"
                    name="lock"
                    family="feather"
                    style={styles.inputIcons}
                  />
                }
              />
            </Block>
          ) : null}
        </Block>
      </ScrollView>
      <Block row center style={styles.buttonContainer}>
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
          onPress={isEditing ? handleSubmitUpdate : handleSubmitCreate}
          backgroundColor={colors.BUTTON_REGISTER_OR_UPDATE}
        >
          <Text size={16} bold color={colors.TEXT_BUTTON_REGISTER_UPDATE}>
            {isEditing ? "Atualizar" : "Cadastrar"}
          </Text>
        </Button>
      </Block>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
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
  },
  buttonContainer: {
    paddingHorizontal: nowTheme.SIZES.BASE,
  },
  cardContainer: {
    borderRadius: 10,
    padding: 10,
  },
  inputIcons: {
    marginRight: 12,
  },
  styleLabelText: {
    alignSelf: "flex-start",
    marginLeft: 22,
  },
  inputPassword: {
    borderWidth: 1,
    borderColor: nowTheme.COLORS.BORDER,
    borderRadius: 21.5,
    backgroundColor: "#FFFFFF",
  },
});

export default ClientForm;
