import { adicionarMinutos } from "../../helpers/addMinutes";

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

    if (payload.some((item) => item.scheduleAt.includes(timeString))) {
      timeSlots.push({ time: timeString, schedule: true });

      continue;
    }

    const times = payload
      .map((item) => ({
        time: item.scheduleAt,
        count: item.averageTime ? Math.ceil(item.averageTime / interval) : null,
      }))
      .filter((item) => item.count);

    let parar = false;
    for (let x = 0; x < times.length; x++) {
      const elementX = times[x];

      for (let y = 1; y <= elementX.count - 1; y++) {
        const check = adicionarMinutos(elementX.time, y * interval);

        if (check === timeString) {
          parar = true;
          timeSlots.push({ time: timeString, schedule: true });
          continue;
        }
      }
    }

    if (parar) continue;

    timeSlots.push({ time: timeString, schedule: false });
  }

  return {
    timeSlots,
  };
}
