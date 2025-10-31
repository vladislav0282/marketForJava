// import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useContext } from 'react'
import { adminRouters, authRouters, publicRouters } from '../routers'
import { Context } from '../main'
import { ABOUT_ROUTE, SHOP_ROUTE } from '../utils/constants'
// import { Context } from '../main'

function AppRouter() {
  const { user }: any = useContext(Context)
  // console.log(user)

  return (
    <Routes>
      {user.isAuth &&
        authRouters.map(({ path, element }) => <Route key={path} path={path} element={element} />)}

      {user.isAdmin &&
        user.isAuth &&
        adminRouters.map(({ path, element }) => <Route key={path} path={path} element={element} />)}
      {publicRouters.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
      <Route path="*" element={<Navigate to={ABOUT_ROUTE} replace />} />
    </Routes>
  )
}

export default AppRouter
