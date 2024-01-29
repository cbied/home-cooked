import { DateRangePicker, Stack } from 'rsuite';

const DatePicker = () => {

  return (
    <Stack spacing={6}>
            <DateRangePicker size="lg" placeholder="Pick a date" placement='bottomEnd' />
    </Stack>
  )
};

export default DatePicker;