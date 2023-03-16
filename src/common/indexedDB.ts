import { DBSchema, IDBPDatabase, openDB } from 'idb'
import { useEffect, useState } from 'react'
import { Team } from '../Teams/Team'
import { User } from '../Users/User'

export interface MyDB extends DBSchema {
  users: { key: number; value: User }
  teams: { key: number; value: Team }
}

export async function getIndexedDB(databaseName: string) {
  const db = await openDB<MyDB>(databaseName, 1, {
    upgrade(db) {
      db.createObjectStore('users', { keyPath: 'id', autoIncrement: true })
      db.createObjectStore('teams', { keyPath: 'id', autoIncrement: true })
    },
  })
  return db
}

export function useIndexedDB(databaseName: string) {
  const [db, setDB] = useState<IDBPDatabase<MyDB> | null>(null)
  useEffect(() => {
    async function asyncGetDB() {
      setDB(await getIndexedDB(databaseName))
    }
    void asyncGetDB()
  }, [databaseName])
  return db
}
