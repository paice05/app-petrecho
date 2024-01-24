import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Block, Text } from "galio-framework";
import { endOfDay, lastDayOfMonth, startOfMonth } from "date-fns";

import CardReportExit from "../../components/CardReportExit";
import { useRequestFindMany } from "../../components/hooks/useRequestFindMany";
import { formartDate } from "../../utils/formartDate";
import { optionsBirthDate } from "../../constants/month";
import { useColorContext } from "../../context/colors";
import { useRequestDestroy } from "../../components/hooks/useRequestDestroy";
import { LoadingOverlay } from "../../components/LoadingOverlay";

const ExitReport = ({ route, navigation }) => {
  const { selectedMonth, selectedYear } = route.params;

  const [valueOut, setValueOut] = useState([]);

  const { execute, response, loading } = useRequestFindMany({
    path: "/reports",
  });
  const { execute: destroy } = useRequestDestroy({
    path: "/reports",
    callbackSuccess: () => {
      navigation.goBack();
    },
  });

  const { colors } = useColorContext();

  useEffect(() => {
    if (response) {
      setValueOut(response.data.filter((item) => item.out));
    }
  }, [response]);

  useFocusEffect(
    useCallback(() => {
      const month =
        optionsBirthDate.findIndex((item) => item.title === selectedMonth) + 1;
      const start = startOfMonth(
        new Date(`${selectedYear}-${month}-1 00:00:00`)
      );
      const end = endOfDay(lastDayOfMonth(start));

      execute({
        where: {
          createdAt: {
            $between: [start, end],
          },
        },
      });
    }, [])
  );

  const handleConfirmDelete = (id) =>
    Alert.alert("Cuidado", "você deseja remover esta saída?", [
      {
        text: "Cancelar",
        onPress: () => destroy(id),
        style: "cancel",
      },
      { text: "Confirmar", onPress: () => destroy(id) },
    ]);

  return (
    <View style={[styles.card, { backgroundColor: colors.BACKGROUND }]}>
      <LoadingOverlay visible={loading} />
      <ScrollView showsVerticalScrollIndicator={true}>
        {valueOut.length === 0 ? (
          <Text color={colors.TEXT}>
            {" "}
            Nenhum relatório encontrado no mês selecionado{" "}
          </Text>
        ) : null}
        {valueOut.map((item, index) => (
          <Block key={index}>
            <CardReportExit
              key={item.id}
              id={item.id}
              data={formartDate(item.createdAt, "dd/MM/YYY")}
              nome={item.description}
              value={`R$ ${Number(item.out).toFixed(2).replace(".", ",")}`}
              onDeleted={() => handleConfirmDelete(item.id)}
            />
          </Block>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 8,
  },
  totalValue: {
    color: "#00CED1",
    fontSize: 20,
  },
  totalValueText: {
    fontSize: 16,
    fontWeight: "500",
  },
  wraperTotalValue: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
  },
});
export default ExitReport;
