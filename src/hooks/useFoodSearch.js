import { useState } from 'react'
import axios from 'axios'

function useFoodSearch() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [hasSearched, setHasSearched] = useState(false)

  const searchFood = async (query) => {
    setLoading(true)
    setError(null)
    setHasSearched(true)

    try {
      const url = `https://world.openfoodfacts.org/cgi/search.pl`
      const response = await axios.get(url, {
        params: {
          search_terms: query,
          search_simple: 1,
          action: 'process',
          json: 1,
          page_size: 10
        }
      })

      const filtered = response.data.products.filter(
        (product) => product.product_name && product.product_name.trim() !== ''
      )

      setResults(filtered)
    } catch (err) {
      if (err.response) {
        // the request was made, the server responded with a non-2xx status
        setError(`Server error: ${err.response.status}. Please try again.`)
      } else if (err.request) {
        // the request was made but no response received (network offline)
        setError('Network error. Check your connection and try again.')
      } else {
        // something else went wrong
        setError('Something went wrong. Please try again.')
      }
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  return { results, loading, error, searchFood, hasSearched }
}

export default useFoodSearch
