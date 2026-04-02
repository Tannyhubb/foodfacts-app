import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import CardActionArea from '@mui/material/CardActionArea'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import { useNavigate } from 'react-router-dom'

function FoodCard({ product }) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/product/${product.id || product.code}`, { state: { product } })
  }

  // Handle fallback product image appropriately
  const imageUrl = product.image_small_url || product.image_url || 'https://dummyimage.com/300x300/e0e0e0/636363.png&text=No+Image';

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardActionArea onClick={handleClick} sx={{ flexGrow: 1 }}>
        <CardMedia
          component="img"
          height="140"
          image={imageUrl}
          alt={product.product_name || 'Product'}
          sx={{ objectFit: 'contain', p: 1, backgroundColor: '#f9fafb' }}
        />
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ lineHeight: 1.2, mb: 1 }}>
            {product.product_name || 'Unknown Product'}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom sx={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {product.brands || 'Unknown Brand'}
          </Typography>
          {product.nutriments?.['energy-kcal_100g'] !== undefined && (
            <Chip
              label={`${Math.round(product.nutriments['energy-kcal_100g'])} kcal / 100g`}
              size="small"
              color="primary"
              variant="outlined"
              sx={{ mt: 1 }}
            />
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default FoodCard
