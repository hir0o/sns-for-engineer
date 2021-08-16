import { useCallback } from 'react'

export default function useLocalStorage(storageKey: string) {
  const get = useCallback(() => {
    const str = localStorage.getItem(storageKey)
    if (!str) {
      return null
    }
    try {
      return JSON.parse(str)
    } catch (e) {
      return null
    }
  }, [storageKey])

  const set = useCallback(
    (data): void => {
      localStorage.setItem(storageKey, JSON.stringify(data))
    },
    [storageKey]
  )

  return { get, set }
}
