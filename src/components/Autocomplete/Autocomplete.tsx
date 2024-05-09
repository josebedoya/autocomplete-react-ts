import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
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

  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
    setShowSuggestions(!!filteredSearch)
  }, [filteredSearch])

  const highlightText = (text: string, query: string) => {
    const parts = text.split(new RegExp(`(${query})`, `gi`))
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase()
        ? <span key={index} className="highlight">{part}</span>
        : part
    )
  }

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
            onChange={onChange}
          />
          {showSuggestions && (
            <ul>
              {filteredSearch?.map((item) => (
                <li
                  key={item.id}
                  onClick={() => handleSelectSuggestion(item.title)}
                >
                  {highlightText(item.title, searchValue)}
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
