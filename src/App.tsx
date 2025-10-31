import { BrowserRouter } from 'react-router-dom'
import './App.scss'
import { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Spinner } from 'react-bootstrap'
import AppRouter from './components/AppRouter'
import NavBar from './components/NavBar'
import { Context, ContextType } from './main'
// import { check } from './http/userApi'

const App = observer(() => {
  const { user } = useContext(Context)
  const [loading, setLoading] = useState(true)

  // useEffect(() => {
  //   check().then((data) => {
  //     // console.log(data)
  //     user.setUser(user)
  //     user.setIsAuth(true)
  //   })
  //   // .finally(() => setLoading(false))
  // }, [])

  // if (loading) {
  //   return <Spinner animation="grow" />
  // }

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  )
})

export default App
