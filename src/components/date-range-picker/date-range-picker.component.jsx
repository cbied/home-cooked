import { useDispatch, useSelector } from 'react-redux';
import { setDateRange } from '../../store/experience-finder-slice/experience-finder-slice';
import { DateRangePicker, Stack } from 'rsuite';
import addDays from 'date-fns/addDays';

const DatePicker = ({ placement, showOneCalendar, largeStyles }) => {
  const dispatch = useDispatch()
  const dateRange = useSelector(state => state.experienceFinder.dateRange);
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

const handleDateRangeChange = (dateRange) => {
  if(dateRange) {
    const updateDateRange = [
      dateRange[0].toString(),
      dateRange[1].toString()
    ]
    dispatch(setDateRange(updateDateRange))
  } else {
    dispatch(setDateRange(null))

  }
}

  return (
    <Stack>
      <Stack.Item>
        <DateRangePicker 
        onChange={(dateRange) => handleDateRangeChange(dateRange)}
        size="lg" 
        style={largeStyles}
        placement={placement} 
        ranges={predefinedRanges}
        placeholder="Pick a date" 
        format={'MM/dd/yyyy'}
        showOneCalendar={showOneCalendar}
        shouldDisableDate={combine(allowedMaxDays(32), beforeToday())} 
        value={dateRange ? [new Date(dateRange[0]), new Date(dateRange[1])]: null} />
      </Stack.Item>
    </Stack>
  )
};

export default DatePicker;