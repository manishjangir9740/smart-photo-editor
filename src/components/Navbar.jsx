import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Container,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { 
  PhotoCamera,
} from '@mui/icons-material';

function Navbar({ onViewChange }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleViewChange = (view) => {
    if (onViewChange) {
      onViewChange(view);
    }
  };

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{
        backdropFilter: 'blur(8px)',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          sx={{
            minHeight: { xs: '64px', md: '72px' },
            py: 1,
            gap: 1,
          }}
        >
          {/* Logo and Title */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              flexGrow: 1,
            }}
          >
            <IconButton
              edge="start"
              color="primary"
              aria-label="logo"
              onClick={() => handleViewChange('editor')}
              sx={{
                backgroundColor: 'primary.main',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
              }}
            >
              <PhotoCamera />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              color="primary"
              sx={{
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                cursor: 'pointer',
              }}
              onClick={() => handleViewChange('editor')}
            >
              Smart Photo Editor
              {!isMobile && (
                <Box
                  component="span"
                  sx={{
                    backgroundColor: 'primary.main',
                    color: 'white',
                    px: 1,
                    py: 0.5,
                    borderRadius: 1,
                    fontSize: '0.75rem',
                    ml: 1,
                  }}
                >
                  PRO
                </Box>
              )}
            </Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar; 