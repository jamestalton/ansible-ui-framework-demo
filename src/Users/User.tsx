import { IndexDbRecord } from '../common/IDBProvider'

export enum UserType {
  Admin = 'admin',
  Member = 'member',
}

export interface User extends IndexDbRecord {
  username: string
  userType: UserType
  firstName?: string
  lastName?: string
}
