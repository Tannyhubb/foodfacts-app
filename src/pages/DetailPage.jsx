import { useSelector, useDispatch } from 'react-redux'
import { addItem, removeItem } from '../store/savedSlice'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import CircularProgress from '@mui/material/CircularProgress'
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd'
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import NutritionRow from '../components/NutritionRow'
import ErrorMessage from '../components/ErrorMessage'

function DetailPage() {
  const dispatch = useDispatch()
  const savedItems = useSelector(state => state.saved.items)
  
  const { barcode } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  
  const passedProduct = location.state?.product
  
  const [product, setProduct] = useState(passedProduct || null)
  const [loading, setLoading] = useState(!passedProduct)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (passedProduct) return;
    
    let cancelled = false;
    const fetchProduct = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`)
        if (!cancelled) {
          if (response.data.status === 1) {
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
    return () => { cancelled = true }
  }, [barcode, passedProduct])

  if (loading) {
    return (
      <Container sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    )
  }

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <ErrorMessage message={error} />
        <Button onClick={() => navigate('/')} sx={{ mt: 2 }}>← Back to Search</Button>
      </Container>
    )
  }

  if (!product) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography>Product not found.</Typography>
        <Button onClick={() => navigate('/')}>← Back React Routing</Button>
      </Container>
    )
  }

  const { product_name, brands, nutriments } = product
  const image_url = product.image_url || 'https://dummyimage.com/300x300/e0e0e0/636363.png&text=No+Image';
  const productId = product.id || product.code;
  const isSaved = savedItems.some(p => (p.id || p.code) === productId)

  const handleSaveToggle = () => {
    if (isSaved) {
      dispatch(removeItem(productId))
    } else {
      dispatch(addItem(product))
    }
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
      >
        Back
      </Button>

      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mb: 3 }}>
          <Box
            component="img"
            src={image_url}
            alt={product_name || 'Product'}
            sx={{ width: 160, height: 160, objectFit: 'contain', backgroundColor: '#f9fafb', p: 1, borderRadius: 1 }}
          />
          <Box sx={{ flex: 1 }}>
            <Typography variant="h5" gutterBottom>
              {product_name || 'Unknown Product'}
            </Typography>
            <Typography color="text.secondary" gutterBottom sx={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {brands || 'Unknown Brand'}
            </Typography>
            <Button
              variant={isSaved ? 'outlined' : 'contained'}
              color={isSaved ? 'error' : 'primary'}
              startIcon={isSaved ? <BookmarkRemoveIcon /> : <BookmarkAddIcon />}
              onClick={handleSaveToggle}
              sx={{ mt: 1 }}
            >
              {isSaved ? 'Remove from Saved' : 'Save to My List'}
            </Button>
          </Box>
        </Box>

        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          Nutrition per 100g
        </Typography>

        <NutritionRow label="Calories" value={nutriments?.['energy-kcal_100g']} unit=" kcal" />
        <NutritionRow label="Protein" value={nutriments?.proteins_100g} unit="g" />
        <NutritionRow label="Carbohydrates" value={nutriments?.carbohydrates_100g} unit="g" />
        <NutritionRow label="Sugars" value={nutriments?.sugars_100g} unit="g" />
        <NutritionRow label="Fat" value={nutriments?.fat_100g} unit="g" />
        <NutritionRow label="Saturated Fat" value={nutriments?.['saturated-fat_100g']} unit="g" />
        <NutritionRow label="Fibre" value={nutriments?.fiber_100g} unit="g" />
        <NutritionRow label="Salt" value={nutriments?.salt_100g} unit="g" />
      </Paper>
    </Container>
  )
}

export default DetailPage
