import { $authHost, $host } from '.'

export const createBasket = async (userId: number, deviceId: number, quantity = 1) => {
  const { data } = await $host.post('api/v1/basket/create', null, {
    params: {
      userId,
      deviceId,
      quantity,
    },
  })
  return data
}

export const getAllDeviceByBasket = async (userId: number) => {
  const { data } = await $host.get(`api/v1/basket/user/${userId}`)
  return data
}

export const clearBasket = async (basketId: number) => {
  const { data } = await $authHost.post(`api/v1/basket/clear/${basketId}`)
  return data
}
