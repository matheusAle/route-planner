import {Travel} from '@/common/types/travel'
import {useFormatDateAgo} from '@/common/hooks/useFormatDateAgo'
import {useNavigate} from 'react-router'
import {PLANER_URL} from '@/common/routes-urls'

export interface TravelCardProps {
  item: Travel
}

export const TravelCard = ({item}: TravelCardProps) => {
  const lastEdit = useFormatDateAgo(item.editAt)
  const navigate = useNavigate()
  return (
    <div
      className="card bordered bg-base-200 md:bg-base-100 transform hover:translate-x-2 transition-transform cursor-pointer"
      onClick={() => {
        navigate(`${PLANER_URL}/${item.name}/${item.uid}`)
      }}
    >
      <div className="card-body">
        <h3 className="card-title">{item.name}</h3>
        <p className="text-xs">Edited at {lastEdit}</p>
      </div>
    </div>
  )
}
