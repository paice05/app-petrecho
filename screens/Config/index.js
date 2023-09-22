import React, { useEffect, useState } from "react";
import { Block, Button, Switch, Text } from "galio-framework";
import { StyleSheet, TouchableOpacity } from "react-native";
import { nowTheme } from "../../constants";
import { useUserContext } from "../../context/user";
import { useColorContext } from "../../context/colors";

export function Config() {
  const { user } = useUserContext();
  const { changeColor } = useColorContext();

  const [toogle, setToogle] = useState(true);
  const [currentColor, setCurrentColor] = useState(
    nowTheme.COLORS.PRIMARY,
    nowTheme.COLORS.PRIMARY_BACK_GROUND_COLOR,
    nowTheme.COLORS.PRIMARY_CARD_COLOR
  );

  const blueStyle = () => {
    changeColor({
      PRIMARY: "#08090A",
      PRIMARY_BACK_GROUND_COLOR: "#80e9ff",
      PRIMARY_CARD_COLOR: "#19274e",
      TEXT: "#fff",
      SWITCH_ON: "#eee",
    });
  };

  useEffect(() => {
    setCurrentColor();
  }, [toogle]);

  const purpleStyle = () => {
    changeColor({
      PRIMARY: "#403d39",
      PRIMARY_BACK_GROUND_COLOR: "#e0aaff",
      PRIMARY_CARD_COLOR: "#9d4edd",
      TEXT: "#fff",
      SWITCH_ON: "#eee",
    });
  };

  const greenStyle = () => {
    setCurrentColor(
      (nowTheme.COLORS.PRIMARY = "#403d39"),
      (nowTheme.COLORS.PRIMARY_BACK_GROUND_COLOR = "#D1E4DE"),
      (nowTheme.COLORS.PRIMARY_CARD_COLOR = "#02A26F")
    );
  };

  const orangeStyle = () => {
    setCurrentColor(
      (nowTheme.COLORS.PRIMARY = "#F4FAFF"),
      (nowTheme.COLORS.PRIMARY_BACK_GROUND_COLOR = "#869AAC"),
      (nowTheme.COLORS.PRIMARY_CARD_COLOR = "#1B2228")
    );
  };

  const pinkStyle = () => {
    setCurrentColor(
      (nowTheme.COLORS.PRIMARY = "#08090A"),
      (nowTheme.COLORS.PRIMARY_BACK_GROUND_COLOR = "#F79AD3"),
      (nowTheme.COLORS.PRIMARY_CARD_COLOR = "#8E518D")
    );
  };

  const colorDefault = () => {
    setCurrentColor(
      (nowTheme.COLORS.PRIMARY = "#c84648"),
      (nowTheme.COLORS.PRIMARY_BACK_GROUND_COLOR = "#eee"),
      (nowTheme.COLORS.PRIMARY_CARD_COLOR = "#fff")
    );
  };

  useEffect(() => {
    currentColor;
  }, [currentColor]);

  return (
    <Block style={styles.card}>
      <Block style={styles.container} gap={20}>
        <Block style={styles.item} space="between">
          <Text size={16} color={nowTheme.COLORS.PRIMARY}>
            Nome da conta
          </Text>
          <Text size={16}>{user.account.name}</Text>
        </Block>

        <Block style={styles.item} space="between">
          <Text size={16} color={nowTheme.COLORS.PRIMARY}>
            Horário de atendimento
          </Text>
          <Block row gap={10}>
            <Text size={16}>{user.account.config?.startAt}</Text>
            <Text size={16}>{user.account.config?.endAt}</Text>
          </Block>
        </Block>

        <Block style={styles.item} space="between">
          <Text size={16} color={nowTheme.COLORS.PRIMARY}>
            Dias de atendimento
          </Text>
          <Block row gap={10}>
            {user.account.config?.days &&
              Object.entries(user.account.config?.days)
                .filter(([key, value]) => Boolean(value))
                .map(([key]) => (
                  <Text key={key} size={16}>
                    {key.toUpperCase()}
                  </Text>
                ))}
          </Block>
        </Block>

        <Block style={styles.item} space="between">
          <Text size={16} bold color={nowTheme.COLORS.PRIMARY}>
            Opções de cores do app
          </Text>
          <Block row style={{ marginLeft: -5 }}>
            <Button
              color="#2CA8FF"
              style={styles.buttonStyles}
              onPress={blueStyle}
            >
              Azul
            </Button>
            <Button
              color="#A020F0"
              style={styles.buttonStyles}
              onPress={purpleStyle}
            >
              Roxo
            </Button>
            <Button
              color="#18ce0f"
              style={styles.buttonStyles}
              onPress={greenStyle}
            >
              Verde
            </Button>
          </Block>
          <Block row style={{ marginLeft: -5 }}>
            <Button
              color="#FFA500"
              style={styles.buttonStyles}
              onPress={orangeStyle}
            >
              Laranja
            </Button>
            <Button
              color="#FF69B4"
              style={styles.buttonStyles}
              onPress={pinkStyle}
            >
              Rosa
            </Button>
            <Button
              color="#D3D3D3"
              style={styles.buttonStyles}
              onPress={colorDefault}
            >
              Padrão
            </Button>
          </Block>
        </Block>

        {/* <Block style={styles.item} space="between">
          <Text size={16} color={nowTheme.COLORS.PRIMARY}>
            Trabalha em feriados
          </Text>
          <Text size={16}>SIM</Text>
        </Block> */}
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
  },
  container: {
    borderRadius: 10,
    backgroundColor: "#fff",
    padding: 10,
  },
  item: {
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  buttonStyles: {
    width: "30%",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: nowTheme.COLORS.BORDER,
    height: 40,
  },
});
