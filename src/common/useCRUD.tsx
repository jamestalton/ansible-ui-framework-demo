// const DELAY_MIN = 0
// const DELAY_MAX = 0

// async function delay() {
//   await new Promise((resolve) =>
//     setTimeout(resolve, DELAY_MIN + Math.round(Math.random() * (DELAY_MAN - DELAY_MIN)))
//   )
// }

// export async function createItem<T extends { id: number }>(
//   collectionName: string,
//   item: Partial<T>
//   signal:AbortSignal
// ): Promise<T> {
//   await delay()
//   if( signal.aborted) return
// }

// export function patchItem<T extends { id: number }>(
//   collectionName: string,
//   id: number,
//   item: Partial<T>
//    signal:AbortSignal
// ): Promise<T> {
//   await delay()
//   if( signal.aborted) throw( new AbortedError())
// }

// export async function deleteItem<T extends { id: number }>(
//   collectionName: string,
//   id: number
//   signal:AbortSignal
// ): Promise<void> {
//   await delay()
//   if( signal.aborted) throw( new AbortedError())
// }

// export function get<T extends { id: number }>(collectionName: string, id: number, signal:AbortSignal): Promise<T> {
//   await delay()
//   if( signal.aborted) throw( new AbortedError())
// }

// export function query<T extends { id: number }>(collectionName: string, signal:AbortSignal): Promise<T[]> {
//   await delay()
//   if( signal.aborted) throw( new AbortedError())
// }

// const collections: {
//   [collectionName: string]: {
//     items: unknown[]
//   }
// }
