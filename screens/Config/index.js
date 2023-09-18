import React from "react";
import { Block, Text } from "galio-framework";
import { StyleSheet, TouchableOpacity } from "react-native";
import { nowTheme } from "../../constants";
import { useUserContext } from "../../context/user";

export function Config() {
  const { user } = useUserContext();

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
});
