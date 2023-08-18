import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Block } from 'galio-framework';
import { nowTheme } from '../../constants';

export const ScheduleCard = ({ startAt = 7, endAt = 20.5, payload }) => {
  const startTime = startAt * 60;
  const endTime = endAt * 60;
  const interval = 30;

  const timeSlots = [];
  for (let i = startTime; i <= endTime; i += interval) {
    const hours = Math.floor(i / 60);
    const minutes = i % 60;
    const timeString = `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}`;

    if (payload.includes(timeString)) {
      timeSlots.push({ time: timeString, schedule: true });

      continue;
    }

    timeSlots.push({ time: timeString, schedule: false });
  }

  return (
    <View style={styles.scheduleCard}>
      <Block center>
        <Text>
          {timeSlots.map(({ time, schedule }, index) => (
            <Block key={index}>
              <TouchableOpacity>
                <Text size={14} style={schedule ? styles.timeSlot : styles.timeSlotOff}>
                  {time}
                </Text>
              </TouchableOpacity>
            </Block>
          ))}
        </Text>
      </Block>
    </View>
  );
};

const styles = StyleSheet.create({
  scheduleCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginVertical: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  timeSlot: {
    width: 55,
    marginBottom: 8,
    marginHorizontal: 8,

    backgroundColor: nowTheme.COLORS.PRIMARY,
    color: '#fff',
    paddingHorizontal: 8,
    borderRadius: 5,
    padding: 8,
  },
  timeSlotOff: {
    width: 55,
    marginBottom: 8,
    marginHorizontal: 8,

    paddingHorizontal: 8,
    borderRadius: 5,
    padding: 8,

    borderWidth: 1,
    color: 'gray',
    borderColor: 'gray',
  },
});

export default ScheduleCard;
