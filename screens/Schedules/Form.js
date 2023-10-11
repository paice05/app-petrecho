import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Block, Text, Switch } from "galio-framework";
import { useNavigation } from "@react-navigation/native";

import { useValidateRequiredFields } from "../../components/hooks/useValidateRequiredFields";
import { useRequestFindOne } from "../../components/hooks/useRequestFindOne";
import { useRequestCreate } from "../../components/hooks/useRequestCreate";
import { useRequestUpdate } from "../../components/hooks/useRequestUpdate";
import { LoadingOverlay } from "../../components/LoadingOverlay";
import { WrapperInput } from "../../components/WrapperInput";
import { DateTimePicker } from "../../components/DatePiker";
import { Button } from "../../components";

import { formartDate } from "../../utils/formartDate";
import { nowTheme } from "../../constants";
import { Config } from "./Config";
import { useColorContext } from "../../context/colors";
import { useUserContext } from "../../context/user";

const SchedulesForm = ({ route }) => {
  const params = route.params;
  const isEditing = params?.itemId;

  const navigation = useNavigation();
  const { user } = useUserContext();

  const [fields, setFields] = useState({
    user: null,
    shortName: null,
    services: [], // value label
    employee: {
      value: user?.id,
      label: user?.name,
    },
    date: new Date(),
    time: new Date(),
    discount: 0,
    addition: 0,
    isPackage: false,
    status: false,
  });

  const { colors } = useColorContext();

  const { validate, errors } = useValidateRequiredFields({
    fields: ["user", "services", "employee", "date", "time"],
  });

  const {
    execute: execFindOne,
    response,
    loading,
  } = useRequestFindOne({
    path: "/schedules",
    id: params?.itemId,
  });

  const {
    execute: execCreate,
    response: responseCreated,
    loading: loadingCreate,
  } = useRequestCreate({
    path: "/schedules",
  });

  const {
    execute: execUpdate,
    response: responseUpdate,
    loading: loadingUpdate,
  } = useRequestUpdate({
    path: "/schedules",
    id: params?.itemId,
  });

  useEffect(() => {
    if (responseCreated) navigation.goBack();
    if (responseUpdate) navigation.goBack();
  }, [responseCreated, responseUpdate]);

  useEffect(() => {
    if (response) {
      setFields({
        user: { value: response?.user?.id, label: response?.user?.name },
        shortName: response.shortName,
        services: response.services.map((item) => ({
          id: item.id,
          isPackage: item.ServiceSchedule.isPackage,
          name: item.name,
        })),
        employee: {
          value: response?.employee?.id,
          label: response?.employee?.name,
        },
        date: new Date(response.scheduleAt),
        time: new Date(response.scheduleAt),
        discount:
          Number(response.discount).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
            currencyDisplay: "symbol",
          }) || null,
        addition:
          Number(response.addition).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
            currencyDisplay: "symbol",
          }) || null,
        status: response.status === "awaiting",
      });
    }
  }, [response]);

  useEffect(() => {
    if (isEditing) execFindOne();
  }, []);

  useEffect(() => {
    validate(fields);
  }, [fields]);

  const handleSubmitCreate = async () => {
    if (Object.values(errors).filter(Boolean).length) return;

    const scheduleAt = new Date(
      `${formartDate(fields.date, "YYY-MM-dd")} ${formartDate(
        fields.time,
        "HH:mm"
      )}:00`
    );
    const discount = fields.discount
      .toString()
      .replace("R$", "")
      .replace(",", ".");
    const addition = fields.addition
      .toString()
      .replace("R$", "")
      .replace(",", ".");

    const payload = {
      ...fields,
      services: fields.services,
      scheduleAt,
      userId: fields.user.value,
      employeeId: fields.employee.value,
      discount,
      addition,
    };

    if (fields.status) payload["status"] = "awaiting";
    else delete payload["status"];

    execCreate(payload);
  };

  const handleSubmitUpdate = async () => {
    if (Object.values(errors).filter(Boolean).length) return;

    const scheduleAt = new Date(
      `${formartDate(fields.date, "YYY-MM-dd")} ${formartDate(
        fields.time,
        "HH:mm"
      )}:00`
    );

    const discount = fields?.discount.replace("R$", "").replace(",", ".");
    const addition = fields?.addition.replace("R$", "").replace(",", ".");

    const payload = {
      ...fields,
      services: fields.services,
      scheduleAt,
      userId: fields.user.value,
      employeeId: fields.employee.value,
      discount,
      addition,
    };

    if (fields.status) payload["status"] = "awaiting";
    else delete payload["status"];

    execUpdate(payload);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.BACKGROUND }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LoadingOverlay visible={loading || loadingCreate || loadingUpdate} />
        <Block
          gap={15}
          flex
          style={[styles.group, { backgroundColor: colors.BACKGROUND_CARD }]}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ScheduleComponentsClients", {
                fields,
                setFields,
              });
            }}
          >
            <WrapperInput
              labelText="Cliente"
              icon="user"
              placeholder="Pesquise um cliente"
              value={fields?.user?.label}
            />
            {errors?.["user"] && (
              <Text center size={14} color={colors.DANGER}>
                campo obrigatório
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ScheduleComponentsServices", {
                fields,
                setFields,
              });
            }}
          >
            <WrapperInput
              labelText="Serviços"
              icon="tool"
              placeholder="Adicione alguns serviços"
              value={fields?.services.map((item) => item.name).join("; ")}
            />
            {errors?.["services"] && (
              <Text center size={14} color={colors.DANGER}>
                selecione pelo menos 1 serviço
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ScheduleComponentsEmployees", {
                fields,
                setFields,
              });
            }}
          >
            <WrapperInput
              labelText="Funcionário"
              icon="user"
              placeholder="Pesquise um funcionário"
              value={fields?.employee?.label}
            />
            {errors?.["employee"] && (
              <Text center size={14} color={colors.DANGER}>
                campo obrigatório
              </Text>
            )}
          </TouchableOpacity>

          <Block row space="between" gap={10}>
            <Block flex={1}>
              <Text
                size={16}
                bold
                style={{ marginLeft: 20, marginBottom: 5 }}
                color={colors.TEXT}
              >
                Data
              </Text>
              <DateTimePicker
                value={fields.date}
                onChange={(date) => setFields({ ...fields, date })}
                mode="date"
                icon="calendar"
              />
            </Block>
            {!fields.status && (
              <Block flex={1}>
                <Text
                  size={16}
                  bold
                  style={{ marginLeft: 20, marginBottom: 5 }}
                  color={colors.TEXT}
                >
                  Horário
                </Text>
                <DateTimePicker
                  value={fields.time}
                  onChange={(time) => setFields({ ...fields, time })}
                  mode="time"
                  icon="clock"
                />
              </Block>
            )}
          </Block>

          <Block row style={{ alignItems: "center" }}>
            <Switch
              value={fields.status}
              onChange={() => {
                setFields({ ...fields, status: !fields.status });
              }}
              trackColor={{
                false: nowTheme.COLORS.HEADER,
                true: colors.BUTTON,
              }}
            />
            <Text size={16} color={colors.TEXT}>
              Lista de espera
            </Text>
          </Block>

          <Config setFields={setFields} fields={fields} />
        </Block>
      </ScrollView>
      <Block row center>
        <Button
          style={styles.button}
          backgroundColor={colors.BUTTON_BACK}
          onPress={() => navigation.goBack()}
        >
          <Text size={16} bold color={colors.TEXT_BUTTON_BACK}>
            Voltar
          </Text>
        </Button>
        <Button
          style={styles.primary}
          backgroundColor={colors.BUTTON_REGISTER_OR_UPDATE}
          onPress={isEditing ? handleSubmitUpdate : handleSubmitCreate}
        >
          <Text size={16} bold color={colors.TEXT_BUTTON_REGISTER_UPDATE}>
            {isEditing ? "Atualizar" : "Cadastrar"}
          </Text>
        </Button>
      </Block>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  containerInput: {
    borderRadius: 30,
    borderWidth: 1,
    borderColor: nowTheme.COLORS.BORDER,
    height: 44,
    paddingHorizontal: 10,
    alignItems: "center",

    gap: 10,
  },
  group: {
    borderRadius: 10,
    padding: 8,
  },
  serviceItem: {
    paddingBottom: 7,
    paddingRight: 15,
    alignItems: "center",
  },
  button: {
    marginBottom: nowTheme.SIZES.BASE,
    borderRadius: 10,
    width: 120,
    height: 40,
    //backgroundColor: "#eee",
    borderWidth: 1,
    borderColor: nowTheme.COLORS.BORDER,
  },
  primary: {
    marginBottom: nowTheme.SIZES.BASE,
    borderRadius: 10,
    width: 120,
    height: 40,
  },

  buttonDate: {
    borderRadius: 30,
    borderWidth: 1,
    borderColor: nowTheme.COLORS.BORDER,
    height: 44,
    backgroundColor: "#FFFFFF",
    padding: 9,
    width: 178,
  },
  details: {
    borderWidth: 1,
    borderRadius: 4,
    height: 50,
    borderTopWidth: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    alignItems: "center",
  },
});

export default SchedulesForm;
