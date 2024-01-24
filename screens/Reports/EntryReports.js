import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Block, Text } from "galio-framework";
import { useFocusEffect } from "@react-navigation/native";
import { endOfDay, lastDayOfMonth, startOfMonth } from "date-fns";

import CardReportEntry from "../../components/CardReportEntry";
import { LoadingOverlay } from "../../components/LoadingOverlay";
import { useRequestFindMany } from "../../components/hooks/useRequestFindMany";
import { formartDate } from "../../utils/formartDate";
import { nowTheme } from "../../constants";
import { optionsBirthDate } from "../../constants/month";
import { useColorContext } from "../../context/colors";

const EntryReport = ({ route }) => {
  const { selectedMonth, selectedYear } = route.params;

  const [valueEntry, setValueEntry] = useState([]);

  const { execute, response, loading } = useRequestFindMany({
    path: "/reports",
  });

  const { colors } = useColorContext();

  useEffect(() => {
    if (response) {
      setValueEntry(response.data.filter((item) => item.entry));
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

  return (
    <View style={[styles.card, { backgroundColor: colors.BACKGROUND }]}>
      <LoadingOverlay visible={loading} />
      <ScrollView showsVerticalScrollIndicator={true}>
        <Block>
          {valueEntry.length === 0 ? (
            <Text color={colors.TEXT}>
              {" "}
              Nenhum relatório encontrado no mês selecionado{" "}
            </Text>
          ) : null}
          {valueEntry.map((item) => {
            return (
              <CardReportEntry
                key={item.id}
                id={item.id}
                data={formartDate(item.createdAt, "dd/MM/yyyy")}
                servico={item?.schedule.services
                  ?.filter((item) => !item.ServiceSchedule.isPackage)
                  .map((item) => item.name)
                  .join(", ")}
                pacote={item?.schedule?.services
                  ?.filter((item) => item.ServiceSchedule.isPackage)
                  .map((item) => item.name)
                  .join(", ")}
                scheduleAt={formartDate(
                  item.schedule.scheduleAt,
                  "dd/MM HH:mm"
                )}
                value={`R$ ` + Number(item.entry).toFixed(2).replace(".", ",")}
                nome={item.schedule.shortName || item.schedule?.user?.name}
                addition={
                  `R$ ` +
                  Number(item.schedule.addition).toFixed(2).replace(".", ",")
                }
                discount={
                  `R$ ` +
                  Number(item.schedule.discount).toFixed(2).replace(".", ",")
                }
              />
            );
          })}
        </Block>
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
    color: nowTheme.COLORS.BORDER_COLOR,
    fontSize: 20,
  },
  totalValueText: {
    fontSize: 16,
    color: nowTheme.COLORS.BORDER_COLOR,
  },
  wraperTotalValue: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    color: nowTheme.COLORS.BORDER_COLOR,
    borderRadius: 4,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#00acc1",
    backgroundColor: "#00acc1",
  },
});

export default EntryReport;
