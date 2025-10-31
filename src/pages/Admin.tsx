/* eslint-disable react/jsx-boolean-value */
import React, { useContext, useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import CreateDevice from '../components/modals/CreateDevice'
import CreateBrand from '../components/modals/CreateBrand'
import CreateType from '../components/modals/CreateType'
import { SHOP_ROUTE } from '../utils/constants'
import { checkRole } from '../http/userApi'

function Admin() {
  // const token: any = localStorage.getItem('token')

  // const authInfo: { role: 'ADMIN' } = jwtDecode(token)

  const [brandVisible, setbrandVisible] = useState(false)
  const [deviceVisible, setDeviceVisible] = useState(false)
  const [typeVisible, setTypeVisible] = useState(false)
  return (
    <Container className="d-flex flex-column">
      <Button
        onClick={() => {
          setTypeVisible(true)
        }}
        variant="outline-dark"
        className="mt-4 p-2"
      >
        Добавить категорию
      </Button>
      <Button
        onClick={() => {
          setbrandVisible(true)
        }}
        variant="outline-dark"
        className="mt-4 p-2"
      >
        Добавить бренд
      </Button>
      <Button
        onClick={() => {
          setDeviceVisible(true)
        }}
        variant="outline-dark"
        className="mt-4 p-2"
      >
        Добавить экземпляр
      </Button>
      <CreateBrand show={brandVisible} onHide={() => setbrandVisible(false)} />
      <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)} />
      <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
    </Container>
  )
}

export default Admin
