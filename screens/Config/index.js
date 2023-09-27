import React from "react";
import { Block, Button, Text } from "galio-framework";
import { StyleSheet } from "react-native";
import { nowTheme } from "../../constants";
import { useUserContext } from "../../context/user";
import { useColorContext } from "../../context/colors";

export function Config() {
  const { user } = useUserContext();
  const { colors, changeColor } = useColorContext();

  const blueStyle = () => {
    changeColor({
      PRIMARY: "#FFFFFF",
      PRIMARY_BACK_GROUND_COLOR: "#5fa8d3",
      PRIMARY_CARD_COLOR: "#1b4965",
      TEXT: "#d9ed92",
      SWITCH_ON: "#eee",
      PRIMARY_MENU_COLOR: "#B8C7CC",
    });
  };

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
    changeColor({
      PRIMARY: "#403d39",
      PRIMARY_BACK_GROUND_COLOR: "#e9e9e9",
      PRIMARY_CARD_COLOR: "#006666",
      TEXT: "#fafad7",
      SWITCH_ON: "#000",
    });
  };

  const orangeStyle = () => {
    changeColor({
      PRIMARY: "#F4FAFF",
      PRIMARY_BACK_GROUND_COLOR: "#869AAC",
      PRIMARY_CARD_COLOR: "#1B2228",
      TEXT: "#fff",
      SWITCH_ON: "#e1e6e3",
    });
  };

  const pinkStyle = () => {
    changeColor({
      PRIMARY: "#D7C0D0",
      PRIMARY_BACK_GROUND_COLOR: "#F7C7DB",
      PRIMARY_CARD_COLOR: "#F79AD3",
      TEXT: "#C86FC9",
      SWITCH_ON: "#ccd6bd",
      PRIMARY_BUTTON_COLOR: "#8E518D",
    });
  };

  const colorDefault = () => {
    changeColor({
      PRIMARY: "#c84648",
      PRIMARY_BACK_GROUND_COLOR: "#eee",
      PRIMARY_CARD_COLOR: "#fff",
      TEXT: "#32325D",
      SWITCH_ON: "#f96332",
    });
  };

  return (
    <Block
      style={[
        styles.card,
        { backgroundColor: colors.PRIMARY_BACK_GROUND_COLOR },
      ]}
    >
      <Block
        style={[
          styles.container,
          { backgroundColor: colors.PRIMARY_CARD_COLOR },
        ]}
        gap={20}
      >
        <Block style={styles.item} space="between">
          <Text size={16} bold color={colors.PRIMARY}>
            Nome da conta
          </Text>
          <Text size={16} color={colors.TEXT}>
            {user?.account.name}
          </Text>
        </Block>

        <Block style={styles.item} space="between">
          <Text size={16} bold color={colors.PRIMARY}>
            Horário de atendimento
          </Text>
          <Block row gap={10}>
            <Text size={16} color={colors.TEXT}>
              {user.account.config?.startAt}
            </Text>
            <Text size={16} color={colors.TEXT}>
              às
            </Text>
            <Text size={16} color={colors.TEXT}>
              {user.account.config?.endAt}
            </Text>
          </Block>
        </Block>

        <Block style={styles.item} space="between">
          <Text size={16} bold color={colors.PRIMARY}>
            Dias de atendimento
          </Text>
          <Block row gap={10}>
            {user.account.config?.days &&
              Object.entries(user.account.config?.days)
                .filter(([key, value]) => Boolean(value))
                .map(([key]) => (
                  <Text key={key} size={16} color={colors.TEXT}>
                    {key.toUpperCase()}
                  </Text>
                ))}
          </Block>
        </Block>

        <Block style={styles.item} space="between">
          <Text size={16} bold color={colors.PRIMARY}>
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
    flex: 1,
    padding: 15,
  },
  container: {
    borderRadius: 10,
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
