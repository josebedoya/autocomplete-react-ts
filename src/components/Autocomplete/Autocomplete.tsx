import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import './Autocomplete.styles.css'
import { type DataReturn } from '../../types'

const Autocomplete: React.FC<DataReturn> = ({ data, isLoading, error }) => {
  const [searchValue, setSearchValue] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [isLoading])

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

  const onFocus = useCallback(() => {
    setShowSuggestions(!!filteredSearch && !!searchValue)
  }, [filteredSearch, searchValue])

  const onBlur = useCallback(() => {
    setTimeout(() => {
      setShowSuggestions(false)
    }, 200)
  }, [])

  const onKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown' && selectedIndex < filteredSearch.length - 1) {
      setSelectedIndex(selectedIndex + 1)
    }
    if (event.key === 'ArrowUp' && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1)
    }
    if (event.key === 'Enter' && selectedIndex >= 0) {
      setSearchValue(filteredSearch[selectedIndex].title)
      setShowSuggestions(false)
      setSelectedIndex(-1)
    }
  }, [selectedIndex, filteredSearch])

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
            placeholder={isLoading ? "Loading..." : "Type something..."}
            disabled={isLoading || !!error}
            value={searchValue}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
          />
          {showSuggestions && (
            <ul>
              {filteredSearch?.map((item, index) => (
                <li
                  key={item.id}
                  onClick={() => handleSelectSuggestion(item.title)}
                  className={index === selectedIndex ? "selected" : ""}
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
