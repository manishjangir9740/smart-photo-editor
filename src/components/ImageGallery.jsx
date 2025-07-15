import { useEffect, useRef, useState, useCallback } from 'react';
import { Grid, Card, Typography, Box, IconButton, Stack, Tooltip } from '@mui/material';
import { Collections, Download, Delete, ZoomIn } from '@mui/icons-material';

function LazyImage({ src }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef();
  const observerRef = useRef();

  const handleImageLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    // Cleanup previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observerRef.current.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '50px',
        threshold: 0.1,
      }
    );

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [src]);

  // Preload image
  useEffect(() => {
    if (isVisible && !isLoaded) {
      const img = new Image();
      img.src = src;
      img.onload = handleImageLoad;
    }
  }, [isVisible, isLoaded, src, handleImageLoad]);

  const handleDownload = (e) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = src;
    link.download = `edited-image-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        paddingTop: '75%', // 4:3 Aspect Ratio
        width: '100%',
        overflow: 'hidden',
        borderRadius: 2,
        backgroundColor: 'action.hover',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Box
        ref={imgRef}
        component="img"
        src={isVisible ? src : ''}
        alt="Edited"
        loading="lazy"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: isLoaded ? 1 : 0,
          transition: 'all 0.3s ease-in-out',
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        }}
      />
      {isHovered && isLoaded && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'opacity 0.3s ease',
          }}
        >
          <Stack direction="row" spacing={1}>
            <Tooltip title="Download">
              <IconButton
                onClick={handleDownload}
                size="small"
                sx={{
                  color: 'white',
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' },
                }}
              >
                <Download />
              </IconButton>
            </Tooltip>
            <Tooltip title="View">
              <IconButton
                size="small"
                sx={{
                  color: 'white',
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' },
                }}
              >
                <ZoomIn />
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>
      )}
      {!isLoaded && isVisible && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 40,
            height: 40,
            borderRadius: '50%',
            border: 3,
            borderColor: 'primary.main',
            borderTopColor: 'transparent',
            animation: 'spin 1s linear infinite',
            '@keyframes spin': {
              '0%': {
                transform: 'translate(-50%, -50%) rotate(0deg)',
              },
              '100%': {
                transform: 'translate(-50%, -50%) rotate(360deg)',
              },
            },
          }}
        />
      )}
    </Box>
  );
}

function ImageGallery({ images }) {
  if (!images.length) {
    return (
      <Card
        sx={{
          p: 6,
          textAlign: 'center',
          backgroundColor: 'background.default',
          border: '2px dashed',
          borderColor: 'divider',
          borderRadius: 3,
        }}
      >
        <Collections sx={{ fontSize: 60, color: 'action.active', mb: 2 }} />
        <Typography variant="h6" color="primary" gutterBottom>
          Your Gallery is Empty
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Edit and save some images to see them here
        </Typography>
      </Card>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
        <Collections color="primary" />
        Your Edited Images
      </Typography>
      <Grid container spacing={3}>
        {images.map((imageUrl, index) => (
          <Grid item xs={12} sm={6} md={4} key={`${imageUrl}-${index}`}>
            <Card
              elevation={2}
              sx={{
                overflow: 'hidden',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 8,
                },
              }}
            >
              <LazyImage src={imageUrl} />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ImageGallery; 