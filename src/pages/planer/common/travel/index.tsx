import {DatePicker, DateSlice} from 'common/components/date-picker'
import {MdArrowBack} from 'react-icons/md'
import {Link} from 'react-router-dom'
import {usePlaner} from '../../hooks/use-planer'
import {useUpdateTravel} from '../../hooks/use-update-travel'

export const Travel = () => {
  const {travel} = usePlaner()
  const updateTravel = useUpdateTravel()

  const onChange = ([startDate, endDate]: DateSlice) => {
    updateTravel({
      ...travel,
      startDate,
      endDate,
    })
  }
  return (
    <div className="flex mb-5 flex-col">
      <div className="flex items-center space-x-3">
        <Link to="/travels" className="btn btn-ghost btn-circle -ml-3">
          <MdArrowBack className="text-2xl" />
        </Link>
        <h1 className="text-3xl">{travel.name}</h1>
      </div>
      <div className="mt-4 flex flex-col">
        <label>Dates:</label>
        <DatePicker
          value={[travel.startDate || null, travel.endDate || null]}
          onChange={onChange}
        />
      </div>
    </div>
  )
}
