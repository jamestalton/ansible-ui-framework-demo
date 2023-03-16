import { StoreNames } from 'idb'
import { useCallback, useEffect, useState } from 'react'
import { MyDB, useIndexedDB } from './indexedDB'

const DELAY_MIN = 300
const DELAY_MAX = 1000

async function delay() {
  await new Promise((resolve) =>
    setTimeout(resolve, DELAY_MIN + Math.round(Math.random() * (DELAY_MAX - DELAY_MIN)))
  )
}

export function useCreate<Name extends StoreNames<MyDB>>(storeName: Name) {
  const db = useIndexedDB('default')
  const create = useCallback(
    async (data: Omit<MyDB[Name]['value'], 'id' | 'created' | 'modified'>) => {
      await delay()
      const now = new Date(Date.now()).toISOString()
      const newData = { ...data, created: now, modified: now }
      if (db) {
        return db.put(storeName, newData as MyDB[Name]['value'])
      }
    },
    [db, storeName]
  )
  return create
}

export function useUpdate<Name extends StoreNames<MyDB>>(storeName: Name) {
  const db = useIndexedDB('default')
  const create = useCallback(
    async (data: MyDB[Name]['value']) => {
      await delay()
      const now = new Date(Date.now()).toISOString()
      data.modified = now
      if (db) {
        return db.put(storeName, data)
      }
    },
    [db, storeName]
  )
  return create
}

export function useDelete<Name extends StoreNames<MyDB>>(storeName: Name) {
  const db = useIndexedDB('default')
  const create = useCallback(
    async (id: MyDB[Name]['key']) => {
      await delay()
      if (db) {
        return db.delete(storeName, id)
      }
    },
    [db, storeName]
  )
  return create
}

export function useQuery<Name extends StoreNames<MyDB>>(storeName: Name) {
  const db = useIndexedDB('default')
  const [items, setItems] = useState<MyDB[Name]['value'][] | undefined>()
  useEffect(() => {
    const abortController = new AbortController()
    function update(newItems: MyDB[Name]['value'][]) {
      if (abortController.signal.aborted) return newItems
      setItems(newItems)
    }
    async function poll() {
      await delay()
      if (db) {
        update(await db.getAll(storeName))
      }
      if (!abortController.signal.aborted) {
        setTimeout(() => void poll(), 10 * 1000)
      }
    }
    void poll()
    return () => abortController.abort()
  }, [db, storeName])
  return items
}

export function useGet<Name extends StoreNames<MyDB>>(storeName: Name, id: MyDB[Name]['key']) {
  const db = useIndexedDB('default')
  const [item, setItem] = useState<MyDB[Name]['value'] | undefined>()
  useEffect(() => {
    async function t() {
      setItem(undefined)
      await delay()
      if (db) {
        setItem(await db.get(storeName, id))
      }
    }
    void t()
  }, [db, id, storeName])
  return item
}
