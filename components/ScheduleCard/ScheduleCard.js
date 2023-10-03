import React from "react";
import { View, StyleSheet, TouchableOpacity, Share } from "react-native";
import { Text, Block } from "galio-framework";

import { nowTheme } from "../../constants";
import { URL_WEB } from "../../constants/node";
import IconExtra from "../Icon";
import { useTimeSlots } from "../hooks/useTimeSlots";
import { useUserContext } from "../../context/user";
import { useColorContext } from "../../context/colors";

export const ScheduleCard = ({
  startAt = 7,
  endAt = 20.5,
  payload,
  onConfirm,
  selected = "",
}) => {
  const { timeSlots } = useTimeSlots({ payload, startAt, endAt });
  const { user } = useUserContext();

  const LINK = `${URL_WEB}/${user.account.id}`;

  const handleShare = async () => {
    Share.share({
      message: LINK,
      title: "1 link selecionado",
    });
  };

  const { colors } = useColorContext();

  return (
    <View
      style={[styles.scheduleCard, { backgroundColor: colors.BACKGROUND_CARD }]}
    >
      <Block center style={{ marginTop: 10 }}>
        <Text>
          {timeSlots.map(({ time, schedule }, index) => (
            <Block key={index}>
              <TouchableOpacity
                onPress={() => {
                  if (onConfirm) onConfirm(time);
                }}
              >
                <Text
                  center
                  size={16}
                  style={
                    schedule
                      ? [
                          styles.timeSlot,
                          { backgroundColor: colors.LIST_TIME_BUTTON },
                        ]
                      : time === selected
                      ? styles.timeSlotOn
                      : [
                          styles.timeSlotOff,
                          {
                            color: colors.SUB_TEXT,
                            borderColor: colors.SUB_TEXT,
                          },
                        ]
                  }
                >
                  {time}
                </Text>
              </TouchableOpacity>
            </Block>
          ))}
        </Text>

        {!onConfirm && (
          <TouchableOpacity onPress={handleShare} style={{ padding: 14 }}>
            <Block row center gap={10}>
              <IconExtra color={colors.ICON} size={18} name="share-2" />
              <Text color={colors.ICON} size={18}>
                Compartilhar
              </Text>
            </Block>
          </TouchableOpacity>
        )}
      </Block>
    </View>
  );
};

const styles = StyleSheet.create({
  scheduleCard: {
    borderRadius: 8,
    marginVertical: 10,
    paddingVertical: 4,
  },
  timeSlot: {
    width: 60,
    height: 40,
    padding: 8,
    margin: 4,

    borderWidth: 1,
    borderRadius: 5,
    color: "#fff",
    borderColor: "#fff",
  },
  timeSlotOff: {
    width: 60,
    height: 40,
    padding: 8,
    margin: 4,

    borderWidth: 1,
    borderRadius: 5,
  },
  timeSlotOn: {
    width: 60,
    height: 40,
    padding: 8,
    margin: 4,

    borderWidth: 1,
    borderRadius: 5,
    color: "#fff",
    borderColor: "#fff",
    backgroundColor: nowTheme.COLORS.SUCCESS,
  },
});

export default ScheduleCard;
