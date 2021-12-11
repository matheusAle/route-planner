import {Travel} from '@/common/types/travel'
import {useFormatDateAgo} from '@/common/hooks/useFormatDateAgo'

export interface TravelCardProps {
  item: Travel
}
export const TravelCard = ({item}: TravelCardProps) => {
  const lastEdit = useFormatDateAgo(item.editAt)

  return (
    <div className="card bordered bg-base-100 transform hover:translate-x-2 transition-transform cursor-pointer">
      <div className="card-body">
        <h3 className="card-title">{item.name}</h3>
        <p className="text-xs">Edited at {lastEdit}</p>
      </div>
    </div>
  )
}
