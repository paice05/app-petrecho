import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Block, Switch, Text, Accordion } from "galio-framework";

import { nowTheme } from "../../constants";
import { useUserContext } from "../../context/user";
import { useRequestUpdate } from "../../components/hooks/useRequestUpdate";
import CustomInput from "../../components/CustomInput";
import { useValidateRequiredFields } from "../../components/hooks/useValidateRequiredFields";
import { Button, Icon } from "../../components";
import { DateTimePicker } from "../../components/DatePiker";
import { LoadingOverlay } from "../../components/LoadingOverlay";
import { formartDate } from "../../utils/formartDate";
import { useColorContext } from "../../context/colors";
import {
  DayOfWeek,
  DOMINGO,
  SEGUNDA,
  TERCA,
  QUARTA,
  QUINTA,
  SEXTA,
  SABADO,
} from "./components/DayOfWeek";

const weekDays = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];
const weekHours = [DOMINGO, SEGUNDA, TERCA, QUARTA, QUINTA, SEXTA, SABADO];

export function ConfigForm({ navigation }) {
  const [fields, setFields] = useState({
    name: "",
    startTime: new Date(),
    endTime: new Date(),
    weekDays: [],
    weekHours: {},
  });

  const { validate, errors } = useValidateRequiredFields({
    fields: ["name"],
  });

  const { user, changeUser } = useUserContext();
  const { colors } = useColorContext();

  const { execute, loading, response } = useRequestUpdate({
    path: "/public/account",
    id: `${user.account.id}/config`,
    callbackSuccess: () => {},
  });

  useEffect(() => {
    if (response) {
      changeUser({
        ...user,
        account: response,
      });

      navigation.goBack();
    }
  }, [response]);

  useEffect(() => {
    setFields({
      name: user.account.name,
      startTime: user.account?.config?.startAt
        ? new Date(`2023-01-01 ${user.account.config.startAt}:00`)
        : new Date(),
      endTime: user.account?.config?.endAt
        ? new Date(`2023-01-01 ${user.account.config.endAt}:00`)
        : new Date(),
      weekDays: user?.account?.config?.days
        ? Object.entries(user.account.config.days)
            .filter(([key, value]) => Boolean(value))
            .map(([key]) => key.toUpperCase())
        : [],
      weekHours: weekHours.reduce((acc, cur) => {
        return {
          ...acc,
          [cur]:
            Array.isArray(user.account.config.weekHours?.[cur]) &&
            user.account.config.weekHours?.[cur].length
              ? [
                  user.account.config.weekHours[cur][0].map(
                    (item) => new Date(`2023-01-01 ${item}:00`)
                  ),
                  user.account.config.weekHours[cur][1].map(
                    (item) => new Date(`2023-01-01 ${item}:00`)
                  ),
                ]
              : null,
        };
      }, {}),
    });
  }, []);

  const handleChangeWeekDay = ({ day }) => {
    if (fields.weekDays.includes(day))
      return setFields({
        ...fields,
        weekDays: fields.weekDays.filter((item) => item !== day),
      });

    setFields({ ...fields, weekDays: [...fields.weekDays, day] });
  };

  const handleChangeWeekHour = ({ day, startAt, endAt }) => {
    setFields((prevState) => ({
      ...prevState,
      weekHours: {
        ...prevState.weekHours,
        [day]: [startAt, endAt],
      },
    }));
  };

  const handleSubmit = () => {
    const startAt = formartDate(fields.startTime, "HH:mm");
    const endAt = formartDate(fields.endTime, "HH:mm");

    const payload = {
      name: fields.name,
      config: {
        startAt,
        endAt,
        days: {
          dom: fields.weekDays.includes("DOM"),
          seg: fields.weekDays.includes("SEG"),
          ter: fields.weekDays.includes("TER"),
          qua: fields.weekDays.includes("QUA"),
          qui: fields.weekDays.includes("QUI"),
          sex: fields.weekDays.includes("SEX"),
          sab: fields.weekDays.includes("SAB"),
        },
        weekHours: weekHours.reduce((acc, cur) => {
          return {
            ...acc,
            [cur]:
              Array.isArray(fields.weekHours?.[cur]) &&
              fields.weekHours?.[cur]?.[0].length &&
              fields.weekHours?.[cur]?.[1].length
                ? [
                    fields.weekHours[cur][0].map((item) =>
                      formartDate(item, "HH:mm")
                    ),
                    fields.weekHours[cur][1].map((item) =>
                      formartDate(item, "HH:mm")
                    ),
                  ]
                : [],
          };
        }, {}),
      },
    };

    execute(payload);
  };

  return (
    <Block style={[styles.card, { backgroundColor: colors.BACKGROUND }]}>
      <LoadingOverlay visible={loading} />
      <ScrollView>
        <Block
          style={[
            styles.container,
            { backgroundColor: colors.BACKGROUND_CARD },
          ]}
          gap={20}
        >
          <Block>
            <CustomInput
              placeholder="Digite o nome da sua empresa"
              labelText="Nome da empresa"
              value={fields.name}
              onChangeText={(value) => setFields({ ...fields, name: value })}
              iconContent={
                <Icon
                  size={16}
                  name="user"
                  family="feather"
                  style={[styles.inputIcons, { color: colors.ICON }]}
                />
              }
            />
            {errors?.["name"] && (
              <Text center size={14} color={colors.DANGER}>
                campo obrigatório
              </Text>
            )}
          </Block>

          <Block gap={20}>
            <Text size={16} bold color={colors.TEXT}>
              Dias de atendimento
            </Text>
            <Block row space="between">
              {weekDays.map((item) => (
                <TouchableOpacity
                  key={item}
                  style={[
                    styles.day,
                    fields.weekDays.includes(item)
                      ? {
                          borderColor: colors.TEXT,
                          backgroundColor: colors.SUCCESS,
                        }
                      : {
                          borderColor: colors.TEXT,
                          backgroundColor: nowTheme.COLORS.PRIMARY,
                        },
                  ]}
                  onPress={() => handleChangeWeekDay({ day: item })}
                >
                  <Text
                    bold
                    size={12}
                    center
                    color={!fields.weekDays.includes(item) && colors.TEXT}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </Block>
          </Block>

          <DayOfWeek
            visibleDays={fields.weekDays}
            handleChangeWeekHour={handleChangeWeekHour}
            weekHours={fields.weekHours}
          />

          {/* <Block row style={{ alignItems: "center" }}>
          <Switch
            //   value={}
            onChange={() => {}}
            trackColor={{
              false: nowTheme.COLORS.HEADER,
              true: nowTheme.COLORS.PRIMARY,
            }}
          />
          <Text size={16} color={nowTheme.COLORS.PRIMARY}>
            trabalha em feriados
          </Text>
        </Block> */}
        </Block>
      </ScrollView>
      <Block row center>
        <Button
          style={styles.button}
          backgroundColor={colors.BUTTON_BACK}
          onPress={() => navigation.goBack()}
        >
          <Text size={16} color={colors.TEXT_BUTTON_BACK} bold>
            Voltar
          </Text>
        </Button>
        <Button
          style={styles.primary}
          backgroundColor={colors.BUTTON_REGISTER_OR_UPDATE}
          onPress={handleSubmit}
          loading={loading}
        >
          <Text size={16} bold color={colors.TEXT_BUTTON_REGISTER_UPDATE}>
            Atualizar
          </Text>
        </Button>
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
    backgroundColor: "#fff",
    padding: 10,
  },
  item: {
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  inputIcons: {
    marginRight: 12,
  },
  day: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 5,
    paddingVertical: 20,
    paddingHorizontal: 5,
    minWidth: 40,
  },
  daySelected: {
    borderColor: nowTheme.COLORS.PRIMARY,
    color: "#fff",
    backgroundColor: nowTheme.COLORS.PRIMARY,
  },
  button: {
    marginBottom: nowTheme.SIZES.BASE,
    borderRadius: 10,
    width: 120,
    height: 40,
    backgroundColor: "#eee",
    borderWidth: 1,
    borderColor: nowTheme.COLORS.BORDER,
    backgroundColor: "white",
  },
  primary: {
    marginBottom: nowTheme.SIZES.BASE,
    borderRadius: 10,
    width: 120,
    height: 40,
    backgroundColor: nowTheme.COLORS.PRIMARY,
  },
});
