export default function FoodCard({ product }) {
  // Optionals and fallback handling as requested
  const productName = product?.product_name || 'Unknown Product';
  const brandName = product?.brands || 'Unknown Brand';
  
  // Safe extraction of nested structures
  const imageSmallUrl = product?.image_small_url || product?.image_url;
  const imageUrl = imageSmallUrl || 'https://dummyimage.com/300x300/e0e0e0/636363.png&text=No+Image';
  
  const nutriments = product?.nutriments || {};
  const calories = nutriments['energy-kcal_100g'] !== undefined ? `${nutriments['energy-kcal_100g']} kcal` : 'N/A';
  const protein = nutriments?.proteins_100g !== undefined ? `${nutriments.proteins_100g} g` : 'N/A';
  const fat = nutriments?.fat_100g !== undefined ? `${nutriments.fat_100g} g` : 'N/A';
  const carbs = nutriments?.carbohydrates_100g !== undefined ? `${nutriments.carbohydrates_100g} g` : 'N/A';

  return (
    <div className="food-card">
      <div className="card-image-container">
        <img src={imageUrl} alt={productName} className="food-image" />
      </div>
      <div className="card-content">
        <h3 className="food-name">{productName}</h3>
        <p className="food-brand">{brandName}</p>
        
        <div className="nutrition-info">
          <div className="nutrition-item">
            <span className="nutriment-label">Calories</span>
            <span className="nutriment-value">{calories}</span>
          </div>
          <div className="nutrition-item">
            <span className="nutriment-label">Protein</span>
            <span className="nutriment-value">{protein}</span>
          </div>
          <div className="nutrition-item">
            <span className="nutriment-label">Fat</span>
            <span className="nutriment-value">{fat}</span>
          </div>
          <div className="nutrition-item">
            <span className="nutriment-label">Carbs</span>
            <span className="nutriment-value">{carbs}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
