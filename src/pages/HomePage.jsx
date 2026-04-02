import useFoodSearch from '../hooks/useFoodSearch'
import SearchBar from '../components/SearchBar'
import FoodList from '../components/FoodList'
import ErrorMessage from '../components/ErrorMessage'

function HomePage() {
  const { results, loading, error, searchFood, hasSearched } = useFoodSearch()

  return (
    <div className="page">
      <div className="app-header">
        <h1>Nutrition Explorer</h1>
        <p className="subtitle">Discover nutritional information for your favorite foods.</p>
        <SearchBar onSearch={searchFood} />
      </div>

      {!hasSearched && (
        <div className="state-message empty-state">
          <div className="icon">🥑</div>
          <h2>Ready to search?</h2>
          <p>Enter a food name above to see its nutritional values!</p>
        </div>
      )}

      {loading && (
        <div className="state-message loading-state">
          <div className="spinner"></div>
          <p>Searching for delicious data...</p>
        </div>
      )}

      {error && !loading && (
        <ErrorMessage message={error} />
      )}

      {!loading && !error && hasSearched && results && results.length === 0 && (
        <div className="state-message no-results-state">
          <div className="icon">🤷</div>
          <h2>No results found</h2>
          <p>We couldn't find any products matching your search. Try another term!</p>
        </div>
      )}

      {!loading && !error && hasSearched && results && results.length > 0 && (
        <FoodList products={results} />
      )}
    </div>
  )
}

export default HomePage
