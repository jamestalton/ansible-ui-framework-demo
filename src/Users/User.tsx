import { IRecord } from '../common/record'

export enum UserType {
  Admin = 'admin',
  Member = 'member',
}

export interface User extends IRecord {
  username: string
  userType: UserType
  firstName: string
  lastName: string
}
