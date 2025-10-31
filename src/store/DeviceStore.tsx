import { makeAutoObservable } from 'mobx'

// для того чтобы реакт следил за этими переменными и при их изменении страница будет перерендориваться

export interface Type {
  id?: number
  typeName?: string
}

export interface Brand {
  id?: number
  brandName?: string
}

export interface Device {
  deviceId?: number
  deviceName?: string
  price?: number
  rating?: number
  count?: number
  img?: string
  brandName?: string
  typeName?: string
  previewImageId?: number
}

export type SelectedType = object

export default class DeviceStore {
  _types?: Type[]

  _brands?: Brand[]

  _devices?: Device[]

  _selectedType?: any

  _selectedBrand?: any

  _page?: number

  _totalCount?: number

  _limit?: number

  _count?: number

  constructor() {
    this._types = []

    this._brands = []

    this._devices = []

    this._count = 1

    this._selectedType = {}
    this._selectedBrand = {}

    this._page = 1
    this._totalCount = 0
    this._limit = 3
    makeAutoObservable(this)
  }

  setType(types: Type[]) {
    this._types = types
  }

  setBrand(brands: Brand[]) {
    this._brands = brands
  }

  setDevice(devices: Device[]) {
    this._devices = devices
  }

  setPage(page: number) {
    this._page = page
  }

  setCount(count: number) {
    this._count = count
  }

  setTotalCount(totalCount: number) {
    this._totalCount = totalCount
  }

  setLimit(limit: number) {
    this._limit = limit
  }

  setSelectedType(type: Type): any {
    this.setPage(1)
    this._selectedType = type
    this.fetchDevices()
  }

  async fetchDevices() {
    const { fetchDevices, fetchDevicesByPage } = await import('../http/deviceApi')

    if (this._selectedType?.id && this._selectedBrand?.id) {
      // Фильтрация по типу и бренду
      const data = await fetchDevices(
        this._selectedBrand.id,
        this._selectedType.id,
        (this._page || 1) - 1,
        this._limit || 3,
      )
      this.setDevice(data)
    } else if (this._selectedType?.id) {
      // Фильтрация только по типу
      const data = await fetchDevices(
        0,
        this._selectedType.id,
        (this._page || 1) - 1,
        this._limit || 3,
      )
      this.setDevice(data)
    } else if (this._selectedBrand?.id) {
      // Фильтрация только по бренду
      const data = await fetchDevices(
        this._selectedBrand.id,
        0,
        (this._page || 1) - 1,
        this._limit || 3,
      )
      this.setDevice(data)
    } else {
      // Показать все устройства (пагинация)
      const data = await fetchDevicesByPage((this._page || 1) - 1, this._limit || 3)
      this.setDevice(data.rows)
      this.setTotalCount(data.count)
    }
  }

  setSelectedBrand(brand: Brand): any {
    this.setPage(1)
    this._selectedBrand = brand
  }

  get types() {
    return this._types
  }

  get brands() {
    return this._brands
  }

  get devices() {
    return this._devices
  }

  get selectedType() {
    return this._selectedType
  }

  get selectedBrand() {
    return this._selectedBrand
  }

  get totalCount() {
    return this._totalCount
  }

  get page() {
    return this._page
  }

  get limit() {
    return this._limit
  }
}
