import { useEffect, useRef, useState } from 'react'
import './Autocomplete.styles.css'
import { type Post } from '../../types'

const Autocomplete = () => {
  const [searchValue, setSearchValue] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [data, setData] = useState<Post[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    const fetchData = async() => {
      setError(null)
      setIsLoading(true)
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts')
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
  }, [])

  return (
    <>
      <h1>Autocomplete</h1>
      <div className="autocomplete">
        <input
          type="text"
          ref={inputRef}
          placeholder="Type something..."
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
        />
      </div>
    </>
  )
}

export default Autocomplete
