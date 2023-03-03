import { IDBPDatabase, openDB } from 'idb'
import { useEffect, useState } from 'react'

export async function getIndexedDB(name: string) {
  const db = await openDB(name, 1, {
    upgrade(db) {
      db.createObjectStore('users', { keyPath: 'id', autoIncrement: true })
    },
  })
  return db
}

export function useIndexedDB() {
  const [db, setDB] = useState<IDBPDatabase>()
  useEffect(() => {
    async function asyncGetDB() {
      const db = await getIndexedDB('data')
      setDB(db)
    }
    void asyncGetDB()
  }, [])
  return db
}
