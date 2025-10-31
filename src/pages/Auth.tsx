import React, { useContext, useState } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap'
import Row from 'react-bootstrap/Row'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/constants'
import { login, registration } from '../http/userApi'
import { Context } from '../main'

const Auth = observer(() => {
  const navigate = useNavigate()
  const { user } = useContext(Context)
  const location = useLocation()
  const isLogin = location.pathname === LOGIN_ROUTE
  const [username, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const name = ''

  const click = async () => {
    try {
      let data: any
      if (isLogin) {
        data = await login(username, password)
        if (data.roles[0] === 'ROLE_ADMIN') {
          user.setIsAdmin(true)
        }

        navigate(SHOP_ROUTE)
      } else {
        data = await registration(username, password, confirmPassword, name)

        navigate(LOGIN_ROUTE)
      }
      user.setUser(user)
      user.setIsAuth(true)
    } catch (e: any) {
      alert(e.message)
    }
  }

  return (
    <div>
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: window.innerHeight - 54 }}
      >
        <Card style={{ width: 600 }} className="p-4">
          <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
          <Form className="d-flex flex-column ">
            <Form.Control
              value={username}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2"
              placeholder="Введите email"
            />
            <Form.Control
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2"
              placeholder="Введите пароль"
              type="password"
            />
            {!isLogin && (
              <Form.Control
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-2"
                placeholder="Повторите пароль"
                type="password"
              />
            )}
            <Row className="d-flex justify-content-between mt-3 ps-3 pe-3 ">
              {isLogin ? (
                <div>
                  Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрирйтесь</NavLink>
                </div>
              ) : (
                <div>
                  Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите</NavLink>
                </div>
              )}

              <Button onClick={() => click()} variant="outline-success">
                {isLogin ? 'Войти' : 'Регистрация'}
              </Button>
            </Row>
          </Form>
        </Card>
      </Container>
    </div>
  )
})

export default Auth
