import React from "react";
import { StyleSheet } from "react-native";

import { Text, Block } from "galio-framework";

import { theme } from "galio-framework";
import { nowTheme } from "../../constants";

const CardReportEntry = ({
  id,
  data,
  servico,
  nome,
  value,
  addition,
  discount,
}) => {
  return (
    <>
      <Block flex space="between" style={styles.container}>
        <Text size={18} center>
          {data}
        </Text>
        <Text size={18} color={nowTheme.COLORS.PRIMARY} bold>
          {nome}
        </Text>
        <Text color="gray" size={14}>
          {servico}
        </Text>
        <Block row space="between">
          <Block row middle gap={6}>
            <Text color="gray" size={14}>
              Adicional: {addition}
            </Text>
            <Text color="gray" size={14}>
              Desconto: {discount}
            </Text>
          </Block>
          <Text size={18}>{value}</Text>
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
