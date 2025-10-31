/* eslint-disable react/function-component-definition */
import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { ListGroup } from 'react-bootstrap'
import { Context } from '../main'

const TypeBar = observer(() => {
  const { device } = useContext(Context)

  return (
    <ListGroup>
      <h5 className="text-center">Категории товаров</h5>
      <ListGroup.Item
        style={{ cursor: 'pointer' }}
        active={!device.selectedType.id}
        onClick={() => {
          device.setSelectedType({})
          device.setSelectedBrand({})
        }}
      >
        Все категории
      </ListGroup.Item>
      {device.types?.map((type) => (
        <ListGroup.Item
          style={{ cursor: 'pointer' }}
          active={type.id === device.selectedType.id}
          onClick={() => device.setSelectedType(type)}
          key={type.id}
        >
          {type.typeName}
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
})

export default TypeBar
