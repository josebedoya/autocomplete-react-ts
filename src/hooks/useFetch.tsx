import { useEffect, useState } from 'react'
import { type DataReturn, type Post } from '../types'
import { API } from '../constants'

export const useFetch = (url: string): DataReturn => {
  const [data, setData] = useState<Post[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async() => {
      setError(null)
      setIsLoading(true)
      try {
        const response = await fetch(`${API}${url}`)
        const result = await response.json() as Post[]
        setData(result)
      } catch (error: unknown) {
        setError('Something went wrong')
        setIsLoading(false)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [url])

  return { data, isLoading, error }
}