import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import ErrorMessage from '../components/ErrorMessage'

function DetailPage({ saved, dispatch }) {
  const { barcode } = useParams()
  const navigate = useNavigate()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    const fetchProduct = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await axios.get(
          `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
        )
        if (!cancelled) {
          if (response.data.status === 1 && response.data.product) {
            setProduct(response.data.product)
          } else {
            setError('Product not found.')
          }
          setLoading(false)
        }
      } catch (err) {
        if (!cancelled) {
          setError('Could not load product details.')
          setLoading(false)
        }
      }
    }

    fetchProduct()

    return () => {
      cancelled = true
    }
  }, [barcode])

  if (loading) return (
    <div className="page state-message loading-state">
      <div className="spinner"></div><p>Loading product details...</p>
    </div>
  )
  if (error) return <div className="page"><ErrorMessage message={error} /></div>
  if (!product) return <div className="page state-message no-results-state"><p>Product not found.</p></div>

  const isSaved = saved.some(p => p.code === barcode)

  const handleSaveToggle = () => {
    if (isSaved) {
      dispatch({ type: 'REMOVE', code: barcode })
    } else {
      dispatch({ type: 'ADD', product: product })
    }
  }

  const productName = product.product_name || 'Unknown Product'
  const brandName = product.brands || 'Unknown Brand'
  const imageUrl = product.image_url || 'https://dummyimage.com/300x300/e0e0e0/636363.png&text=No+Image'
  const nutriments = product.nutriments || {}

  return (
    <div className="detail-page page">
      <button onClick={() => navigate(-1)} className="back-button">← Back</button>

      <div className="detail-header">
        <div className="detail-image-container">
          <img src={imageUrl} alt={productName} className="detail-image" />
        </div>
        <div className="detail-title">
          <h2>{productName}</h2>
          <p className="food-brand">{brandName}</p>
          <button onClick={handleSaveToggle} className={`save-button ${isSaved ? 'saved' : ''}`}>
            {isSaved ? '★ Remove from Saved' : '☆ Save to My List'}
          </button>
        </div>
      </div>

      <div className="nutrition-table">
        <h3>Nutrition per 100g</h3>
        <div className="nutrition-grid-large">
          <div className="nutrition-item">
            <span className="nutriment-label">Calories</span>
            <span className="nutriment-value">{nutriments['energy-kcal_100g'] !== undefined ? `${nutriments['energy-kcal_100g']} kcal` : 'N/A'}</span>
          </div>
          <div className="nutrition-item">
            <span className="nutriment-label">Protein</span>
            <span className="nutriment-value">{nutriments.proteins_100g !== undefined ? `${nutriments.proteins_100g} g` : 'N/A'}</span>
          </div>
          <div className="nutrition-item">
            <span className="nutriment-label">Carbs</span>
            <span className="nutriment-value">{nutriments.carbohydrates_100g !== undefined ? `${nutriments.carbohydrates_100g} g` : 'N/A'}</span>
          </div>
          <div className="nutrition-item">
            <span className="nutriment-label">Fat</span>
            <span className="nutriment-value">{nutriments.fat_100g !== undefined ? `${nutriments.fat_100g} g` : 'N/A'}</span>
          </div>
          <div className="nutrition-item">
            <span className="nutriment-label">Sugars</span>
            <span className="nutriment-value">{nutriments.sugars_100g !== undefined ? `${nutriments.sugars_100g} g` : 'N/A'}</span>
          </div>
          <div className="nutrition-item">
            <span className="nutriment-label">Sodium</span>
            <span className="nutriment-value">{nutriments.sodium_100g !== undefined ? `${nutriments.sodium_100g} g` : 'N/A'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailPage
