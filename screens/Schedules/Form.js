import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Block, Text, Switch } from "galio-framework";
import { Calendar } from "react-native-calendars";
import { useNavigation } from "@react-navigation/native";

import { useValidateRequiredFields } from "../../components/hooks/useValidateRequiredFields";
import { useRequestFindOne } from "../../components/hooks/useRequestFindOne";
import { useRequestFindMany } from "../../components/hooks/useRequestFindMany";
import { useRequestCreate } from "../../components/hooks/useRequestCreate";
import { useRequestUpdate } from "../../components/hooks/useRequestUpdate";
import { DateTimePicker } from "../../components/DatePiker";
import { Button, Icon } from "../../components";
import { useToggle } from "../../components/hooks/useToggle";
import { Modal } from "../../components/Modal";

import { formartDate } from "../../utils/formartDate";
import { nowTheme } from "../../constants";
import { Config } from "./Config";
import { UserSearch } from "../../components/UserSearch";
import { LoadingOverlay } from "../../components/LoadingOverlay";
import { useColorContext } from "../../context/colors";
import { WrapperInput } from "../../components/WrapperInput";

const SchedulesForm = ({ route }) => {
  const params = route.params;
  const isEditing = params?.itemId;

  const navigation = useNavigation();

  const [allServices, setAllServices] = useState([]);
  const [typeView, setTypeView] = useState("all"); // all | selected

  const [fields, setFields] = useState({
    user: null,
    shortName: null,
    services: [], // value label
    employee: null,
    date: formartDate(new Date(), "dd-MM-yyyy"),
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

  const { toggle, onChangeToggle } = useToggle();

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

  const {
    execute: execServices,
    response: responseServices,
    loading: loadingServices,
  } = useRequestFindMany({
    path: "/services",
    defaultQuery: { perPage: 100 },
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
        date: formartDate(response.scheduleAt, "dd-MM-yyyy"),
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

  // loading services
  useEffect(() => {
    execServices();
  }, []);

  useEffect(() => {
    validate(fields);
  }, [fields]);

  useEffect(() => {
    if (responseServices) {
      setAllServices(responseServices.data);
    }
  }, [responseServices]);

  const handleSubmitCreate = async () => {
    if (Object.values(errors).filter(Boolean).length) return;

    const [day, month, year] = fields.date.split("-");
    const scheduleAt = new Date(
      `${year}-${month}-${day} ${formartDate(fields.time, "HH:mm")}:00`
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

    const [day, month, year] = fields.date.split("-");
    const scheduleAt = new Date(
      `${year}-${month}-${day} ${formartDate(fields.time, "HH:mm")}:00`
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

  const handleChangeService = ({ serviceId }) => {
    if (fields.services.findIndex((item) => item.id === serviceId) !== -1) {
      setFields({
        ...fields,
        services: fields.services.filter((item) => item.id !== serviceId),
      });

      return;
    }

    setFields({
      ...fields,
      services: [...fields.services, { id: serviceId, isPackage: false }],
    });
  };

  const handleChangeServiceIsPackage = ({ serviceId, isPackage }) => {
    setFields({
      ...fields,
      services: fields.services.map((item) => {
        if (item.id === serviceId) {
          return {
            ...item,
            isPackage: isPackage,
          };
        }

        return item;
      }),
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.BACKGROUND }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LoadingOverlay
          visible={loading || loadingServices || loadingCreate || loadingUpdate}
        />
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
              <TouchableOpacity
                onPress={onChangeToggle}
                style={[styles.buttonDate, { backgroundColor: "transparent" }]}
              >
                <Block row gap={10} style={{ alignItems: "center" }}>
                  <Icon
                    size={16}
                    color={colors.ICON}
                    name="calendar"
                    family="feather"
                  />
                  <Text
                    size={16}
                    style={{ height: 20 }}
                    color={colors.SUB_TEXT}
                  >
                    {fields.date}
                  </Text>
                </Block>
              </TouchableOpacity>
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

      <Modal
        title="Selecione uma data"
        isVisible={toggle}
        onRequestClose={onChangeToggle}
        handleCancel={onChangeToggle}
      >
        <Calendar
          onDayPress={(value) => {
            const [year, month, day] = value.dateString.split("-");

            setFields({ ...fields, date: `${day}-${month}-${year}` });
            onChangeToggle();
          }}
          style={{
            color: colors.SUB_TEXT,
            //backgroundColor: colors.BACKGROUND_CARD,
          }}
        />
      </Modal>
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
