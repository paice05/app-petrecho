import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Block, Checkbox, Text, Button as GaButton, theme } from 'galio-framework';

import { Button, Icon, Input } from '../../components';
import { Images, nowTheme } from '../../constants';
import { api } from '../../services/api';
import { useFocusEffect } from '@react-navigation/native';
import { getCache, setCache } from '../../services/cache';

const { width, height } = Dimensions.get('screen');

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);

const Login = ({ navigation }) => {
  const [fields, setFields] = useState({
    username: '',
    password: '',
  });
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getCache('token').then((response) => {
      if (response) {
        api.setToken(response);
        navigation.navigate('App');
      }
    });
  }, []);

  const submitLogin = () => {
    if (!fields.username || !fields.password) return;

    setIsError(false);

    api
      .request()
      .post('/auth', fields)
      .then(({ data }) => {
        if (data.token) {
          api.setToken(data.token);
          setCache('token', data.token).then(() => {
            navigation.navigate('App');
          });
        }
      })
      .catch((error) => setIsError(true));
  };

  return (
    <DismissKeyboard>
      <Block flex middle>
        <ImageBackground
          source={Images.RegisterBackground}
          style={styles.imageBackgroundContainer}
          imageStyle={styles.imageBackground}
        >
          <Block flex middle>
            <Block style={styles.registerContainer}>
              <Block flex space="evenly">
                <Block flex={0.4} middle style={styles.socialConnect}>
                  <Block flex={0.5} middle style={styles.cardTitle}>
                    <Text
                      style={{
                        fontFamily: 'montserrat-regular',
                        textAlign: 'center',
                      }}
                      color="#FFF"
                      size={24}
                    >
                      Meu Petrecho - Login
                    </Text>
                  </Block>
                </Block>
                <Block flex={1} middle space="between">
                  <Block center flex={0.9}>
                    <Block flex space="between">
                      <Block>
                        <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                          <Input
                            placeholder="Digite seu usuário"
                            style={styles.inputs}
                            value={fields.username}
                            onChangeText={(value) => setFields({ ...fields, username: value })}
                            iconContent={
                              <Icon
                                size={16}
                                color="#ADB5BD"
                                name="profile-circle"
                                family="NowExtra"
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
                            onChangeText={(value) => setFields({ ...fields, password: value })}
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
                          <Text center color="red">
                            {' '}
                            Erro no login{' '}
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
                          <Text
                            style={{ fontFamily: 'montserrat-bold' }}
                            size={14}
                            color={nowTheme.COLORS.WHITE}
                          >
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
        </ImageBackground>
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
    // marginTop: 55,
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
    overflow: 'hidden',
  },
  socialConnect: {
    backgroundColor: nowTheme.COLORS.WHITE,
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderColor: "rgba(136, 152, 170, 0.3)"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: '#fff',
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
    color: nowTheme.COLORS.ICON_INPUT,
  },
  inputs: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 21.5,
  },
  passwordCheck: {
    paddingLeft: 2,
    paddingTop: 6,
    paddingBottom: 15,
  },
  createButton: {
    width: width * 0.5,
    // marginTop: 25,
    marginBottom: 40,
    backgroundColor: '#26c6da',
  },
  cardTitle: {
    padding: theme.SIZES.BASE * 2,
    borderRadius: 4,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#26c6da',
    marginBottom: 16,
    backgroundColor: '#26c6da',
  },
});

export default Login;