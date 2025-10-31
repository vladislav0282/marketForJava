import About from './pages/About'
import Admin from './pages/Admin'
import Auth from './pages/Auth'
import Bascet from './pages/Bascet'
import Counter from './pages/Counter'
import DevicePage from './pages/DevicePage'
import Objects from './pages/Objects'
import Payment from './pages/Payment'
import Service from './pages/Service'
// import Registration from './pages/Registration'
import Shop from './pages/Shop'
import {
  ADMIN_ROUTE,
  BASCET_ROUTE,
  DEVICE_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
  COUNTER_ROUTE,
  ABOUT_ROUTE,
  SERVICE_ROUTE,
  OBJECT_ROUTE,
  PAYMENT_ROUTE,
} from './utils/constants'

export const adminRouters = [
  {
    path: ADMIN_ROUTE,
    element: <Admin />,
  },
]

export const authRouters = [
  {
    path: BASCET_ROUTE,
    element: <Bascet />,
  },
]

export const publicRouters = [
  {
    path: BASCET_ROUTE,
    element: <Bascet />,
  },
  {
    path: ADMIN_ROUTE,
    element: <Admin />,
  },
  {
    path: SHOP_ROUTE,
    element: <Shop />,
  },
  {
    path: LOGIN_ROUTE,
    element: <Auth />,
  },
  {
    path: REGISTRATION_ROUTE,
    element: <Auth />,
  },
  {
    path: `${DEVICE_ROUTE}/:id`,
    element: <DevicePage />,
  },
  {
    path: COUNTER_ROUTE,
    element: <Counter />,
  },
  {
    path: ABOUT_ROUTE,
    element: <About />,
  },
  {
    path: SERVICE_ROUTE,
    element: <Service />,
  },
  {
    path: OBJECT_ROUTE,
    element: <Objects />,
  },
  {
    path: PAYMENT_ROUTE,
    element: <Payment />,
  },
]
