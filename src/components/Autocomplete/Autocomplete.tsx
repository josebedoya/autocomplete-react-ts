import { useEffect, useMemo, useRef, useState } from 'react'
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

  const filteredSearch = useMemo(() =>
    data.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase())),
    [data, searchValue]
  )



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
        <ul>
          {filteredSearch?.map((item) => (
            <li
              key={item.id}
            >
              {item.title}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Autocomplete
