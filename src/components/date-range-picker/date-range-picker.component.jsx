import { DateRangePicker, Stack } from 'rsuite';
import addDays from 'date-fns/addDays';

const DatePicker = ({ placement, showOneCalendar }) => {
  const { combine, allowedMaxDays, beforeToday } = DateRangePicker;
  const predefinedRanges = [
  {
    label: 'One week',
    value: [new Date(), addDays(new Date(), 7)]
  },
  {
    label: 'One month',
    value: [new Date(), addDays(new Date(), 30)]
  }
];

  return (
    <Stack>
      <Stack.Item>
        <DateRangePicker 
        size="lg" 
        placement={placement} 
        ranges={predefinedRanges}
        placeholder="Pick a date" 
        format={'MM/dd/yyyy'}
        showOneCalendar={showOneCalendar}
        shouldDisableDate={combine(allowedMaxDays(32), beforeToday())} />
      </Stack.Item>
    </Stack>
  )
};

export default DatePicker;