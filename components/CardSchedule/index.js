import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Vibration } from "react-native";
import { Block, Text, Button } from "galio-framework";

import { nowTheme } from "../../constants";

import Icon from "../Icon";
import Menu from "../Menu";
import { Modal } from "../Modal";
import { useColorContext } from "../../context/colors";

const CardSchedule = ({
  navigation,
  id,
  nome,
  funcionario,
  servico,
  dia,
  pacote,
  horario,
  status,
  onFinished,
  onFinishedAwaitingPayment,
  onCanceled,
  onDeleted,
  onRevert,
  onAwaiting,
}) => {
  const isLargeName = nome?.length > 30;

  const statusText = {
    pending: "Pendente",
    finished: "Finalizado",
    canceled: "Cancelado",
    awaiting: "Aguardando",
    "awaiting-payment": "A pagar",
  };

  const icon = {
    pending: "alert-circle",
    finished: "check-circle",
    canceled: "x-circle",
    awaiting: "alert-circle",
    "awaiting-payment": "thumbs-down",
  };

  const { colors } = useColorContext();

  return (
    <Block
      flex
      gap={12}
      space="between"
      style={[styles.container, { backgroundColor: colors.BACKGROUND_CARD }]}
    >
      <Block row space="between">
        <Block gap={5} style={styles.wrapperName}>
          <TouchableOpacity
            onPress={() => {
              const vibrationDuration = 100;

              // Faz o dispositivo vibrar
              Vibration.vibrate(vibrationDuration);

              navigation.navigate("ScheduleForm", {
                itemId: id,
              });
            }}
          >
            <Block row style={{ alignItems: "center" }}>
              <Text
                size={18}
                style={{ textDecorationLine: "underline" }}
                color={colors.TEXT}
              >
                {nome?.slice(0, 30)}
                {isLargeName ? "..." : ""}
              </Text>
            </Block>
          </TouchableOpacity>
          {servico && (
            <Text size={16} color={colors.SUB_TEXT}>
              {servico}
            </Text>
          )}
          {pacote && (
            <Text size={16} color={colors.SUB_TEXT}>
              Pacote: {pacote}
            </Text>
          )}
        </Block>

        <Block>
          <Menu
            items={[
              {
                onSelect: () =>
                  navigation.navigate("ScheduleForm", {
                    itemId: id,
                  }),
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
              {
                onSelect: onRevert,
                text: "Restaurar",
                icon: "refresh-cw",
                color: colors.TEXT,
                disable: status === "pending",
              },
              {
                onSelect: onFinished,
                text: "Confirmar pagamento",
                icon: "dollar-sign",
                color: colors.TEXT,
                disable: status !== "awaiting-payment",
              },
            ]}
          >
            <Block center style={[styles.more, { borderColor: colors.ICON }]}>
              <Icon
                size={20}
                color={colors.ICON}
                name="more-vertical"
                family="feather"
              />
            </Block>
          </Menu>
        </Block>
      </Block>
      <Block row style={styles.wrapperInfo}>
        <Block row gap={5} style={styles.actionIcon}>
          <Icon color={colors.ICON} name="calendar" family="feather" />
          <Text bold size={16} color={colors.TEXT}>
            {dia}
          </Text>
        </Block>
        {status !== "awaiting" ? (
          <Block row gap={5} style={styles.actionIcon}>
            <Icon color={colors.ICON} name="clock" family="feather" />
            <Text bold size={16} color={colors.TEXT}>
              {horario}
            </Text>
          </Block>
        ) : null}

        <Block row gap={5} style={styles.actionIcon}>
          <Icon
            color={colors.ICON}
            name={icon[status] || ""}
            family="feather"
          />
          <Text bold size={16} color={colors.TEXT}>
            {statusText[status] || "Não definido"}
          </Text>
        </Block>
      </Block>

      {status === "pending" && (
        <Block row style={styles.wrapperButtons}>
          <TouchableOpacity
            onPress={onCanceled}
            style={[styles.button, { backgroundColor: colors.BUTTON_BACK }]}
          >
            <Text bold size={16}>
              Cancelar
            </Text>
          </TouchableOpacity>
          <Menu
            styleContainer={[
              styles.button,
              { backgroundColor: colors.BUTTON_REGISTER_OR_UPDATE },
            ]}
            items={[
              {
                onSelect: onFinished,
                text: "Pago",
                icon: "dollar-sign",
                color: nowTheme.COLORS.SUCCESS,
              },
              {
                onSelect: onFinishedAwaitingPayment,
                text: "A pagar",
                icon: "thumbs-down",
                color: colors.BUTTON,
              },
            ]}
          >
            <Text color="white" bold size={16}>
              Confirmar
            </Text>
          </Menu>
        </Block>
      )}
      {status === "awaiting" && (
        <Block row style={styles.wrapperButtons}>
          <TouchableOpacity
            onPress={onAwaiting}
            style={[
              styles.button,
              { backgroundColor: colors.BUTTON_REGISTER_OR_UPDATE },
            ]}
          >
            <Text color="white" bold size={16}>
              Converter em agendamento
            </Text>
          </TouchableOpacity>
        </Block>
      )}
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  wrapperName: {
    paddingBottom: 20,
  },
  wrapperInfo: {
    justifyContent: "center",
    gap: 25,
  },
  wrapperButtons: {
    justifyContent: "center",
    gap: 15,
  },

  button: {
    borderRadius: 10,
    backgroundColor: "#eee",
    paddingHorizontal: 20,
    paddingVertical: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  primary: {
    backgroundColor: nowTheme.COLORS.PRIMARY,
  },
  actionIcon: {
    alignItems: "center",
  },
  more: {
    width: 35,
    height: 35,
    borderWidth: 1,
    borderStyle: "solid",
    //borderColor: nowTheme.COLORS.PRIMARY,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CardSchedule;
