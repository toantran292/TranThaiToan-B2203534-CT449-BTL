export interface IUser {
  firstName: string
  lastName: string
  birthDay: any
  address: string
  gender: '0' | '1' | 'unknow'
  phoneNumber: string
  isStaff: boolean
  avatar: string
  email: string
  password?: string

  __v?: number
  _id?: string
  createdAt?: any
  updatedAt?: any
}
