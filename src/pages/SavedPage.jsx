import { useSelector } from 'react-redux'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import FoodCard from '../components/FoodCard'

function SavedPage() {
  const savedItems = useSelector(state => state.saved.items)

  if (savedItems.length === 0) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h1" sx={{ fontSize: '4rem', mb: 2 }}>📂</Typography>
        <Typography variant="h4" gutterBottom fontWeight={700}>
          Saved Items
        </Typography>
        <Typography color="text.secondary">
          You haven't saved anything yet. Search for a food and save it from the detail page.
        </Typography>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={800}>
          Saved Items ({savedItems.length})
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {savedItems.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id || product.code}>
            <FoodCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default SavedPage
