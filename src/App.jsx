import { useState, Suspense, lazy } from 'react'
import { ThemeProvider, CssBaseline, Container, Box, CircularProgress } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import Navbar from './components/Navbar'

// Lazy load components
const ImageUploader = lazy(() => import('./components/ImageUploader'))
const ImageEditor = lazy(() => import('./components/ImageEditor'))
const ImageGallery = lazy(() => import('./components/ImageGallery'))
const ImageEffects = lazy(() => import('./components/ImageEffects'))

// Loading fallback component
const LoadingFallback = () => (
  <Box 
    sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      minHeight: '200px'
    }}
  >
    <CircularProgress />
  </Box>
)

// Create a responsive theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
      light: '#64b5f6',
      dark: '#1976d2',
    },
    secondary: {
      main: '#f50057',
      light: '#ff4081',
      dark: '#c51162',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          '@media (max-width: 600px)': {
            paddingLeft: 16,
            paddingRight: 16,
          },
        },
      },
    },
  },
})

function App() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [editedImages, setEditedImages] = useState([])
  const [currentView, setCurrentView] = useState('editor')

  const handleImageSelect = (imageFile) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      setSelectedImage(e.target.result)
    }
    reader.readAsDataURL(imageFile)
  }

  const handleSaveEdit = (editedImageUrl) => {
    setEditedImages((prev) => [editedImageUrl, ...prev])
    setSelectedImage(null)
  }

  const handleViewChange = (view) => {
    setCurrentView(view)
    if (view !== currentView) {
      setSelectedImage(null)
    }
  }

  const renderContent = () => {
    if (selectedImage) {
      return currentView === 'editor' ? (
        <ImageEditor
          imageUrl={selectedImage}
          onSave={handleSaveEdit}
          onCancel={() => setSelectedImage(null)}
        />
      ) : (
        <ImageEffects
          imageUrl={selectedImage}
          onSave={handleSaveEdit}
          onCancel={() => setSelectedImage(null)}
        />
      )
    }

    return (
      <>
        <ImageUploader onImageSelect={handleImageSelect} />
        <ImageGallery images={editedImages} />
      </>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box 
        sx={{ 
          minHeight: '100vh',
          backgroundColor: 'background.default',
        }}
      >
        <Navbar onViewChange={handleViewChange} />
        <Container 
          maxWidth="lg" 
          sx={{ 
            py: { xs: 2, sm: 3, md: 4 },
            px: { xs: 2, sm: 3 },
          }}
        >
          <Box sx={{ maxWidth: '100%', overflow: 'hidden' }}>
            <Suspense fallback={<LoadingFallback />}>
              {renderContent()}
            </Suspense>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default App
