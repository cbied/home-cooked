import { DateRangePicker, Stack } from 'rsuite';

const DatePicker = () => {
  const { combine, allowedMaxDays, beforeToday } = DateRangePicker;

  return (
    <Stack spacing={6}>
            <DateRangePicker 
            size="lg" 
            placeholder="Pick a date" 
            placement='bottomEnd' 
            format={'MM/dd/yyyy'}
            shouldDisableDate={combine(allowedMaxDays(14), beforeToday())} />
    </Stack>
  )
};

export default DatePicker;