import React from "react";
import { StyleSheet } from "react-native";

import { Text, Block } from "galio-framework";

import { theme } from "galio-framework";
import { nowTheme } from "../../constants";
import { useColorContext } from "../../context/colors";

const CardReportEntry = ({
  id,
  data,
  servico,
  pacote,
  nome,
  scheduleAt,
  value,
  addition,
  discount,
}) => {
  const { colors } = useColorContext();

  return (
    <>
      <Block
        flex
        space="between"
        style={[styles.container, { backgroundColor: colors.BACKGROUND_CARD }]}
      >
        <Text size={18} color={colors.TEXT} center>
          {data}
        </Text>
        <Block space="between" row style={{ alignItems: "center" }}>
          <Text size={18} color={colors.TEXT} bold>
            {nome}
          </Text>
          <Text bold color={colors.TEXT} size={14}>
            {scheduleAt}
          </Text>
        </Block>
        {servico && (
          <Text color={colors.SUB_TEXT} size={14}>
            {servico}
          </Text>
        )}
        {pacote && (
          <Text color={colors.SUB_TEXT} size={14}>
            Pacote: {pacote}
          </Text>
        )}

        <Block row space="between">
          <Block row middle gap={6}>
            <Text color={colors.SUB_TEXT} size={14}>
              Adicional: {addition}
            </Text>
            <Text color={colors.SUB_TEXT} size={14}>
              Desconto: {discount}
            </Text>
          </Block>
          <Text color={colors.SUCCESS} size={18}>
            {value}
          </Text>
        </Block>
      </Block>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.SIZES.BASE / 2,
    marginBottom: 16,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  wraper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 5,
  },
  entryValue: {
    fontSize: 18,
    color: "#00CED1",
  },
  styleText: {
    fontSize: 14,
    fontWeight: "500",
  },
  dateStyle: {
    textAlign: "center",
    fontSize: 16,
  },
});

export default CardReportEntry;
