/* eslint-disable react/function-component-definition */

import { Card, Image } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { Device } from '../../store/DeviceStore'
import star from '../../assets/star.png'
import bascet from '../../assets/basket.svg'
import { BASCET_ROUTE } from '../../utils/constants'
import { getUserByUsername } from '../../http/userApi'
import { Context } from '../../main'
import { createBasket } from '../../http/basketApi'
// import { getUserByUsername } from '../../http/userApi'

const DeviceItem = ({
  deviceId,
  deviceName,
  price,
  rating,
  img,
  brandName,
  typeName,
  previewImageId,
  count,
}: Device) => {
  const navigate = useNavigate()
  const { user } = useContext(Context)

  const goToBascet = async () => {
    if (user.user.id && deviceId) {
      try {
        await createBasket(user.user.id, deviceId, 1)
        console.log('Device added to basket successfully')
        navigate(BASCET_ROUTE)
      } catch (error) {
        console.error('Error adding to basket:', error)
        // Можно показать уведомление пользователю
      }
    } else {
      console.log('User not authenticated or device ID missing')
    }
  }

  return (
    <Card style={{ width: 200, height: 200, cursor: 'pointer' }} border="black">
      <div>
        <div className="text-center">{deviceName}</div>
        {/* <div style={{ position: 'absolute' }}> */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Image
            width={100}
            height={100}
            style={{
              objectFit: 'contain' /* сохраняет пропорции изображения */,
              maxWidth: '100%' /* ограничиваем максимальную ширину изображения */,
              maxHeight: '100%' /* ограничиваем максимальную высоту изображения */,
            }}
            src={`http://localhost:8080/images/${previewImageId}`}
          />
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}
          >
            <div>{count ?? 1}</div>
            {/* <button type="button" onClick={counterHendler}>
              +
            </button>
            <div>{localCount ?? 0}</div>
            <button type="button" onClick={decrementHandler}>
              -
            </button> */}
          </div>
          <div style={{ position: 'absolute', top: '0', right: '0' }}>
            <Image width={18} height={18} src={star} /> {rating}
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: '0', right: '0', padding: '5px' }}>
          <Image width={18} height={18} src={bascet} onClick={() => goToBascet()} />
        </div>
        <div>цена: {price}</div>
        <div>{brandName}</div>
        <div>{typeName}</div>
      </div>
    </Card>
  )
}
//   // console.log({ device })

//   const navigate = useNavigate()

//   return (
//     <Col md-3 className="mt-4" onClick={() => navigate(`${DEVICE_ROUTE}/${id}`)}>
//       <Card style={{ width: 150, cursor: 'pointer' }} border="light">
//         <Image width={150} height={150} src={`http://localhost:5000/${img}`} />
//         <div className="text-black-50 mt-1 d-flex justify-content-between">
//           <div>{name}</div>
//           <div className="d-flex align-items-center">
//             <div>{rating}</div>
//             <Image width={18} height={18} src={star} />
//           </div>
//         </div>
//         <div>{price}</div>
//       </Card>
//     </Col>
//   )
// }

export default DeviceItem
