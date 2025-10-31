/* eslint-disable react/function-component-definition */
import React, { useContext, useEffect } from 'react'
import { Card, Col, Image, Row } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { Context } from '../main'
import { DEVICE_ROUTE } from '../utils/constants'
import DeviceItem from './DeviceItem/DeviceItem'
import { getUserByUsername } from '../http/userApi'
// import DeviceItem from './DeviceItem'

const DeviceList = observer(() => {
  const navigate = useNavigate()
  const { device } = useContext(Context)
  const { user } = useContext(Context)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const decoded = jwtDecode(token) as { sub: string }

        if (decoded.sub) {
          getUserByUsername(decoded.sub)
            .then((data) => {
              user.setUser(data)
            })
            .catch((error) => {
              console.error('Error getting user:', error)
            })
        }
      } catch (error) {
        console.error('Error decoding token:', error)
      }
    }
  }, [user])

  if (!device || !device.devices) return null

  if (device.devices.length === 0) return <>Товары не найдены</>

  return (
    <Row>
      {device.devices.map((dev) => (
        <Col md={4} key={dev.deviceId}>
          <DeviceItem
            deviceId={dev.deviceId}
            deviceName={dev.deviceName}
            price={dev.price}
            rating={dev.rating}
            img={dev.img}
            brandName={dev.brandName}
            typeName={dev.typeName}
            previewImageId={dev.previewImageId}
            count={dev.count}
          />
        </Col>
      ))}
    </Row>
  )
})

// <Row>
//   <h5 className="text-center">Товары</h5>
//   {device.devices.map((divice) => (
//     <Col
//       key={divice.deviceId}
//       md={3}
//       className="mt-4"
//       onClick={() => {
//         navigate(`${DEVICE_ROUTE}/${divice.deviceId}`)
//       }}
//     >
//       <Card style={{ width: 150, cursor: 'pointer' }} border="light">
//         <Image width={150} height={150} src={`http://localhost:5000/${divice.img}`} />
//         <div className="text-black-50 mt-1 d-flex justify-content-between">
//           <div>{divice.devicename}</div>
//           <div className="d-flex align-items-center">
//             <div>{divice.rating}</div>
//             <Image width={18} height={18} src={star} />
//           </div>
//         </div>
//         <div>{divice.price} руб.</div>
//       </Card>
//     </Col>
// <div key={divice.id}>{divice.name}</div>
// <DeviceItem
// key={divice.id}
// name={divice.name}
// price={divice.price}
// rating={divice.rating}
// img={divice.img}
// typeId={divice.typeId}
// brandId={divice.brandId}
// />
// ))}
//  </Row>

export default DeviceList
