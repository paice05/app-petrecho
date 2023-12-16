import React, { useEffect, useState } from "react";
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
} from "react-native";
import { Block, Text, theme } from "galio-framework";

import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
} from "react-native-reanimated";

import { StatusBar } from "expo-status-bar";

import { Icon, Input } from "../../components";
import { nowTheme } from "../../constants";
import { api } from "../../services/api";
import { clearCache, getCache, setCache } from "../../services/cache";
import { BlockModal } from "../../components/BlockModal";
import { useToggle } from "../../components/hooks/useToggle";
import { useUserContext } from "../../context/user";
import { LoadingOverlay } from "../../components/LoadingOverlay";
import { useColorContext } from "../../context/colors";
import { colorsByName } from "../../constants/colors";
import MaskInput, { Masks } from "react-native-mask-input";

const { width, height } = Dimensions.get("screen");

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const Login = ({ navigation }) => {
  const [fields, setFields] = useState({
    username: "",
    password: "",
  });

  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { toggle, onChangeToggle } = useToggle();
  const { changeUser } = useUserContext();
  const { changeColor } = useColorContext();

  useEffect(() => {
    getCache("token").then((response) => {
      if (response) {
        setLoading(true);
        api.setToken(response);

        // verificar se o account desse token da habilitado
        api
          .request()
          .get("/auth/me")
          .then(() => {
            getCache("user").then((userRaw) => {
              const user = JSON.parse(userRaw);

              changeUser({
                name: user.name,
                id: user.id,
                theme: user.theme,
                isAdmin: user.isSuperAdmin,
                account: user.account,
              });
              changeColor(colorsByName[user.theme] || colorsByName["default"]);
              navigation.navigate("App");
              setLoading(false);
            });
          })
          .catch((err) => {
            onChangeToggle();
            clearCache("token");
            setLoading(false);
          });
      }
    });
  }, []);

  const submitLogin = () => {
    const username = fields.username.replace(/\D/g, "");

    if (!username || !fields.password) return;

    const payload = {
      username,
      password: fields.password,
    };

    setIsError(false);
    setLoading(true);

    api
      .request()
      .post("/auth", payload)
      .then(({ data }) => {
        /** verificar se a conta esta habilitada */
        if (!data.user.account.enable) {
          onChangeToggle();
          setLoading(false);

          return;
        }

        /** salvar o token no cache e entrar no app */
        if (data.token) {
          api.setToken(data.token);
          changeUser({
            name: data.user.name,
            id: data.user.id,
            theme: data.user.theme,
            isAdmin: data.user.isSuperAdmin,
            account: data.user.account,
          });
          changeColor(colorsByName[data.user.theme] || colorsByName["default"]);

          setCache("token", data.token);
          setCache("user", JSON.stringify(data.user)).then(() => {
            navigation.navigate("App");
            setLoading(false);
          });
        }
      })
      .catch((err) => {
        setIsError(true);
        setLoading(false);
      });
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
                entering={FadeInDown.delay(200).duration(1000).springify()}
                style={styles.inputContainer}
              >
                <View style={styles.inputMaskPhone}>
                  <Icon
                    size={16}
                    color="#ADB5BD"
                    name="user"
                    style={styles.inputIcons}
                  />
                  <MaskInput
                    placeholder="Digite seu usuário"
                    placeholderTextColor="#8898AA"
                    style={{
                      fontSize: 16,
                      width: "90%",
                    }}
                    keyboardType="numeric"
                    value={fields.username}
                    onChangeText={(value) =>
                      setFields({ ...fields, username: value })
                    }
                    mask={Masks.BRL_PHONE}
                  />
                </View>
              </Animated.View>

              <Animated.View
                entering={FadeInDown.delay(300).duration(1000).springify()}
              >
                <Input
                  placeholder="Senha"
                  password
                  viewPass
                  value={fields.password}
                  onChangeText={(value) =>
                    setFields({ ...fields, password: value })
                  }
                  style={styles.inputs}
                  fontSize={16}
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
              </Animated.View>

              <View style={styles.errorText}>
                {isError && (
                  <Text center size={12} color="red">
                    Desculpe, mas as informações de login que você inseriu estão
                    incorretas. Por favor, verifique o nome de usuário e senha e
                    tente novamente.
                  </Text>
                )}
              </View>

              <Animated.View
                entering={FadeInDown.delay(400).duration(1000).springify()}
              >
                <TouchableOpacity
                  style={styles.buttonLogin}
                  onPress={submitLogin}
                >
                  <Text style={styles.textLogin}>Entrar</Text>
                </TouchableOpacity>
              </Animated.View>
            </View>

            <Animated.View
              entering={FadeInDown.delay(600).duration(1000).springify()}
              style={styles.textNotAccount}
            >
              <Text>Ainda não tem conta?</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate({ name: "Cadastro" });
                }}
              >
                <Text color="#0284c7">Criar agora</Text>
              </TouchableOpacity>
            </Animated.View>

            <BlockModal
              title="Conta bloqueada"
              description="Caro cliente, sua conta esta bloqueada!!!
                  Entre em contato com a administração para mais detalhes."
              isVisible={toggle}
              onRequestClose={onChangeToggle}
              handleReturn={onChangeToggle}
            />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  backgroundImage: {
    height: "310%",
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
    marginTop: 160,
    marginBottom: 5,
    width: width * 0.8,
  },
  inputs: {
    width: 340,
    height: 50,
    borderRadius: 16,
    backgroundColor: "#ece7e8",
    marginLeft: 30,
    marginRight: 20,
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
  inputMaskPhone: {
    width: 340,
    height: 44,
    borderRadius: 16,
    fontSize: 20,
    paddingHorizontal: 15,
    backgroundColor: "#ece7e8",
    alignItems: "center",
    flexDirection: "row",
    marginLeft: 30,
    marginRight: 20,
  },
});

export default Login;
