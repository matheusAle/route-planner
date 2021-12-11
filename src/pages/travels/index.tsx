import {TravelCard} from './common/travel-card'
import {useCreateTravel} from './use-create-travel'
import {useTravelList} from './use-travel-list'

export const TravelsPage = () => {
  const list = useTravelList()
  const createTravel = useCreateTravel()
  return (
    <div className="h-screen flex flex-col items-center py-8">
      <div className="card bordered w-2/3 bg-base-200">
        <div className="card-body">
          <h2 className="card-title">Travels</h2>
          <button className="btn btn-primary" onClick={createTravel}>
            create one
          </button>
          <div className="space-y-6 mt-10">
            {list.map(item => (
              <TravelCard item={item} key={item.uid} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
