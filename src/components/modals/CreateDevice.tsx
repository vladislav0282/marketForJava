/* eslint-disable react/function-component-definition */
import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Dropdown, Form, Modal, Row } from 'react-bootstrap'
// import { observer } from 'mobx-react-lite'
// import { title } from 'process'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import { Context } from '../../main'
import { createDevice, fetchBrands, fetchTypes } from '../../http/deviceApi'
import { SHOP_ROUTE } from '../../utils/constants'

type Info = { title: string; description: string; number: any }

type SetInfo = any

const CreateDevice = observer(({ show, onHide }: any) => {
  const { device } = useContext(Context)
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [count, setCount] = useState(1)
  const [file, setFile] = useState(null)
  // const [brand, setBrand] = useState(null)
  // const [type, setType] = useState(null)

  useEffect(() => {
    fetchTypes().then((data) => device.setType(data))
    fetchBrands().then((data) => device.setBrand(data))
  }, [])

  const selectFile = (e: any) => {
    setFile(e.target.files[0])
  }

  const [info, setInfo]: [Info[], SetInfo] = useState([])
  const addInfo = () => {
    setInfo([...info, { title: '', description: '', number: Date.now() }])
  }

  const removeInfo = (number: any) => {
    setInfo(info.filter((i: any) => i.number !== number))
  }

  const changeInfo = (key: string, value: string, number: number) => {
    setInfo(info.map((i) => (i.number === number ? { ...i, [key]: value } : i)))
  }

  const addDevice = () => {
    const formData: any = new FormData()
    formData.append('deviceName', name)
    formData.append('price', `${price}`)
    formData.append('count', `${count}`)
    formData.append('file', file)
    formData.append('brand', device.selectedBrand.id)
    formData.append('type', device.selectedType.id)
    formData.append('info', JSON.stringify(info))
    createDevice(formData).then((data) => {
      onHide()
      navigate(SHOP_ROUTE)
    })
  }

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Добавить новый экземпляр</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>{device.selectedType.name || 'Выберите категорию'}</Dropdown.Toggle>
            <Dropdown.Menu>
              {device.types.map((type) => (
                <Dropdown.Item key={type.id} onClick={() => device.setSelectedType(type)}>
                  {type.typeName}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>{device.selectedBrand.name || 'Выберите тему'}</Dropdown.Toggle>
            <Dropdown.Menu>
              {device.brands.map((brand) => (
                <Dropdown.Item key={brand.id} onClick={() => device.setSelectedBrand(brand)}>
                  {brand.brandName}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control
            className="mt-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Введите название экземпляра"
          />
          <Form.Control
            className="mt-3"
            value={price}
            onChange={(e: any) => setPrice(Number(e.target.value))}
            placeholder="Введите стоимость"
            type="number"
          />
          <Form.Control type="file" onChange={selectFile} className="mt-3" />
          <hr />
          <Button variant="outline-dark" onClick={addInfo}>
            Добавить характеристики
          </Button>
          {info.map((i: any) => (
            <Row className="mt-2">
              <Col md={4}>
                <Form.Control
                  value={i.title}
                  onChange={(e) => changeInfo('title', e.target.value, i.number)}
                  placeholder="Введите название свойства"
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  value={i.description}
                  onChange={(e) => changeInfo('description', e.target.value, i.number)}
                  placeholder="Введите описание свойства"
                />
              </Col>
              <Col md={4}>
                <Button variant="outline-danger" onClick={() => removeInfo(i.number)}>
                  Удалить
                </Button>
              </Col>
            </Row>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>
        <Button variant="outline-success" onClick={addDevice}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  )
})

export default CreateDevice
