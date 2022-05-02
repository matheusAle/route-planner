import {Loader} from 'pages/Loader'
import {Outlet} from 'react-router'

export const RoutePlanerApp = () => {
  return (
    <div className="min-h-screen w-screen overflow-x-hidden">
      <Loader>
        <Outlet />
      </Loader>
    </div>
  )
}
