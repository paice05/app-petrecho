import React from 'react';

import { LocaleConfig, Calendar as Calendars } from 'react-native-calendars';

LocaleConfig.locales['pt-BR'] = {
  monthNames: [
    'janeiro',
    'fevereiro',
    'março',
    'abril',
    'maio',
    'junho',
    'julho',
    'agosto',
    'setembro',
    'outubro',
    'novembro',
    'dezembro',
  ],
  monthNamesShort: [
    'jan',
    'fev',
    'mar',
    'abr',
    'maio',
    'jun',
    'jul',
    'ago',
    'set',
    'out',
    'nov',
    'dez',
  ],
  dayNames: [
    'domingo',
    'segunda-feira',
    'terça-feira',
    'quarta-feira',
    'quinta-feira',
    'sexta-feira',
    'sábado	',
  ],
  dayNamesShort: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'],
};

LocaleConfig.defaultLocale = 'pt-BR';

export const Calendar = ({ onChange, currentDate = new Date() }) => {
  return (
    <Calendars
      onDayPress={(day) => {
        onChange(
          `${day.year}-${day.month < 10 ? `0${day.month}` : day.month}-${
            day.day < 10 ? `0${day.day}` : day.day
          }`
        );
      }}
      current={currentDate}
    />
  );
};
