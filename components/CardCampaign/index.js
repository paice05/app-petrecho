import { Block, Text } from "galio-framework";
import { StyleSheet, TouchableOpacity, Vibration } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useColorContext } from "../../context/colors";
import Icon from "../Icon";
import Menu from "../Menu";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const statusViewd = {
  pending: "Pendente",
  processing: "Processando",
  done: "Finalizado",
  error: "Erro",
};

export function CardCampaign({
  id,
  name,
  content,
  status,
  scheduleAt,
  countSchedules,
  template,
  start,
  onDeleted,
}) {
  const { colors } = useColorContext();
  const navigation = useNavigation();

  return (
    <Block
      style={[styles.container, { backgroundColor: colors.BACKGROUND_CARD }]}
      gap={30}
    >
      <Block row space="between">
        <Block>
          <TouchableOpacity
            onPress={() => {
              const vibrationDuration = 100;
              Vibration.vibrate(vibrationDuration);

              navigation.navigate("CampaignForm", {
                itemId: id,
              });
            }}
          >
            <Text
              color={colors.TEXT}
              size={18}
              style={{ textDecorationLine: "underline" }}
            >
              {name}
            </Text>
          </TouchableOpacity>

          <Text size={16} color={colors.SUB_TEXT}>
            {content}
            {template}
          </Text>
        </Block>
        <Menu
          items={[
            {
              onSelect: () => {
                navigation.navigate("CampaignReport", {
                  itemId: id,
                });
              },
              text: "Relatório",
              icon: "eye",
              color: colors.TEXT,
            },
            {
              onSelect: () => {
                navigation.navigate("CampaignForm", {
                  itemId: id,
                });
              },
              text: "Editar",
              icon: "edit",
              color: colors.TEXT,
            },
            {
              onSelect: onDeleted,
              text: "Deletar",
              icon: "trash-2",
              color: colors.TEXT,
            },
          ]}
        >
          <Block center style={[styles.more, { borderColor: colors.TEXT }]}>
            <Icon
              size={20}
              color={colors.TEXT}
              name="more-vertical"
              family="feather"
            />
          </Block>
        </Menu>
      </Block>

      <Block row center gap={20}>
        <Block row gap={10}>
          <Icon size={18} color={colors.ICON} name="users" />
          <Text size={16} bold color={colors.TEXT}>
            {countSchedules}
          </Text>
        </Block>
        <Block row gap={10}>
          <Icon size={18} color={colors.ICON} name="calendar" />
          <Text size={16} bold color={colors.TEXT}>
            {format(new Date(scheduleAt), "dd/MMMM", { locale: ptBR })}
          </Text>
        </Block>
        <Block row gap={10}>
          <Icon size={18} color={colors.ICON} name="pie-chart" />
          <Text size={16} bold color={colors.TEXT}>
            {statusViewd[status] || "Indefinido"}
          </Text>
        </Block>
      </Block>
      {status === "pending" && (
        <Block center>
          <TouchableOpacity
            onPress={start}
            style={[
              styles.button,
              { backgroundColor: colors.BUTTON_REGISTER_OR_UPDATE },
            ]}
          >
            <Text bold size={16} color="#fff">
              Iniciar envio
            </Text>
          </TouchableOpacity>
        </Block>
      )}
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 5,
    marginBottom: 16,
  },
  more: {
    width: 35,
    height: 35,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    maxWidth: 200,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
