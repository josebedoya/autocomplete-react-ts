import { useEffect, useRef, useState } from 'react'
import './Autocomplete.styles.css'
import { type Post } from '../../types'

interface Props {
  data: Post[];
  isLoading: boolean;
  error: string | null;
}

const Autocomplete: React.FC<Props> = ({ data, isLoading, error }) => {
  const [searchValue, setSearchValue] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    inputRef.current?.focus()
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
