import { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Block, Text } from "galio-framework";
import { useNavigation } from "@react-navigation/native";

import { useColorContext } from "../../context/colors";
import CustomInput from "../../components/CustomInput";
import { Icon, Button } from "../../components";
import CustomTextInput from "../../components/CustomTextInput";
import { nowTheme } from "../../constants";
import { DateTimePicker } from "../../components/DatePiker";
import { CustomSelectBottom } from "../../components/CustomSelectBottom";
import { CustomInputTouch } from "../../components/CustomInputTouch";
import { useValidateRequiredFields } from "../../components/hooks/useValidateRequiredFields";
import { useRequestCreate } from "../../components/hooks/useRequestCreate";
import { CustomInputRadio } from "../../components/CustomInputRadio";
import { LoadingOverlay } from "../../components/LoadingOverlay";
import { useRequestFindOne } from "../../components/hooks/useRequestFindOne";
import { useRequestUpdate } from "../../components/hooks/useRequestUpdate";

const optionsTimes = [
  { title: "30 minutos", data: 0.5 },
  { title: "1 hora", data: 1 },
  { title: "2 horas", data: 2 },
];

export function CampaignForm({ route }) {
  const { colors } = useColorContext();
  const navigation = useNavigation();

  const params = route.params;
  const isEditing = params?.itemId;

  const [fields, setFields] = useState({
    name: "",
    type: "clients", // clients | schedules
    clients: [],
    scheduleAt: null,
    timeBeforeSchedule: null,
    typeContent: "manual", // manual | template,
    content: "",
    template: null,
  });

  const { validate, errors } = useValidateRequiredFields({
    fields: ["name"],
  });

  const {
    execute: execFindOne,
    response,
    loading: loadingFindOne,
  } = useRequestFindOne({
    path: "/campaigns",
    id: params?.itemId,
  });

  const {
    execute: execCreate,
    response: responseCreated,
    loading: loadingCreate,
  } = useRequestCreate({
    path: "/campaigns",
  });

  const {
    execute: execUpdate,
    response: responseUpdate,
    loading: loadingUpdate,
  } = useRequestUpdate({
    path: "/campaigns",
    id: params?.itemId,
  });

  useEffect(() => {
    if (isEditing) execFindOne();
  }, []);

  useEffect(() => {
    if (responseCreated) navigation.goBack();
    if (responseUpdate) navigation.goBack();
  }, [responseCreated, responseUpdate]);

  useEffect(() => {
    if (response) {
      setFields({
        ...fields,
        name: response.name,
        type: response.users.length ? "clients" : "schedules",
        clients: response.users.length
          ? response.users.map((item) => ({ label: item.name, value: item.id }))
          : [],
        scheduleAt: response.scheduleAt ? new Date(response.scheduleAt) : null,
        timeBeforeSchedule: response.timeBeforeSchedule
          ? optionsTimes.find(
              (item) => item.data === Number(response.timeBeforeSchedule)
            )
          : null,
        typeContent: response.templateId ? "template" : "manual",
        content: response.content,
        template: response.templateId
          ? { label: response.template.title, value: response.template.id }
          : null,
      });
    }
  }, [response]);

  console.log(response);

  const handleSubmit = () => {
    if (Object.values(errors).filter(Boolean).length) return;

    // payload
    const payload = fields;
    payload.status = "pending";

    if (payload.type === "clients") {
      payload.users = payload.clients.map((item) => item.value);

      delete payload.timeBeforeSchedule;
      delete payload.scheduleAt;
    }

    if (payload.type === "schedules") {
      payload.timeBeforeSchedule = payload.timeBeforeSchedule.data;

      delete payload.clients;
    }

    if (payload.typeContent === "template") {
      payload.templateId = payload.template.value;

      payload.content = "";
    }

    if (payload.typeContent === "manual") {
      payload.templateId = null;
    }

    if (isEditing) execUpdate(payload);
    else execCreate(payload);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.BACKGROUND }]}>
      <LoadingOverlay
        visible={loadingCreate || loadingFindOne || loadingUpdate}
      />
      <ScrollView showsVerticalScrollIndicator={true}>
        <Block
          gap={25}
          style={[
            styles.cardContainer,
            { backgroundColor: colors.BACKGROUND_CARD },
          ]}
        >
          <Block>
            <CustomInput
              labelText="Nome da campanha"
              placeholder="Digite o nome da campanha"
              value={fields.name}
              onChangeText={(value) => setFields({ ...fields, name: value })}
              iconContent={
                <Icon
                  size={16}
                  name="at-sign"
                  style={{ color: colors.ICON, marginRight: 12 }}
                />
              }
            />
            {errors?.["name"] && (
              <Text center size={14} color={colors.DANGER}>
                campo obrigatório
              </Text>
            )}
          </Block>

          <Block gap={10}>
            <Block row gap={20} style={{ marginLeft: 20 }}>
              <CustomInputRadio
                label="Clientes"
                onChange={() => setFields({ ...fields, type: "clients" })}
                checked={fields.type === "clients"}
              />
              <CustomInputRadio
                label="Agendamentos"
                onChange={() => setFields({ ...fields, type: "schedules" })}
                checked={fields.type === "schedules"}
              />
            </Block>

            {fields.type === "clients" && (
              <CustomInputTouch
                label="Clientes"
                value={
                  fields.clients.length > 3
                    ? `${fields.clients
                        .slice(0, 3)
                        .map((item) => item.label)
                        .join(" - ")} + ${fields.clients.length - 3}`
                    : fields.clients.map((item) => item.label).join(" - ")
                }
                placeholder="Selecione alguns clientes"
                icon="users"
                onPress={() => {
                  navigation.navigate("CampaignComponentsClients", {
                    fields,
                    setFields,
                  });
                }}
              />
            )}

            {fields.type === "schedules" && (
              <Block>
                <Block flex={1}>
                  <Text
                    size={16}
                    bold
                    style={{ marginLeft: 20, marginBottom: 5 }}
                    color={colors.TEXT}
                  >
                    Data dos agendamentos
                  </Text>
                  <DateTimePicker
                    value={fields.scheduleAt}
                    onChange={(date) =>
                      setFields({ ...fields, scheduleAt: date })
                    }
                    placeholder="Selecione uma data"
                    mode="date"
                    icon="calendar"
                    formart="dd MMMM"
                  />
                </Block>
              </Block>
            )}

            {fields.type === "schedules" && (
              <Block>
                <CustomSelectBottom
                  labelText="Tempo antes de envio"
                  placeholder="Escolha tempo antes para enviar"
                  value={fields.timeBeforeSchedule}
                  onChange={(item) =>
                    setFields({ ...fields, timeBeforeSchedule: item })
                  }
                  options={optionsTimes}
                />
              </Block>
            )}
          </Block>

          <Block gap={10}>
            <Block row gap={20} style={{ marginLeft: 20 }}>
              <CustomInputRadio
                onChange={() => setFields({ ...fields, typeContent: "manual" })}
                label="Escrever"
                checked={fields.typeContent === "manual"}
              />
              <CustomInputRadio
                onChange={() =>
                  setFields({ ...fields, typeContent: "template" })
                }
                label="Template"
                checked={fields.typeContent === "template"}
              />
            </Block>

            {fields.typeContent === "manual" && (
              <CustomTextInput
                labelText="Conteúdo"
                rows={8}
                numbersOfLines={8}
                placeholder="Digite aqui o conteúdo que deseja enviar..."
                onChangeText={(value) =>
                  setFields({ ...fields, content: value })
                }
                value={fields.content}
              />
            )}

            {fields.typeContent === "template" && (
              <CustomInputTouch
                label="Template"
                value={fields.template?.label}
                placeholder="Selecione um template"
                icon="book"
                onPress={() => {
                  navigation.navigate("CampaignComponentsTemplates", {
                    fields,
                    setFields,
                  });
                }}
              />
            )}
          </Block>
        </Block>
      </ScrollView>

      <Block row center style={styles.buttonContainer}>
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
          onPress={handleSubmit}
          backgroundColor={colors.BUTTON_REGISTER_OR_UPDATE}
        >
          <Text size={16} bold color={colors.TEXT_BUTTON_REGISTER_UPDATE}>
            {isEditing ? "Atualizar" : "Cadastrar"}
          </Text>
        </Button>
      </Block>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  cardContainer: {
    borderRadius: 10,
    padding: 10,
  },
  cardUserList: {
    borderRadius: 10,
    borderWidth: 1,

    padding: 7,
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
  },
  buttonContainer: {
    paddingHorizontal: nowTheme.SIZES.BASE,
  },
});
