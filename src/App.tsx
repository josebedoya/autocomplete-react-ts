import Autocomplete from './components/Autocomplete/Autocomplete'
import { useFetch } from './hooks/useFetch'

const App = (): JSX.Element => {
  const { data, isLoading, error } = useFetch('posts')

  return (
    <>
      <Autocomplete
        data={data}
        isLoading={isLoading}
        error={error}
      />
    </>
  )
}

export default App
