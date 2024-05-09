import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import './Autocomplete.styles.css'
import { type Post } from '../../types'

interface Props {
  data: Post[];
  isLoading: boolean;
  error: string | null;
}

const Autocomplete: React.FC<Props> = ({ data, isLoading, error }) => {
  const [searchValue, setSearchValue] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const filteredSearch = useMemo(() =>
    data.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase())),
    [data, searchValue]
  )

  const handleSelectSuggestion = useCallback((title: string) => {
    setSearchValue(title)
    setShowSuggestions(false)
  }, [])



  return (
    <>
      <h1>Autocomplete</h1>
      {error && <div>{error}</div>}
      {data && !error && (
        <div className="autocomplete">
          <input
            type="text"
            ref={inputRef}
            placeholder="Type something..."
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
          />
          {showSuggestions && (
            <ul>
              {filteredSearch?.map((item) => (
                <li
                  key={item.id}
                  onClick={() => handleSelectSuggestion(item.title)}
                >
                  {item.title}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {searchValue && filteredSearch.length === 0 && (
        <p>No matching results.</p>
      )}
    </>
  )
}

export default Autocomplete
