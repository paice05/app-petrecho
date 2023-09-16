import React from "react";
import { View, StyleSheet, TouchableOpacity, Share } from "react-native";
import { Text, Block } from "galio-framework";

import { nowTheme } from "../../constants";
import { URL_WEB } from "../../constants/node";
import IconExtra from "../Icon";
import { useTimeSlots } from "../hooks/useTimeSlots";
import { useUserContext } from "../../context/user";

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

  return (
    <View style={styles.scheduleCard}>
      <Block center>
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
                      ? styles.timeSlot
                      : time === selected
                      ? styles.timeSlotOn
                      : styles.timeSlotOff
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
              <IconExtra
                color={nowTheme.COLORS.PRIMARY}
                size={18}
                name="share-2"
              />
              <Text color={nowTheme.COLORS.PRIMARY} size={18}>
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
    backgroundColor: "#fff",
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
    backgroundColor: nowTheme.COLORS.PRIMARY,
  },
  timeSlotOff: {
    width: 60,
    height: 40,
    padding: 8,
    margin: 4,

    borderWidth: 1,
    borderRadius: 5,

    color: "gray",
    borderColor: "gray",
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
