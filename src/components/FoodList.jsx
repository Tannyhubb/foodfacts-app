import FoodCard from './FoodCard';

export default function FoodList({ products }) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="food-list">
      {products.map((product) => (
        <FoodCard key={product._id || product.code || product.id} product={product} />
      ))}
    </div>
  );
}
