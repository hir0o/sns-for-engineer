import { useCallback, useState } from 'react'

export default function useLocalStorage<T>(
  storageKey: string
): [T | undefined, (data: T) => void] {
  const [value, setStoredValue] = useState<T>(() => {
    const str = localStorage.getItem(storageKey)
    if (!str) return undefined
    try {
      return JSON.parse(str)
    } catch (e) {
      return undefined
    }
  })

  const setValue = useCallback(
    (data: T): void => {
      setStoredValue(data)
      localStorage.setItem(storageKey, JSON.stringify(data))
    },
    [storageKey]
  )

  return [value, setValue]
}
