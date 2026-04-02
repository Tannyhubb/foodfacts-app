import { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import FoodList from './components/FoodList';

function App() {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (query) => {
    if (!query.trim()) return;

    setLoading(true);
    setHasSearched(true);
    setProducts(null); // Clear previous results

    try {
      const response = await fetch(
        `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&json=1&page_size=10`
      );
      
      const data = await response.json();
      
      if (data.products) {
        // Filter out products with missing or empty names as required
        const validProducts = data.products.filter(
          (product) => product.product_name && product.product_name.trim() !== ''
        );
        setProducts(validProducts);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Failed to fetch food data:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Nutrition Explorer</h1>
        <p className="subtitle">Discover nutritional information for your favorite foods.</p>
        <SearchBar onSearch={handleSearch} />
      </header>

      <main className="app-content">
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

        {!loading && hasSearched && products && products.length === 0 && (
          <div className="state-message no-results-state">
            <div className="icon">🤷</div>
            <h2>No results found</h2>
            <p>We couldn't find any products matching your search. Try another term!</p>
          </div>
        )}

        {!loading && hasSearched && products && products.length > 0 && (
          <FoodList products={products} />
        )}
      </main>
    </div>
  );
}

export default App;
