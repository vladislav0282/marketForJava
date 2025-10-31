import { makeAutoObservable } from 'mobx'

export type Count = number

class CounterStore {
  count: Count = 0

  constructor() {
    makeAutoObservable(this)
  }

  increment() {
    this.count += 1
  }

  decrement() {
    this.count -= 1
  }

  clear() {
    this.count = 0
  }
}

export default new CounterStore()
