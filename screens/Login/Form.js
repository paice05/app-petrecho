import { Block, Text } from "galio-framework";
import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions, Alert } from "react-native";
import MaskInput, { Masks } from "react-native-mask-input";

import { LoadingOverlay } from "../../components/LoadingOverlay";
import { nowTheme } from "../../constants";
import { api } from "../../services/api";
import { setCache } from "../../services/cache";
import { Button, Icon, Input } from "../../components";
import { useValidateRequiredFields } from "../../components/hooks/useValidateRequiredFields";
import { useUserContext } from "../../context/user";
import { useColorContext } from "../../context/colors";
import { colorsByName } from "../../constants/colors";

const { width, height } = Dimensions.get("screen");

const RegisterForm = ({ navigation }) => {
  const [fields, setFields] = useState({
    name: "",
    cellPhone: "",
    password: "",
    confirmPassword: "",
  });

  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { changeUser } = useUserContext();
  const { changeColor } = useColorContext();

  const { validate, errors } = useValidateRequiredFields({
    fields: ["name", "cellPhone", "password", "confirmPassword"],
  });

  useEffect(() => {
    validate(fields);
  }, [fields]);

  const submitRegister = () => {
    if (Object.values(errors).filter(Boolean).length) return;

    if (fields.password !== fields.confirmPassword) {
      Alert.alert("As senhas não coincidem");
      return;
    }

    setIsError(false);
    setLoading(true);

    const payload = {
      name: fields.name,
      cellPhone: fields.cellPhone,
      password: fields.password,
    };

    try {
      api
        .request()
        .post("public/account/trial", payload)
        .then(({ data }) => {
          if (data.token) {
            api.setToken(data.token);
            changeUser({
              name: data.user.name,
              id: data.user.id,
              theme: data.user.theme,
              isAdmin: data.user.isSuperAdmin,
              account: data.user.account,
            });
            changeColor(
              colorsByName[data.user.theme] || colorsByName["default"]
            );

            setCache("token", data.token);
            setCache("user", JSON.stringify(data.user)).then(() => {
              navigation.navigate("App");
              setLoading(false);
            });
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Block flex middle>
      <LoadingOverlay visible={loading} />
      <Block style={styles.registerContainer}>
        <Block flex={0.1} style={styles.cardTitle}>
          <Text style={styles.titleStyle} size={18} bold>
            Meu Petrecho - Cadastro
          </Text>
        </Block>

        <Block flex space="between" style={styles.container}>
          <Block>
            <Text
              size={16}
              bold
              style={{ marginLeft: 20, marginTop: 15 }}
              color="#e09f3e"
            >
              Nome da empresa
            </Text>
            <Input
              placeholder="Digite o nome da empresa"
              style={styles.inputs}
              value={fields.name}
              onChangeText={(value) => setFields({ ...fields, name: value })}
              type="text"
              iconContent={
                <Icon
                  size={16}
                  name="home"
                  family="feather"
                  style={styles.inputIcons}
                  color="gray"
                />
              }
            />
            {errors?.["name"] && (
              <Text center size={14} color={nowTheme.COLORS.ERROR}>
                Campo obrigatório
              </Text>
            )}

            <Text
              size={16}
              bold
              style={{ marginLeft: 20, marginBottom: 5 }}
              color="#e09f3e"
            >
              Telefone
            </Text>
            <MaskInput
              placeholder="Telefone Celular "
              keyboardType="numeric"
              value={fields.cellPhone}
              onChangeText={(value) =>
                setFields({ ...fields, cellPhone: value })
              }
              mask={Masks.BRL_PHONE}
              style={styles.inputMaskPhone}
            />
            {errors?.["cellPhone"] && (
              <Text center size={14} color={nowTheme.COLORS.ERROR}>
                Campo obrigatório
              </Text>
            )}

            <Text
              size={16}
              bold
              style={{ marginLeft: 20, marginTop: 10 }}
              color="#e09f3e"
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
            {errors?.["password"] && (
              <Text center size={14} color={nowTheme.COLORS.ERROR}>
                Campo obrigatório
              </Text>
            )}

            <Text
              size={16}
              bold
              style={{ marginLeft: 20, marginTop: 5 }}
              color="#e09f3e"
            >
              Confirmar senha
            </Text>
            <Input
              placeholder="Senha"
              password
              viewPass
              value={fields.confirmPassword}
              onChangeText={(value) =>
                setFields({ ...fields, confirmPassword: value })
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
            {errors?.["confirmPassword"] && (
              <Text center size={14} color={nowTheme.COLORS.ERROR}>
                Campo obrigatório
              </Text>
            )}
          </Block>
          <Block center style={{ marginBottom: 15 }}>
            <Button
              color="primary"
              round
              style={styles.registerButton}
              onPress={submitRegister}
            >
              <Text bold size={14} color={nowTheme.COLORS.WHITE}>
                Cadastrar
              </Text>
            </Button>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.9,
    height: height < 812 ? height * 0.8 : height * 0.8,
    backgroundColor: "#335c67", //nowTheme.COLORS.WHITE, //"#8d99ae"
    borderRadius: 10,
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden",
  },
  container: {
    padding: 20,
    marginTop: 40,
    marginRight: 30,
    marginBottom: 50,
    marginLeft: 30,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff3b0", //nowTheme.COLORS.BORDER,
  },
  inputIcons: {
    marginRight: 12,
    color: nowTheme.COLORS.PRIMARY,
  },
  inputMaskPhone: {
    borderRadius: 30,
    borderWidth: 1,
    borderColor: nowTheme.COLORS.BORDER,
    height: 44,
    fontSize: 14,
    paddingHorizontal: 70,
    //color: nowTheme.COLORS.BORDER,
    backgroundColor: nowTheme.COLORS.WHITE,
  },
  inputPassword: {
    borderRadius: 30,
    borderWidth: 1,
    borderColor: nowTheme.COLORS.BORDER,
    height: 44,
    fontSize: 14,
    paddingHorizontal: 15,
  },
  containerMaskPhone: {
    borderRadius: 30,
    borderWidth: 1,
    borderColor: nowTheme.COLORS.BORDER,
    height: 44,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  registerButton: {
    marginBottom: nowTheme.SIZES.BASE,
    borderRadius: 10,
    width: 120,
    height: 40,
    backgroundColor: nowTheme.COLORS.PRIMARY,
  },
  inputs: {
    borderWidth: 1,
    borderColor: "#E3E3E3",
    borderRadius: 21.5,
  },
  cardTitle: {
    //height: 10,
    width: "82%",
    padding: 10,
    marginTop: 30,
    marginLeft: 35,
    marginBottom: -8,
    borderRadius: 4,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: nowTheme.COLORS.PRIMARY,
    backgroundColor: nowTheme.COLORS.PRIMARY,
  },
  titleStyle: {
    textAlign: "center",
    marginTop: 10,
    color: nowTheme.COLORS.WHITE,
  },
});

export default RegisterForm;
