import { get } from 'http'
import { $authHost, $host } from './index'
import { Brand, Device, Type } from '../store/DeviceStore'

export const createType = async (type: Type) => {
  const { data } = await $authHost.post('api/v1/type/create', type)
  return data
}

export const createBrand = async (brand: Brand) => {
  const { data } = await $authHost.post('api/v1/brand/create', brand)
  return data
}

export const createDevice = async (formData: FormData) => {
  const { data } = await $authHost.post('api/v1/device/create', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return data
}

export const fetchTypes = async () => {
  const { data } = await $host.get('api/v1/type')
  return data
}

export const fetchBrands = async () => {
  const { data } = await $host.get('api/v1/brand')
  return data
}

export const fetchDevices = async (brandId: number, typeId: number, page: number, limit = 3) => {
  const params: any = {
    page,
    limit,
  }

  if (brandId && brandId > 0) {
    params.brandId = brandId
  }

  if (typeId && typeId > 0) {
    params.typeId = typeId
  }

  const { data } = await $host.get('api/v1/devices', { params })
  return data
}

export const fetchDevicesByPage = async (page: number, limit: number) => {
  const { data } = await $host.get('api/v1/devicespage', {
    params: {
      page,
      limit,
    },
  })
  return data
}

export const fetchAllDevices = async (page: number, limit: number) => {
  const { data } = await $host.get('api/v1/device', {
    params: { page, limit },
  })
  return data
}

export const fetchOneDevice = async (id: number) => {
  const { data } = await $host.get(`api/v1/device/${id}`)
  return data
}

export const fetchImageById = async (id: number) => {
  const { data } = await $host.get(`images/${id}`)
  return data
}
