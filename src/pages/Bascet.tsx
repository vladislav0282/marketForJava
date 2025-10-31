/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/function-component-definition */
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Col, Container, Row, Image, Button } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import { LOGIN_ROUTE } from '../utils/constants'
import { Context } from '../main'
import { getAllDeviceByBasket, clearBasket } from '../http/basketApi'
import { Device } from '../store/DeviceStore'

const Bascet = observer(() => {
  const [device, setDevice] = useState({ info: [] })
  const [basketDevice, setBasketDevice] = useState(null)
  const { user } = useContext(Context)
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  const clearHandler = async () => {
    if (!basketDevice?.id) {
      console.error('Basket ID is missing')
      return
    }

    try {
      await clearBasket(basketDevice.id)
      console.log('Basket cleared successfully')
      // Обновляем данные после очистки
      if (user.user.id) {
        const data = await getAllDeviceByBasket(user.user.id)
        setBasketDevice(data)
      }
    } catch (error) {
      console.error('Error clearing basket:', error)
    }
  }

  useEffect(() => {
    if (!token) {
      navigate(LOGIN_ROUTE)
    }
  }, [token, navigate])

  useEffect(() => {
    const fetchBasket = async () => {
      if (user.user.id) {
        try {
          const data = await getAllDeviceByBasket(user.user.id)
          setBasketDevice(data)
          console.log(data)
        } catch (error) {
          console.error('Error fetching basket:', error)
        }
      }
    }

    fetchBasket()
  }, [user.user.id])

  return (
    <Container className="mt-3">
      <div className="d-flex">
        <h1>Корзина</h1>
        <p>количество товаров в корзине</p>
        <Button onClick={clearHandler} variant="danger">
          Удалить все
        </Button>
      </div>
      <Row>
        {basketDevice?.basketDevices?.map((baskDev: Device) => (
          <React.Fragment key={baskDev.deviceId}>
            <Col md={10} style={{ border: '1px solid black' }}>
              <h2>{baskDev.deviceName}</h2>
              <div className="d-flex flex-row justify-content-between">
                <Image
                  width={100}
                  height={100}
                  style={{
                    objectFit: 'contain',
                    maxWidth: '100%',
                    maxHeight: '100%',
                  }}
                  src={`http://localhost:8080/images/${baskDev.previewImageId}`}
                />
                <div className="d-flex flex-row">
                  <div>+</div>
                  количество
                  <div>-</div>
                </div>
                <div>
                  <div className="d-flex flex-row justify-content-between gap-2">
                    <div>удалить</div>
                    <div>избранное</div>
                  </div>
                  <div>цена</div>
                </div>
              </div>
            </Col>
            <Col md={2} style={{ border: '1px solid black' }}>
              <div className="d-flex flex-column gap-4">
                <div>
                  <p>итого:</p>
                  <div className="d-flex flex-row justify-content-between gap-2">
                    <h5>количество товаров</h5>
                    <h5>на 10 000 руб.</h5>
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  <Button>Перейти к оформлению</Button>
                </div>
              </div>
            </Col>
          </React.Fragment>
        ))}
      </Row>
    </Container>
  )
})

export default Bascet
