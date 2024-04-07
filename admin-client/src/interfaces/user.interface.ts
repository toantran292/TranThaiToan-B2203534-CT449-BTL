export interface IUser {
  _id: string
  email: string

  address: string
  firstName: string
  lastName: string
  gender: '0' | '1' | 'unknow'
  phoneNumber: string
  isStaff: boolean
  birthday: Date

  createdAt: Date
  updatedAt: Date
}
