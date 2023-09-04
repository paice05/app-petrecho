import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt';

export const formartDate = (date, defaultFormat = 'dd/MM/YYY') =>
  format(new Date(date), defaultFormat, { locale: ptBR });
