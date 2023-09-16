export function useTimeSlots({ startAt = 7, endAt = 20.5, payload }) {
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

  return {
    timeSlots,
  };
}
