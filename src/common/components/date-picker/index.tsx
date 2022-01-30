import 'react-dates/initialize'
import moment from 'moment'

import {
  DateRangePicker,
  FocusedInputShape,
  DateRangePickerShape,
} from 'react-dates'
import {useEffect, useState} from 'react'
import {useIsMobile} from '../screen-layout'

export type DateSlice = [string | null, string | null]
interface DatePickerProps {
  value: DateSlice
  onChange(dates: DateSlice): void
}

export const DatePicker = ({value, onChange}: DatePickerProps) => {
  const [startDate, setStartDate] = useState<moment.Moment | null>(null)
  const [endDate, setEndDate] = useState<moment.Moment | null>(null)
  const isMobile = useIsMobile()

  const [focusedInput, setFocusedInput] = useState<FocusedInputShape | null>(
    null,
  )

  const onDatesChange: DateRangePickerShape['onDatesChange'] = ({
    startDate,
    endDate,
  }) => {
    const start = startDate?.utc().startOf('day').toISOString() || null
    const end = endDate?.utc().endOf('day').toISOString() || null
    setStartDate(startDate)
    setEndDate(endDate)

    onChange([start, end])
  }

  useEffect(() => {
    const [start, end] = value
    if (start) setStartDate(moment(start))
    if (end) setEndDate(moment(end))
  }, [value])

  return (
    <DateRangePicker
      startDate={startDate} // momentPropTypes.momentObj or null,
      startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
      endDate={endDate} // momentPropTypes.momentObj or null,
      endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
      onDatesChange={onDatesChange} // PropTypes.func.isRequired,
      focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
      onFocusChange={setFocusedInput} // PropTypes.func.isRequired,
      disableScroll
      withFullScreenPortal={isMobile}
      numberOfMonths={1}
    />
  )
}
