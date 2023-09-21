import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import * as Notifications from "expo-notifications";
import { Block, Text, theme } from "galio-framework";

import { Button, Icon, Input } from "../../components";
import { nowTheme } from "../../constants";
import { api } from "../../services/api";
import { clearCache, getCache, setCache } from "../../services/cache";
import { BlockModal } from "../../components/BlockModal";
import { useToggle } from "../../components/hooks/useToggle";
import { useUserContext } from "../../context/user";
import { LoadingOverlay } from "../../components/LoadingOverlay";

const { width, height } = Dimensions.get("screen");

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowAlert: true,
  }),
});

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
                isAdmin: user.isSuperAdmin,
                account: user.account,
              });
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
    if (!fields.username || !fields.password) return;

    setIsError(false);
    setLoading(true);

    api
      .request()
      .post("/auth", fields)
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
            isAdmin: data.user.isSuperAdmin,
            account: data.user.account,
          });

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
    <DismissKeyboard>
      <Block flex middle>
        <LoadingOverlay visible={loading} />
        <Block flex middle>
          <Block style={styles.registerContainer}>
            <Block flex space="evenly">
              <Block flex={0.4} middle style={styles.socialConnect}>
                <Block flex={0.5} middle style={styles.cardTitle}>
                  <Text
                    style={{
                      textAlign: "center",
                    }}
                    color="#FFF"
                    size={24}
                  >
                    Meu Petrecho
                  </Text>
                </Block>
              </Block>
              <Block flex={1} middle>
                <Block center flex={0.9}>
                  <Block flex>
                    <Block>
                      <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                        <Input
                          placeholder="Digite seu usuário"
                          style={styles.inputs}
                          value={fields.username}
                          onChangeText={(value) =>
                            setFields({ ...fields, username: value })
                          }
                          type="number-pad"
                          iconContent={
                            <Icon
                              size={16}
                              color="#ADB5BD"
                              name="user"
                              style={styles.inputIcons}
                            />
                          }
                        />
                      </Block>
                      <Block width={width * 0.8}>
                        <Input
                          placeholder="Senha"
                          password
                          viewPass
                          value={fields.password}
                          onChangeText={(value) =>
                            setFields({ ...fields, password: value })
                          }
                          style={styles.inputs}
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
                      {isError && (
                        <Text center size={12} color="red">
                          Desculpe, mas as informações de login que você inseriu
                          estão incorretas. Por favor, verifique o nome de
                          usuário e senha e tente novamente.
                        </Text>
                      )}
                    </Block>
                    <Block center>
                      <Button
                        onPress={submitLogin}
                        color="primary"
                        round
                        style={styles.createButton}
                      >
                        <Text bold size={14} color={nowTheme.COLORS.WHITE}>
                          Entrar
                        </Text>
                      </Button>
                    </Block>
                  </Block>
                </Block>
              </Block>
            </Block>
          </Block>
        </Block>

        <BlockModal
          title="Conta bloqueada"
          description="Caro cliente, sua conta esta bloqueada!!!
            Entre em contato com a administração para mais detalhes."
          isVisible={toggle}
          onRequestClose={onChangeToggle}
          handleReturn={onChangeToggle}
        />
      </Block>
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  imageBackgroundContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1,
  },
  imageBackground: {
    width: width,
    height: height,
  },
  registerContainer: {
    width: width * 0.9,
    height: height < 812 ? height * 0.8 : height * 0.8,
    backgroundColor: nowTheme.COLORS.WHITE,
    borderRadius: 4,
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
  socialConnect: {
    backgroundColor: nowTheme.COLORS.WHITE,
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
  },
  inputIcons: {
    marginRight: 12,
    color: nowTheme.COLORS.PRIMARY,
  },
  inputs: {
    borderWidth: 1,
    borderColor: "#E3E3E3",
    borderRadius: 21.5,
  },
  passwordCheck: {
    paddingLeft: 2,
    paddingTop: 6,
  },
  createButton: {
    marginBottom: nowTheme.SIZES.BASE,
    borderRadius: 10,
    width: 120,
    height: 40,
    backgroundColor: nowTheme.COLORS.PRIMARY,
  },
  cardTitle: {
    padding: theme.SIZES.BASE * 2,
    borderRadius: 4,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: nowTheme.COLORS.PRIMARY,
    marginBottom: 16,
    backgroundColor: nowTheme.COLORS.PRIMARY,
  },
});

export default Login;
