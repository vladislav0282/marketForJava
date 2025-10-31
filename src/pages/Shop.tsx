/* eslint-disable react/function-component-definition */
import React, { useContext, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import { log } from 'console'
import { useNavigate } from 'react-router-dom'
import TypeBar from '../components/TypeBar'
import BrandBar from '../components/BrandBar'
import DeviceList from '../components/DeviceList'
import { Context } from '../main'
import {
  fetchAllDevices,
  fetchBrands,
  fetchDevices,
  fetchDevicesByPage,
  fetchTypes,
} from '../http/deviceApi'
import Pages from '../components/Pages'
import { checkRole, check } from '../http/userApi'
import { SHOP_ROUTE } from '../utils/constants'

const Shop = observer(() => {
  const { device } = useContext(Context)
  const { user } = useContext(Context)

  const navigate = useNavigate()

  useEffect(() => {
    check().then((data) => {
      if (data) {
        user.setIsAuth(true)
      } else user.setIsAuth(false)
    })
  }, [user.isAuth])

  useEffect(() => {
    checkRole().then((data) => {
      if (data[0] === 'ROLE_ADMIN') {
        user.setIsAdmin(true)
      } else user.setIsAdmin(false)
    })
  }, [user.isAdmin])

  useEffect(() => {
    fetchTypes().then((data) => {
      device.setType(data)
    })
    fetchBrands().then((data) => {
      device.setBrand(data)
    })

    // console.log(device.page, device.limit)

    fetchDevicesByPage(device.page - 1, device.limit).then((data) => {
      device.setDevice(data.rows)
      device.setTotalCount(data.count)
    })
  }, [])

  useEffect(() => {
    if (device.selectedType.id || device.selectedBrand.id) {
      device.fetchDevices()
    } else {
      fetchDevicesByPage(device.page - 1, device.limit).then((data) => {
        device.setDevice(data.rows)
        device.setTotalCount(data.count)
      })
    }
  }, [device.selectedType, device.selectedBrand, device.page])

  return (
    <Container>
      <Row className="mt-2">
        <Col md={3}>
          <TypeBar />
        </Col>
        <Col md={9}>
          <BrandBar />
          <DeviceList />
          <Pages />
        </Col>
      </Row>
    </Container>
  )
})
export default Shop
