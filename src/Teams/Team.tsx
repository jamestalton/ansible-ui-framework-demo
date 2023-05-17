import { IndexDbRecord } from '../common/IDBProvider'

export interface Team extends IndexDbRecord {
  name: string
  description: string
}
