import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import UserStore, { IsAdminType, IsAuthType, User } from './store/UserStore'
import DeviceStore, { Brand, Device, SelectedType, Type } from './store/DeviceStore'

export type DeviceType = {
  types: Type[]

  brands: Brand[]

  devices: Device[]

  selectedType: any
  setSelectedType(type: any): any

  selectedBrand: any
  setSelectedBrand(brand: any): any

  setType(types: Type[]): any
  setBrand(brands: Brand[]): any
  setDevice(devices: Device[]): any

  setPage(page: number): any

  setTotalCount(totalCount: number): any

  setLimit(limit: number): any

  fetchDevices(): Promise<void>

  totalCount: number

  page: number

  limit: number
}

export type ContextType = {
  user: {
    isAuth: IsAuthType
    isAdmin: IsAdminType
    user: User
    setIsAuth(bool: boolean): any
    setIsAdmin(bool: boolean): any
    setUser(user: object): any
  }

  device: DeviceType
}

export const Context = createContext<ContextType>(null)
// console.log(process.env.)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Context.Provider
      value={{
        user: new UserStore(),
        device: new DeviceStore(),
      }}
    >
      <App />
    </Context.Provider>
  </React.StrictMode>,
)
