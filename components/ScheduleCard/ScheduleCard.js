import React, { useRef, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, Block } from "galio-framework";
import * as Sharing from "expo-sharing";
import ViewShot from "react-native-view-shot";

import { nowTheme } from "../../constants";
import IconExtra from "../Icon";

export const ScheduleCard = ({ startAt = 7, endAt = 20.5, payload }) => {
  const startTime = startAt * 60;
  const endTime = endAt * 60;
  const interval = 30;

  const timeSlots = [];
  for (let i = startTime; i <= endTime; i += interval) {
    const hours = Math.floor(i / 60);
    const minutes = i % 60;
    const timeString = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;

    if (payload.includes(timeString)) {
      timeSlots.push({ time: timeString, schedule: true });

      continue;
    }

    timeSlots.push({ time: timeString, schedule: false });
  }

  const ref = useRef();

  const handleShare = async () => {
    if (ref.current) {
      // tirar o print
      const uri = await ref.current.capture();

      // verificar se o compartilhamento esta disponivel
      const enable = await Sharing.isAvailableAsync();

      if (enable) {
        // compartilhar
        await Sharing.shareAsync(uri, {});
      }
    }
  };

  return (
    <View style={styles.scheduleCard}>
      <Block center>
        <ViewShot ref={ref}>
          <Text>
            {timeSlots.map(({ time, schedule }, index) => (
              <Block key={index}>
                <TouchableOpacity>
                  <Text
                    center
                    size={16}
                    style={schedule ? styles.timeSlot : styles.timeSlotOff}
                  >
                    {time}
                  </Text>
                </TouchableOpacity>
              </Block>
            ))}
          </Text>
        </ViewShot>

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
});

export default ScheduleCard;
