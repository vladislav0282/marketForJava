import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Card, Row } from 'react-bootstrap'
import { Context } from '../main'

const BrandBar = observer(() => {
  const { device } = useContext(Context)

  return (
    <Row className="d-flex">
      <h5 className="text-center">Бренды</h5>
      <Card
        style={{ cursor: 'pointer' }}
        border={!device.selectedBrand.id ? 'danger' : 'light'}
        className="p-3 w-25"
        onClick={() => {
          device.setSelectedBrand({})
        }}
      >
        Все бренды
      </Card>

      {device.brands.map((brand) => (
        <Card
          style={{ cursor: 'pointer' }}
          key={brand.id}
          border={brand.id === device.selectedBrand.id ? 'danger' : 'light'}
          className="p-3 w-25"
          onClick={() => device.setSelectedBrand(brand)}
        >
          {brand.brandName}
        </Card>
      ))}
    </Row>
  )
})

export default BrandBar
