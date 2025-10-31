/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/function-component-definition */
/* eslint-disable no-unused-vars */

import React from 'react'
import { Button } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import counterStore from '../store/counterStore'

const Counter = observer(() => {
  return (
    <div>
      <h1>Counter</h1>
      <div>{counterStore.count}</div>
      <Button className="btn m-lg-1" onClick={() => counterStore.increment()}>
        +
      </Button>
      <Button className="btn m-lg-1" onClick={() => counterStore.decrement()}>
        -
      </Button>
      <Button className="btn m-lg-1" onClick={() => counterStore.clear()}>
        clear
      </Button>
    </div>
  )
})

export default Counter
