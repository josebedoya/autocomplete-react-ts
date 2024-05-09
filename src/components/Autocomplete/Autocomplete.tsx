import { useState } from 'react'
import './Autocomplete.styles.css'

const Autocomplete = () => {
  const [searchValue, setSearchValue] = useState('')
  return (
    <>
      <h1>Autocomplete</h1>
      <div className="autocomplete">
        <input
          type="text"
          placeholder="Type something..."
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
        />
      </div>
    </>
  )
}

export default Autocomplete
