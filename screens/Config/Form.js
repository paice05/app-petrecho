import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Block, Switch, Text } from "galio-framework";

import { nowTheme } from "../../constants";
import { useUserContext } from "../../context/user";
import { useRequestUpdate } from "../../components/hooks/useRequestUpdate";
import CustomInput from "../../components/CustomInput";
import { useValidateRequiredFields } from "../../components/hooks/useValidateRequiredFields";
import { Button, Icon } from "../../components";
import { DateTimePicker } from "../../components/DatePiker";
import { LoadingOverlay } from "../../components/LoadingOverlay";
import { formartDate } from "../../utils/formartDate";

const weekDays = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];

export function ConfigForm({ navigation }) {
  const [fields, setFields] = useState({
    name: "",
    startTime: new Date(),
    endTime: new Date(),
    weekDays: [],
  });

  const { validate, errors } = useValidateRequiredFields({
    fields: ["name"],
  });

  const { user, changeUser } = useUserContext();

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
      },
    };

    execute(payload);
  };

  return (
    <Block style={styles.card}>
      <LoadingOverlay visible={loading} />
      <Block style={styles.container} gap={20}>
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
                style={styles.inputIcons}
              />
            }
          />
          {errors?.["name"] && (
            <Text center size={14} color={nowTheme.COLORS.PRIMARY}>
              campo obrigatório
            </Text>
          )}
        </Block>

        <Block row gap={10}>
          <Block flex={1}>
            <Text size={16} bold style={{ marginLeft: 20, marginBottom: 5 }}>
              Horário de início
            </Text>
            <DateTimePicker
              value={fields.startTime}
              onChange={(time) => setFields({ ...fields, startTime: time })}
            />
          </Block>
          <Block flex={1}>
            <Text size={16} bold style={{ marginLeft: 20, marginBottom: 5 }}>
              Horário de fim
            </Text>
            <DateTimePicker
              value={fields.endTime}
              onChange={(time) => setFields({ ...fields, endTime: time })}
            />
          </Block>
        </Block>

        <Block>
          <Text size={16} bold style={{ marginLeft: 20, marginBottom: 5 }}>
            Dias de atendimento
          </Text>
          <Block row space="between" style={{ paddingHorizontal: 20 }}>
            {weekDays.map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.day,
                  fields.weekDays.includes(item) && styles.daySelected,
                ]}
                onPress={() => handleChangeWeekDay({ day: item })}
              >
                <Text
                  bold
                  size={12}
                  center
                  color={fields.weekDays.includes(item) && "#fff"}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </Block>
        </Block>

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

        <Block row center>
          <Button style={styles.button} onPress={() => navigation.goBack()}>
            <Text size={16} bold>
              Voltar
            </Text>
          </Button>
          <Button
            style={styles.primary}
            onPress={handleSubmit}
            loading={loading}
          >
            <Text size={16} bold color="#fff">
              Atualizar
            </Text>
          </Button>
        </Block>
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
  inputIcons: {
    marginRight: 12,
    color: nowTheme.COLORS.PRIMARY,
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
