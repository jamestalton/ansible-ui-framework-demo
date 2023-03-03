import { useCallback } from 'react'
import { getIndexedDB } from './indexdb'

const DELAY_MIN = 300
const DELAY_MAX = 1000

async function delay() {
  await new Promise((resolve) =>
    setTimeout(resolve, DELAY_MIN + Math.round(Math.random() * (DELAY_MAX - DELAY_MIN)))
  )
}

export async function createItem<T extends { id: number }>(
  collectionName: string,
  item: Partial<T>,
  signal?: AbortSignal
): Promise<T> {
  await delay()
  if (signal?.aborted) throw new Error('Aborted')
  const db = await getIndexedDB('data')
  await db?.put(collectionName, item as T)
  return item as T
}

export async function patchItem<T extends { id: number }>(
  collectionName: string,
  id: number,
  item: Partial<T>,
  signal: AbortSignal
): Promise<T> {
  await delay()
  if (signal.aborted) throw new Error('Aborted')
  let collection = collections[collectionName]
  if (!collection) throw new Error('Not found')
  const existing = collection[id] as T
  if (!existing) throw new Error('Not found')
  Object.assign(existing, item)
  return existing
}

export async function deleteItem<T extends { id: number }>(
  collectionName: string,
  id: number,
  signal?: AbortSignal
): Promise<boolean> {
  await delay()
  if (signal?.aborted) throw new Error('Aborted')
  const db = await getIndexedDB('data')
  return db.delete(collectionName, id).then(() => true)
}

export async function getItem<T extends { id: number }>(
  collectionName: string,
  id: number,
  signal: AbortSignal
): Promise<T | undefined> {
  await delay()
  if (signal.aborted) throw new Error('Aborted')
  let collection = collections[collectionName]
  if (!collection) throw new Error('Not found')
  return collection[id] as T
}

export async function queryItems<T extends { id: number }>(
  collectionName: string,
  signal: AbortSignal
): Promise<T[]> {
  await delay()
  if (signal.aborted) throw new Error('Aborted')
  const db = await getIndexedDB('data')
  return (await db.getAll(collectionName)) as T[]
}

const collections: Record<string, Record<string, unknown> | undefined> = {}

export function useFetcher() {
  return fetch
}

export async function usePost<RequestBodyT, ReponseBodyT = RequestBodyT>(url: string) {
  const fetcher = useFetcher()
  const postFn = useCallback(async (url: string, body: RequestBodyT, signal: AbortSignal) => {
    const response = await fetcher(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json;charset=UTF-8' },
      body: JSON.stringify(body),
      signal: signal,
    })
    return (await response.json()) as ReponseBodyT
  }, [])
  return postFn
}

export function useGet<RequestBodyT, ReponseBodyT = RequestBodyT>() {
  return (url: string) => fetch(url)
}


