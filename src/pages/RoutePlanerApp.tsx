import {Loader} from '@/Loader'
import {Outlet} from 'react-router'

export const RoutePlanerApp = () => {
  return (
    <div className="min-h-screen w-screen">
      <Loader>
        <Outlet />
      </Loader>
    </div>
  )
}
