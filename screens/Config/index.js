import React from "react";
import { Block, Button, Text } from "galio-framework";
import { StyleSheet } from "react-native";
import { nowTheme } from "../../constants";
import { useUserContext } from "../../context/user";
import { useColorContext } from "../../context/colors";
import { useRequestUpdate } from "../../components/hooks/useRequestUpdate";
import { getCache, setCache } from "../../services/cache";

export function Config() {
  const { user } = useUserContext();
  const { colors, changeColor } = useColorContext();

  const { execute } = useRequestUpdate({
    path: "/users",
    id: user.id,
  });

  const blueStyle = () => {
    changeColor({
      BACKGROUND: "#003459",
      BACKGROUND_CARD: "#007EA7",
      BUTTON: "#007EA7",
      TEXT: "#FFFFFF",
      SUB_TEXT: "#00171F",
      ICON: "#00A8E8",
      PLACEHOLDER: "#00171F",
      MENU: "#007EA7",
      BUTTON_BACK: "#f1f5f5",
      BUTTON_REGISTER_OR_UPDATE: "#eb7072",
      TEXT_BUTTON_BACK: "#000",
      TEXT_BUTTON_REGISTER_UPDATE: "#FFFFFF",
      LIST_TIME_BUTTON: "#003459",
      DAY_SELECTED: "#9CFFFA",
      WEEK_DAYS: "#000",
    });

    execute({ theme: "blue" });
    getCache("user").then((userRaw) => {
      const user = JSON.parse(userRaw);

      setCache("user", JSON.stringify({ ...user, theme: "blue" }));
    });
  };

  const purpleStyle = () => {
    changeColor({
      BACKGROUND: "#5D576B",
      BACKGROUND_CARD: "#8884FF",
      BUTTON: "#8D8D92",
      TEXT: "#FDE2FF",
      SUB_TEXT: "#D7BCE8",
      ICON: "#FDE2FF",
      PLACEHOLDER: "#5D576B",
      MENU: "#8884FF",
      BUTTON_BACK: "#f1f5f5",
      BUTTON_REGISTER_OR_UPDATE: "#eb7072",
      TEXT_BUTTON_BACK: "#000",
      TEXT_BUTTON_REGISTER_UPDATE: "#FFFFFF",
      LIST_TIME_BUTTON: "#003459",
      DAY_SELECTED: "#e0b1cb",
      WEEK_DAYS: "#FFFFFF",
    });

    execute({ theme: "purple" });
    getCache("user").then((userRaw) => {
      const user = JSON.parse(userRaw);

      setCache("user", JSON.stringify({ ...user, theme: "purple" }));
    });
  };

  const greenStyle = () => {
    changeColor({
      BACKGROUND: "#72A98F",
      BACKGROUND_CARD: "#3D5A6C",
      BUTTON: "#433A3F",
      TEXT: "#CDDDDD",
      SUB_TEXT: "#433A3F",
      ICON: "#CBEF43",
      PLACEHOLDER: "#433A3F",
      MENU: "#72A98F",
      BUTTON_BACK: "#f1f5f5",
      BUTTON_REGISTER_OR_UPDATE: "#eb7072",
      TEXT_BUTTON_BACK: "#000",
      TEXT_BUTTON_REGISTER_UPDATE: "#FFFFFF",
      LIST_TIME_BUTTON: "#003459",
      DAY_SELECTED: "#a7c957",
      WEEK_DAYS: "#FFFFFF",
    });

    execute({ theme: "green" });
    getCache("user").then((userRaw) => {
      const user = JSON.parse(userRaw);

      setCache("user", JSON.stringify({ ...user, theme: "green" }));
    });
  };

  const darkStyle = () => {
    changeColor({
      BACKGROUND: "#051014",
      BACKGROUND_CARD: "#2E2F2F",
      BUTTON: "#8D8D92",
      TEXT: "#CDDDDD",
      SUB_TEXT: "#ACBDBA",
      ICON: "#A599B5",
      PLACEHOLDER: "#A599B5",
      MENU: "#2E2F2F",
      BUTTON_BACK: "#f1f5f5",
      BUTTON_REGISTER_OR_UPDATE: "#eb7072",
      TEXT_BUTTON_BACK: "#eb7072",
      TEXT_BUTTON_REGISTER_UPDATE: "#FFFFFF",
      LIST_TIME_BUTTON: "#003459",
      DAY_SELECTED: "#ced4da",
      WEEK_DAYS: "#FFFFFF",
    });

    execute({ theme: "dark" });
    getCache("user").then((userRaw) => {
      const user = JSON.parse(userRaw);

      setCache("user", JSON.stringify({ ...user, theme: "dark" }));
    });
  };

  const pinkStyle = () => {
    changeColor({
      BACKGROUND: "#B58DB6",
      BACKGROUND_CARD: "#5D2E46",
      BUTTON: "#5D2E46",
      TEXT: "#E8D6CB",
      SUB_TEXT: "#D0ADA7",
      ICON: "#DDE8B9",
      PLACEHOLDER: "#DDE8B9",
      MENU: "#5D2E46",
      BUTTON_BACK: "#f1f5f5",
      BUTTON_REGISTER_OR_UPDATE: "#eb7072",
      TEXT_BUTTON_BACK: "#000",
      TEXT_BUTTON_REGISTER_UPDATE: "#FFFFFF",
      LIST_TIME_BUTTON: "#003459",
      DAY_SELECTED: "#ffccd5",
      WEEK_DAYS: "#FFFFFF",
    });

    execute({ theme: "pink" });
    getCache("user").then((userRaw) => {
      const user = JSON.parse(userRaw);

      setCache("user", JSON.stringify({ ...user, theme: "pink" }));
    });
  };

  const colorDefault = () => {
    changeColor({
      BACKGROUND: nowTheme.COLORS.PRIMARY_BACK_GROUND_COLOR,
      BACKGROUND_CARD: nowTheme.COLORS.PRIMARY_CARD_COLOR,
      BUTTON: nowTheme.COLORS.PRIMARY,
      TEXT: nowTheme.COLORS.TEXT,
      SUB_TEXT: "#a0a0a0",
      ICON: nowTheme.COLORS.PRIMARY,
      PLACEHOLDER: "#00171F",
      MENU: "#fff",
      ACTIVE_MENU: nowTheme.COLORS.PRIMARY,
      BUTTON_BACK: nowTheme.COLORS.BUTTON_BACK,
      BUTTON_REGISTER_OR_UPDATE: nowTheme.COLORS.BUTTON_REGISTER_OR_UPDATE,
      TEXT_BUTTON_BACK: nowTheme.COLORS.TEXT_BUTTON_BACK,
      TEXT_BUTTON_REGISTER_UPDATE: nowTheme.COLORS.TEXT_BUTTON_REGISTER_UPDATE,
      LIST_TIME_BUTTON: nowTheme.COLORS.LIST_TIME_BUTTON,
      DAY_SELECTED: nowTheme.COLORS.DAY_SELECTED,
      WEEK_DAYS: nowTheme.COLORS.WEEK_DAYS,
    });

    execute({ theme: "default" });
    getCache("user").then((userRaw) => {
      const user = JSON.parse(userRaw);

      setCache("user", JSON.stringify({ ...user, theme: "default" }));
    });
  };

  return (
    <Block style={[styles.card, { backgroundColor: colors.BACKGROUND }]}>
      <Block
        style={[styles.container, { backgroundColor: colors.BACKGROUND_CARD }]}
        gap={20}
      >
        <Block style={styles.item} space="between">
          <Text size={16} bold color={colors.TEXT}>
            Nome da conta
          </Text>
          <Text size={16} color={colors.SUB_TEXT}>
            {user?.account.name}
          </Text>
        </Block>

        <Block style={styles.item} space="between">
          <Text size={16} bold color={colors.TEXT}>
            Horário de atendimento
          </Text>
          <Block row gap={10}>
            <Text size={16} color={colors.SUB_TEXT}>
              {user.account.config?.startAt}
            </Text>
            <Text size={16} color={colors.SUB_TEXT}>
              às
            </Text>
            <Text size={16} color={colors.SUB_TEXT}>
              {user.account.config?.endAt}
            </Text>
          </Block>
        </Block>

        <Block style={styles.item} space="between">
          <Text size={16} bold color={colors.TEXT}>
            Dias de atendimento
          </Text>
          <Block row gap={10}>
            {user.account.config?.days &&
              Object.entries(user.account.config?.days)
                .filter(([key, value]) => Boolean(value))
                .map(([key]) => (
                  <Text key={key} size={16} color={colors.SUB_TEXT}>
                    {key.toUpperCase()}
                  </Text>
                ))}
          </Block>
        </Block>

        <Block style={styles.item} space="between">
          <Text size={16} bold color={colors.TEXT}>
            Opções de cores do app
          </Text>
          <Block row style={{ marginLeft: -5 }}>
            <Button
              color="#007EA7"
              style={styles.buttonStyles}
              onPress={blueStyle}
            >
              Azul
            </Button>
            <Button
              color="#8884FF"
              style={styles.buttonStyles}
              onPress={purpleStyle}
            >
              Roxo
            </Button>
            <Button
              color="#72A98F"
              style={styles.buttonStyles}
              onPress={greenStyle}
            >
              Verde
            </Button>
          </Block>
          <Block row style={{ marginLeft: -5 }}>
            <Button
              color="#1B2228"
              style={styles.buttonStyles}
              onPress={darkStyle}
            >
              DARK
            </Button>
            <Button
              color="#5D2E46"
              style={styles.buttonStyles}
              onPress={pinkStyle}
            >
              Rosa
            </Button>
            <Button
              color={nowTheme.COLORS.PRIMARY}
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
