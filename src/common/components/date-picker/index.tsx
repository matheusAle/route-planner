import 'react-dates/initialize'
import moment from 'moment'

import {
  DateRangePicker,
  FocusedInputShape,
  DateRangePickerShape,
} from 'react-dates'
import {useState} from 'react'

export const DatePicker = () => {
  const [startDate, setStartDate] = useState<moment.Moment | null>(null)
  const [endDate, setEndDate] = useState<moment.Moment | null>(null)
  const [focusedInput, setFocusedInput] = useState<FocusedInputShape | null>(
    null,
  )

  const onDatesChange: DateRangePickerShape['onDatesChange'] = ({
    startDate,
    endDate,
  }) => {
    setStartDate(startDate)
    setEndDate(endDate)
  }

  return (
    <div>
      <DateRangePicker
        startDate={startDate} // momentPropTypes.momentObj or null,
        startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
        endDate={endDate} // momentPropTypes.momentObj or null,
        endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
        onDatesChange={onDatesChange} // PropTypes.func.isRequired,
        focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
        onFocusChange={setFocusedInput} // PropTypes.func.isRequired,
      />
    </div>
  )
}
