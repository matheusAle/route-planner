import {cn} from 'common/utils/classnames'
import {useTimelimeContext} from '../context'

export const ScaleTicks = () => {
  const {
    scale: {setZoom, zoom, zoomOptions},
  } = useTimelimeContext()

  return (
    <div className="btn-group">
      <label htmlFor="" className="mr-3">
        zoom:{' '}
      </label>
      {zoomOptions.map(({label, value}) => (
        <button
          key={value}
          className={cn('btn btn-xs', {'btn-active': zoom === value})}
          onClick={() => setZoom(value)}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
