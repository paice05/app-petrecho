import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Block, Text } from "galio-framework";
import { lastDayOfMonth } from "date-fns";

import CardReport from "../../components/CardReport";
import SimpleMenu from "../../components/Menu";
import { useRequestFindMany } from "../../components/hooks/useRequestFindMany";
import { nowTheme } from "../../constants";
import { formartDate } from "../../utils/formartDate";
import { useColorContext } from "../../context/colors";

const optionsBirthDate = [
  { title: "Janeiro", data: "Janeiro" },
  { title: "Fevereiro", data: "Fevereiro" },
  { title: "Março", data: "Março" },
  { title: "Abril", data: "Abril" },
  { title: "Maio", data: "Maio" },
  { title: "Junho", data: "Junho" },
  { title: "Julho", data: "Julho" },
  { title: "Agosto", data: "Agosto" },
  { title: "Setembro", data: "Setembro" },
  { title: "Outubro", data: "Outubro" },
  { title: "Novembro", data: "Novembro" },
  { title: "Dezembro", data: "Dezembro" },
];

const years = [2023, 2024];

const ReportList = ({ navigation }) => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(
    optionsBirthDate[new Date().getMonth()].title
  );

  const [valueEntry, setValueEntry] = useState(0);
  const [valueExit, setValueExit] = useState(0);

  const { execute, response } = useRequestFindMany({ path: "/reports" });

  const { colors } = useColorContext();

  useEffect(() => {
    if (response) {
      setValueEntry(response.data.reduce((acc, cur) => acc + cur.entry, 0));
      setValueExit(response.data.reduce((acc, cur) => acc + cur.out, 0));
    }
  }, [response]);

  useFocusEffect(
    useCallback(() => {
      const month =
        optionsBirthDate.findIndex((item) => item.title === selectedMonth) + 1;

      const start = new Date(`${selectedYear}-${month}-1 00:00:00`);
      const lastDay = formartDate(lastDayOfMonth(start), "YYY-MM-dd");
      const end = new Date(`${lastDay} 23:59:59`);

      execute({
        where: {
          createdAt: {
            $between: [start, end],
          },
        },
      });
    }, [selectedYear, selectedMonth])
  );

  return (
    <View style={[styles.card, { backgroundColor: colors.BACKGROUND }]}>
      <ScrollView showsVerticalScrollIndicator={true}>
        <Block
          style={{
            marginBottom: 5,
            marginLeft: 2,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <SimpleMenu
            items={years.map((year) => ({
              text: year.toString(),
              onSelect: (value) => setSelectedYear(Number(value)),
            }))}
          >
            <Text size={18} bold color={colors.TEXT}>
              Ano:{" "}
              <Text size={18} bold color={colors.BUTTON}>
                {selectedYear}
              </Text>
            </Text>
          </SimpleMenu>

          <SimpleMenu
            items={optionsBirthDate.map((item) => ({
              text: item.title,
              onSelect: (value) => setSelectedMonth(value),
            }))}
          >
            <Text size={18} bold color={colors.TEXT}>
              Mês:{" "}
              <Text size={18} bold color={colors.BUTTON}>
                {selectedMonth}
              </Text>
            </Text>
          </SimpleMenu>
        </Block>

        <CardReport
          navigation={navigation}
          date={`${selectedMonth} ${selectedYear}`}
          entryValue={valueEntry}
          outPutValue={valueExit}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 15,
  },
  text: {
    textDecorationLine: "underline",
    paddingHorizontal: 10,
  },
});

export default ReportList;
