import { useEffect, useState } from 'react'
import { useFetch } from './useFetch'

export default function useIp(): string {
  const { data } = useFetch<{ ip: string }>(
    `https://ipinfo.io/json?token=${import.meta.env.VITE_IPINFO_TOKEN}`
  )

  const [ip, setIp] = useState('')

  useEffect(() => {
    if (!data) return
    setIp(data.ip)
  }, [data])

  return ip
}
