import { useEffect, useState } from 'react'
import { queryItems } from '../../common/useCRUD'

export function useItems<T extends { id: number }>(collectionName: string) {
  const [abortController, setAbortController] = useState<AbortController>()
  useEffect(() => {
    const abortController = new AbortController()
    setAbortController(abortController)
    return () => {
      abortController.abort()
      setAbortController(undefined)
    }
  }, [])

  const [loading, setLoading] = useState(true)

  const [items, setItems] = useState<T[] | undefined>(undefined)
  useEffect(() => {
    if (abortController) {
      setLoading(true)
      void queryItems<T>(collectionName, abortController.signal)
        .then((items) => {
          setItems(items)
        })
        .catch(() => {
          setItems([])
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      setLoading(true)
    }
  }, [abortController])

  return { users: items, loading }
}
