/* eslint-disable react/function-component-definition */
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import starBig from '../assets/StarBig.png'
import { fetchOneDevice } from '../http/deviceApi'
import { PAYMENT_ROUTE } from '../utils/constants'

const DevicePage = () => {
  const [device, setDevice] = useState({ info: [] })

  const navigate = useNavigate()

  const { id }: any = useParams()
  // const params = useParams()
  // console.log(params)

  useEffect(() => {
    fetchOneDevice(id).then((data) => setDevice(data))
  }, [])
  return (
    <Container className="mt-3">
      <Row>
        <Col md-4 className="text-center">
          <h2>{device.devicename}</h2>
          {/* <Image width={300} height={300} src={`http://localhost:5000/${device.img}`} /> */}
        </Col>
        <Col md-4>
          <Row>
            <div
              style={{
                textAlign: 'center',
                width: 250,
                height: 240,
              }}
            >
              <div
                className="d-flex text-center"
                style={{
                  background: `url(${starBig}) no-repeat center center`,
                  width: 250,
                  height: 240,
                  backgroundSize: 'cover',
                  fontSize: 24,
                }}
              />
            </div>
          </Row>
        </Col>
        <Col md-4>
          <Card
            className="d-flex flex-column align-items-center justify-content-around"
            style={{ width: 380, height: 380, fontSize: 32, border: '5px solid lightgray' }}
          >
            <h3>От: {device.price} руб.</h3>
            <Button variant="outline-dark">Добавить в корзину</Button>
            <Button variant="outline-primary" onClick={() => navigate(PAYMENT_ROUTE)}>
              Перейти к оплате
            </Button>
          </Card>
        </Col>
      </Row>
      <h1>Характеристики</h1>
      {/* <Row className="d-flex flex-column m-3">
        {device.info.map((info, index) => (
          <Row
            key={info.id}
            style={{ background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10 }}
          >
            {info.title}: {info.description}
          </Row>
        ))}
      </Row> */}
    </Container>
  )
}

export default DevicePage
