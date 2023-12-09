import { useState } from "react";
import { Block, Text, Button } from "galio-framework";
import { TouchableOpacity } from "react-native";

import { DateTimePicker } from "../../../components/DatePiker";
import { useColorContext } from "../../../context/colors";
import { formartDate } from "../../../utils/formartDate";

export const DOMINGO = "DOMINGO";
export const SEGUNDA = "SEGUNDA-FEIRA";
export const TERCA = "TERÇA-FEIRA";
export const QUARTA = "QUARTA-FEIRA";
export const QUINTA = "QUINTA-FEIRA";
export const SEXTA = "SEXTA-FEIRA";
export const SABADO = "SABADO";

const days = [DOMINGO, SEGUNDA, TERCA, QUARTA, QUINTA, SEXTA, SABADO];

const MESSAGE_WITHOU_HOUR = "Sem horário definido";
const DEFAULT_FORMART_HOUR = "HH:mm";

export function DayOfWeek({ visibleDays, weekHours, handleChangeWeekHour }) {
  const { colors } = useColorContext();

  const [diaDaSemana, setDiaDaSemana] = useState("");
  const [startAt, setStartAt] = useState({
    start: null,
    end: null,
  });
  const [endAt, setEndAt] = useState({
    start: null,
    end: null,
  });

  const handleToggleConfigDay = (day) => {
    if (diaDaSemana === day) {
      setDiaDaSemana("");

      return;
    }

    setDiaDaSemana(day);
  };

  return (
    <Block>
      {days.map((day) => {
        if (!visibleDays.includes(day.substring(0, 3))) return null;

        return (
          <Block key={day}>
            <TouchableOpacity
              onPress={() => handleToggleConfigDay(day)}
              style={{ paddingVertical: 15 }}
            >
              <Block row space="between" alignItems="ccenter">
                <Text size={16} bold color={colors.TEXT}>
                  {day}
                </Text>

                <Text size={16} bold color={colors.ICON}>
                  {weekHours?.[day]
                    ? `${weekHours[day][0]
                        .map((item) => formartDate(item, DEFAULT_FORMART_HOUR))
                        .join(" ")} - ${weekHours[day][1]
                        .map((item) => formartDate(item, DEFAULT_FORMART_HOUR))
                        .join(" ")}`
                    : MESSAGE_WITHOU_HOUR}
                </Text>
              </Block>
            </TouchableOpacity>

            {diaDaSemana === day && (
              <Block gap={10}>
                <Block gap={10} alignItems="flex-end">
                  <Block row alignItems="center" gap={10}>
                    <Text size={16} bold color={colors.TEXT}>
                      Inicio
                    </Text>
                    <DateTimePicker
                      value={
                        startAt.start ||
                        weekHours?.[day]?.[0]?.[0] ||
                        new Date()
                      }
                      onChange={(time) =>
                        setStartAt((prevState) => ({
                          ...prevState,
                          start: time,
                        }))
                      }
                      mode="time"
                      icon="clock"
                    />
                    <DateTimePicker
                      value={
                        startAt.end || weekHours?.[day]?.[0]?.[1] || new Date()
                      }
                      onChange={(time) =>
                        setStartAt((prevState) => ({ ...prevState, end: time }))
                      }
                      mode="time"
                      icon="clock"
                    />
                  </Block>

                  <Block
                    row
                    borderTopWidth={1}
                    borderBottomWidth={1}
                    borderColor={colors.ICON}
                  >
                    <Text
                      color={colors.TEXT}
                      width={190}
                      center
                      paddingVertical={3}
                    >
                      Almoço
                    </Text>
                  </Block>

                  <Block row alignItems="center" gap={10}>
                    <Text size={16} bold color={colors.TEXT}>
                      Fim
                    </Text>
                    <DateTimePicker
                      value={
                        endAt.start || weekHours?.[day]?.[1]?.[0] || new Date()
                      }
                      onChange={(time) =>
                        setEndAt((prevState) => ({ ...prevState, start: time }))
                      }
                      mode="time"
                      icon="clock"
                    />
                    <DateTimePicker
                      value={
                        endAt.end || weekHours?.[day]?.[1]?.[1] || new Date()
                      }
                      onChange={(time) =>
                        setEndAt((prevState) => ({ ...prevState, end: time }))
                      }
                      mode="time"
                      icon="clock"
                    />
                  </Block>
                </Block>
                <Block center>
                  <Button
                    color={colors.BACKGROUND}
                    //   size="small"
                    onPress={() =>
                      handleChangeWeekHour({
                        day: day,
                        startAt: [
                          startAt.start || weekHours?.[day]?.[0]?.[0],
                          startAt.end || weekHours?.[day]?.[0]?.[1],
                        ],
                        endAt: [
                          endAt.start || weekHours?.[day]?.[1]?.[0],
                          endAt.end || weekHours?.[day]?.[1]?.[1],
                        ],
                      })
                    }
                  >
                    <Text size={16} bold color={colors.TEXT}>
                      Definir novo horário
                    </Text>
                  </Button>
                </Block>
              </Block>
            )}
          </Block>
        );
      })}
    </Block>
  );
}
