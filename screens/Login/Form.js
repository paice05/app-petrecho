import { Block, Text, theme } from "galio-framework";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Image,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";

import { StatusBar } from "expo-status-bar";

import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
} from "react-native-reanimated";

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

  const [loading, setLoading] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

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

    setLoading(true);

    const cellPhone = fields.cellPhone.replace(/\D/g, "");
    const payload = {
      name: fields.name,
      cellPhone,
      password: fields.password,
    };

    try {
      api
        .request()
        .post("/public/account/trial", payload)
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
      Alert.alert(error.toString());
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <LoadingOverlay visible={loading} />
          <StatusBar style="light" />
          <View>
            <Image
              style={styles.backgroundImage}
              source={require("../../assets/background.png")}
            />

            <View style={styles.logoContainer}>
              <Animated.Image
                style={styles.logoImage}
                entering={FadeInUp.delay(200).duration(1000).springify()}
                source={require("../../assets/logo-meu-petrecho.png")}
              />
            </View>
            <View style={styles.secondaryImageContainer}>
              <Animated.Image
                style={styles.secondaryImage}
                entering={FadeInUp.delay(200).duration(1000).springify()}
                source={require("../../assets/meu-petrecho.png")}
              />
            </View>
          </View>

          <View style={styles.formContainer}>
            <View>
              <Animated.View
                entering={FadeInDown.duration(1000).springify()}
                style={styles.inputContainer}
              >
                <Text size={16} bold style={{ marginLeft: 20, marginTop: 5 }}>
                  Nome da empresa
                </Text>
                <Input
                  placeholder="Digite o nome da empresa"
                  style={styles.inputs}
                  value={fields.name}
                  onChangeText={(value) =>
                    setFields({ ...fields, name: value })
                  }
                  type="text"
                  iconContent={
                    <Icon
                      size={16}
                      color="#ADB5BD"
                      family="feather"
                      name="home"
                      style={styles.inputIcons}
                    />
                  }
                />
                {buttonClicked && errors?.["name"] && (
                  <Text
                    center
                    size={14}
                    style={{ marginLeft: 60 }}
                    color={nowTheme.COLORS.ERROR}
                  >
                    Campo obrigatório
                  </Text>
                )}
              </Animated.View>

              <Animated.View
                entering={FadeInDown.delay(200).duration(1000).springify()}
                //style={{ width: width * 0.8 }}
              >
                <Text
                  size={16}
                  bold
                  style={{ marginLeft: 20, marginBottom: 5 }}
                >
                  Telefone
                </Text>
                <View style={styles.inputMaskPhone}>
                  <Icon
                    size={16}
                    color="#ADB5BD"
                    name="phone"
                    family="feather"
                    style={styles.inputIcons}
                  />
                  <MaskInput
                    placeholder="Telefone Celular "
                    keyboardType="numeric"
                    value={fields.cellPhone}
                    onChangeText={(value) =>
                      setFields({ ...fields, cellPhone: value })
                    }
                    mask={Masks.BRL_PHONE}
                  />
                </View>
                {buttonClicked && errors?.["cellPhone"] && (
                  <Text center size={14} color={nowTheme.COLORS.ERROR}>
                    Campo obrigatório
                  </Text>
                )}
              </Animated.View>

              <Animated.View
                entering={FadeInDown.delay(200).duration(1000).springify()}
                //style={{ width: width * 0.8 }}
              >
                <Text size={16} bold style={{ marginLeft: 20, marginTop: 10 }}>
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
                {buttonClicked && errors?.["password"] && (
                  <Text center size={14} color={nowTheme.COLORS.ERROR}>
                    Campo obrigatório
                  </Text>
                )}
              </Animated.View>

              <Animated.View
                entering={FadeInDown.delay(200).duration(1000).springify()}
                //style={{ width: width * 0.8 }}
              >
                <Text size={16} bold style={{ marginLeft: 20, marginTop: 5 }}>
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
                {buttonClicked && errors?.["confirmPassword"] && (
                  <Text center size={14} color={nowTheme.COLORS.ERROR}>
                    Campo obrigatório
                  </Text>
                )}
              </Animated.View>

              <Animated.View
                entering={FadeInDown.delay(400).duration(1000).springify()}
                style={{ width: "100%" }}
              >
                <TouchableOpacity
                  style={styles.buttonLogin}
                  onPress={() => {
                    setButtonClicked(true);
                    submitRegister();
                  }}
                >
                  <Text style={styles.textLogin}>Cadastrar</Text>
                </TouchableOpacity>
              </Animated.View>
            </View>

            <Animated.View
              entering={FadeInDown.delay(600).duration(1000).springify()}
              style={styles.textNotAccount}
            >
              <Text>Já tem uma conta?</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate({ name: "Onboarding" });
                }}
              >
                <Text color="#0284c7">Login</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
  containerX: {
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
    width: 340,
    height: 44,
    borderRadius: 16,
    fontSize: 16,
    paddingHorizontal: 15,
    backgroundColor: "#ece7e8",
    alignItems: "center",
    flexDirection: "row",
    marginLeft: 30,
    marginRight: 20,
  },
  inputPassword: {
    width: 340,
    height: 44,
    borderRadius: 16,
    backgroundColor: "#ece7e8",
    marginLeft: 30,
    marginRight: 20,
    fontSize: 18,
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
  inputsX: {
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
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  backgroundImage: {
    height: "300%",
    width: "100%",
    position: "absolute",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 80,
  },
  logoImage: {
    height: 90,
    width: 70,
  },
  secondaryImageContainer: {
    width: "100%",
    position: "absolute",
    padding: theme.SIZES.BASE * 4,
    alignItems: "center",
    paddingVertical: 195,
  },
  secondaryImage: {
    height: 50,
    width: "120%",
  },
  formContainer: {
    alignItems: "center",
  },
  textNotAccount: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    display: "flex",
    marginTop: 15,
    marginBottom: 40,
  },
  buttonLogin: {
    width: 340,
    height: 50,
    backgroundColor: nowTheme.COLORS.PRIMARY,
    padding: 3,
    borderRadius: 16,
    marginBottom: 15,
    marginTop: 25,
    marginLeft: 30,
    marginRight: 20,
  },
  textLogin: {
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 34,
    color: nowTheme.COLORS.WHITE,
    textAlign: "center",
  },
  inputIcons: {
    marginRight: 12,
    color: nowTheme.COLORS.PRIMARY,
  },
  inputContainer: {
    marginTop: 125,
    marginBottom: 5,
    width: width * 0.8,
  },
  inputs: {
    width: 340,
    height: 44,
    borderRadius: 16,
    backgroundColor: "#ece7e8",
    marginLeft: 30,
    marginRight: 20,
    fontSize: 18,
  },
  passwordCheck: {
    paddingLeft: 2,
    paddingTop: 6,
  },
  errorText: {
    textAlign: "center",
    paddingHorizontal: 20,
    marginTop: 15,
  },
});

export default RegisterForm;
