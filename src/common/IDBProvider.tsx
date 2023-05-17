import { DBSchema, IDBPDatabase, openDB, StoreNames } from 'idb'
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Team } from '../Teams/Team'
import { User } from '../Users/User'

export type IndexDbRecord = {
  id: number | string
  created: string
  modified: string
  deleted?: boolean
}

export interface MyDBSchema extends DBSchema {
  users: { key: number | string; value: User; indexes: { modified: string } }
  teams: { key: number | string; value: Team; indexes: { modified: string } }
}

const IndexDbContext = createContext<IDBPDatabase<MyDBSchema> | null>(null)

export function IDBProvider(props: { children: React.ReactNode; databaseName: string }) {
  const { children, databaseName } = props
  const [db, setDB] = useState<IDBPDatabase<MyDBSchema> | null>(null)
  useEffect(() => {
    void openDB<MyDBSchema>(databaseName, 1, {
      upgrade(db) {
        const userStore = db.createObjectStore('users', { keyPath: 'id', autoIncrement: true })
        userStore.createIndex('modified', 'modified')
        const teamStore = db.createObjectStore('teams', { keyPath: 'id', autoIncrement: true })
        teamStore.createIndex('modified', 'modified')
      },
    }).then(setDB)
  }, [databaseName])
  return <IndexDbContext.Provider value={db}>{children}</IndexDbContext.Provider>
}

export function useIdbPutItem<Name extends StoreNames<MyDBSchema>>(storeName: Name) {
  const db = useContext(IndexDbContext)
  const create = useCallback(
    async (
      data: Omit<MyDBSchema[Name]['value'], 'id' | 'created' | 'modified'> & {
        id?: string | number
        created?: string
        modified?: string
      }
    ) => {
      if (!db) return
      const now = new Date().toISOString()
      if (!data.created) data.created = now
      data.modified = now
      return db.put(storeName, data)
    },
    [db, storeName]
  )
  return create
}

export function useIdbUpdateItem<Name extends StoreNames<MyDBSchema>>(storeName: Name) {
  const db = useContext(IndexDbContext)
  const updateItem = useCallback(
    async (
      id: string | number,
      data: Partial<Omit<MyDBSchema[Name]['value'], 'id' | 'created' | 'modified'>> & {
        created?: string
        modified?: string
      }
    ) => {
      if (!db) return
      const now = new Date().toISOString()
      if (!data.created) data.created = now
      data.modified = now
      const item = await db.get(storeName, id)
      if (item) return db.put(storeName, { ...item, ...data })
    },
    [db, storeName]
  )
  return updateItem
}

export function useIdbDeleteItem<Name extends StoreNames<MyDBSchema>>(storeName: Name) {
  const updateItem = useIdbUpdateItem(storeName)
  const deleteItem = useCallback(
    async (id: MyDBSchema[Name]['key']) => {
      return updateItem(id, { deleted: true })
    },
    [updateItem]
  )
  return deleteItem
}

export function useIdbHardDeleteItem<Name extends StoreNames<MyDBSchema>>(storeName: Name) {
  const db = useContext(IndexDbContext)
  const deleteItem = useCallback(
    async (id: MyDBSchema[Name]['key']) => {
      if (!db) return
      return db.delete(storeName, id)
    },
    [db, storeName]
  )
  return deleteItem
}

export function useIdbItem<Name extends StoreNames<MyDBSchema>>(
  storeName: Name,
  id: MyDBSchema[Name]['key']
) {
  const db = useContext(IndexDbContext)
  const [item, setItem] = useState<MyDBSchema[Name]['value'] | undefined>()

  const abortControllerRef = useRef<AbortController>(new AbortController())
  useEffect(() => () => abortControllerRef.current.abort(), [])

  useEffect(() => {
    if (!db) return
    setItem(undefined)
    void db.get(storeName, id).then((item) => {
      if (abortControllerRef.current.signal.aborted) return
      setItem(item)
    })
  }, [db, id, storeName])
  return item
}

export function useIdbItems<Name extends StoreNames<MyDBSchema>>(
  storeName: Name,
  refreshInterval?: number
) {
  const db = useContext(IndexDbContext)

  const [items, setItems] = useState<MyDBSchema[Name]['value'][] | undefined>()

  const itemMapRef = useRef<Map<MyDBSchema[Name]['key'], MyDBSchema[Name]['value']>>(new Map())
  const lastModifiedRef = useRef<{ lastModified: string }>({ lastModified: '' })

  const update = useCallback(
    async (abortSignal: AbortSignal) => {
      if (!db) return
      const itemMap = itemMapRef.current
      const lastModified = lastModifiedRef.current
      const newItems = await db.getAllFromIndex(
        storeName,
        'modified',
        IDBKeyRange.lowerBound(lastModified.lastModified, true)
      )
      if (abortSignal.aborted) return
      if (newItems && newItems.length > 0) {
        // console.log(storeName, newItems)
        for (const item of newItems) {
          if (item.deleted) {
            itemMap.delete(item.id)
          } else {
            itemMap.set(item.id, item)
          }
          if (item.modified > lastModified.lastModified) {
            lastModified.lastModified = item.modified
          }
        }
        setItems(Array.from(itemMap.values()))
      } else {
        setItems((items) => (items ? items : []))
      }
    },
    [db, storeName]
  )

  usePolling(update, refreshInterval ?? 500)

  return items
}

function usePolling(callback: (abortSignal: AbortSignal) => Promise<void>, interval: number) {
  useEffect(() => {
    const abortController = new AbortController()
    let timeout: NodeJS.Timeout | undefined
    const update = () => {
      void callback(abortController.signal).then(() => {
        if (abortController.signal.aborted) return
        timeout = setTimeout(update, interval)
      })
    }
    update()
    return () => {
      abortController.abort()
      clearTimeout(timeout)
    }
  }, [callback, interval])
}
