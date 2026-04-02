import { useNavigate } from 'react-router-dom'

function SavedPage({ saved, dispatch }) {
  const navigate = useNavigate()

  if (saved.length === 0) {
    return (
      <div className="page state-message empty-state">
        <div className="icon">📂</div>
        <h2>Saved Items</h2>
        <p>You haven't saved anything yet. Search for a food and save it from the detail page.</p>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="app-header" style={{ marginBottom: '2rem' }}>
        <h2>Saved Items ({saved.length})</h2>
      </div>
      <div className="food-list">
        {saved.map((product) => {
          const productName = product.product_name || 'Unknown Product'
          const brandName = product.brands || 'Unknown Brand'
          
          return (
            <div key={product.code} className="saved-item food-card" style={{ padding: '1rem' }}>
              <div className="card-content">
                <h3 className="food-name">{productName}</h3>
                <p className="food-brand">{brandName}</p>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                  <button onClick={() => navigate(`/product/${product.code}`)} className="search-button" style={{ flex: 1, padding: '0.5rem' }}>
                    View Details
                  </button>
                  <button 
                    onClick={() => dispatch({ type: 'REMOVE', code: product.code })} 
                    className="save-button saved" style={{ flex: 1, padding: '0.5rem', backgroundColor: '#fef2f2', color: '#ef4444', border: '1px solid #fca5a5' }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SavedPage
