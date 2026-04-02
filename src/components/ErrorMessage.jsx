import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'

function ErrorMessage({ message }) {
  return (
    <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto', mt: 2 }}>
      <Alert severity="error">{message}</Alert>
    </Box>
  )
}

export default ErrorMessage
