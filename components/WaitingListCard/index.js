import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Vibration } from "react-native";
import { Block, Text, Button } from "galio-framework";

import { nowTheme } from "../../constants";

import Icon from "../Icon";
import Menu from "../Menu";
import { Modal } from "../Modal";

const WaitingListCard = ({
  navigation,
  id,
  nome,
  funcionario,
  servico,
  dia,
  status,
  pacote,
  onAwaiting,
  onDeleted,
}) => {
  const isLargeName = nome?.length > 30;

  const statusText = {
    awaiting: "Aguardando",
  };

  const icon = {
    awaiting: "alert-circle",
  };

  const [openScheduleCard, setOpenScheduleCard] = useState(false);

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
              {pacote ? (
                <Text color="gray" size={12}>
                  {" "}
                  (pacote)
                </Text>
              ) : null}
            </Block>
          </TouchableOpacity>
          <Text size={16} color="gray">
            {servico}
          </Text>
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
            ]}
          />
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

      <Block row style={styles.wrapperButtons}>
        <TouchableOpacity
          onPress={() => setOpenScheduleCard(true)}
          style={[styles.button, styles.primary]}
        >
          <Text color="white" bold size={16}>
            Converter em agendamento
          </Text>
        </TouchableOpacity>
      </Block>

      <Modal
        title="Selecione uma data"
        isVisible={openScheduleCard}
        onRequestClose={setOpenScheduleCard}
        handleCancel={setOpenScheduleCard}
      >
        <Text>Horários Disponiveis</Text>
      </Modal>
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
    marginTop: 5,
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
});

export default WaitingListCard;
