import { makeAutoObservable } from 'mobx'

// для того чтобы реакт следил за этими переменными и при их изменении страница будет перерендориваться

export type IsAdminType = boolean
export type IsAuthType = boolean
export type User = {
  id: number | null
  username: string
}

export default class UserStore {
  _isAdmin: IsAdminType

  _isAuth: IsAuthType

  _user: User

  constructor(user: User) {
    this._isAuth = false
    this._isAdmin = false
    this._user = { id: null, username: '' }
    makeAutoObservable(this)
  }

  setIsAdmin(bool: boolean) {
    this._isAdmin = bool
  }

  setIsAuth(bool: boolean) {
    this._isAuth = bool
  }

  setUser(user: User) {
    this._user = user
  }

  get isAdmin() {
    return this._isAdmin
  }

  get isAuth() {
    return this._isAuth
  }

  get user() {
    return this._user
  }
}
