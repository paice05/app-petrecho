import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Vibration } from "react-native";
import { Block, Text, Button } from "galio-framework";

import { nowTheme } from "../../constants";

import Icon from "../Icon";
import Menu from "../Menu";
import { Modal } from "../Modal";

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

  return (
    <Block flex gap={12} space="between" style={styles.container}>
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
              <Text size={18} style={{ textDecorationLine: "underline" }}>
                {nome?.slice(0, 30)}
                {isLargeName ? "..." : ""}
              </Text>
            </Block>
          </TouchableOpacity>
          {servico && (
            <Text size={16} color="gray">
              {servico}
            </Text>
          )}
          {pacote && (
            <Text size={16} color="gray">
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
                color: nowTheme.COLORS.SWITCH_ON,
              },
              {
                onSelect: onDeleted,
                text: "Deletar",
                icon: "trash-2",
                color: nowTheme.COLORS.PRIMARY,
              },
              {
                onSelect: onRevert,
                text: "Restaurar",
                icon: "refresh-cw",
                color: nowTheme.COLORS.INFO,
                disable: status === "pending",
              },
              {
                onSelect: onFinished,
                text: "Confirmar pagamento",
                icon: "dollar-sign",
                color: nowTheme.COLORS.SUCCESS,
                disable: status !== "awaiting-payment",
              },
            ]}
          >
            <Block center style={styles.more}>
              <Icon
                size={20}
                color={nowTheme.COLORS.PRIMARY}
                name="more-vertical"
                family="feather"
              />
            </Block>
          </Menu>
        </Block>
      </Block>
      <Block row style={styles.wrapperInfo}>
        <Block row gap={5} style={styles.actionIcon}>
          <Icon
            color={nowTheme.COLORS.PRIMARY}
            name="calendar"
            family="feather"
          />
          <Text bold size={16}>
            {dia}
          </Text>
        </Block>
        {status !== "awaiting" ? (
          <Block row gap={5} style={styles.actionIcon}>
            <Icon
              color={nowTheme.COLORS.PRIMARY}
              name="clock"
              family="feather"
            />
            <Text bold size={16}>
              {horario}
            </Text>
          </Block>
        ) : null}

        <Block row gap={5} style={styles.actionIcon}>
          <Icon
            color={nowTheme.COLORS.PRIMARY}
            name={icon[status] || ""}
            family="feather"
          />
          <Text bold size={16}>
            {statusText[status] || "Não definido"}
          </Text>
        </Block>
      </Block>

      {status === "pending" && (
        <Block row style={styles.wrapperButtons}>
          <TouchableOpacity onPress={onCanceled} style={styles.button}>
            <Text bold size={16}>
              Cancelar
            </Text>
          </TouchableOpacity>
          <Menu
            styleContainer={[styles.button, styles.primary]}
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
                color: nowTheme.COLORS.PRIMARY,
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
            style={[styles.button, styles.primary]}
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
    borderColor: nowTheme.COLORS.PRIMARY,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CardSchedule;
