import { useState, useRef, useEffect } from 'react';
import {
  Box,
  Paper,
  Button,
  Stack,
  Typography,
  Slider,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import {
  Save as SaveIcon,
  Close as CloseIcon,
  AutoFixHigh as AutoFixHighIcon,
  Palette as PaletteIcon,
  Contrast as ContrastIcon,
  BlurOn as BlurOnIcon,
} from '@mui/icons-material';

const EFFECTS = [
  {
    name: 'Vintage',
    icon: <AutoFixHighIcon />,
    filter: 'sepia(0.5) contrast(1.2)',
  },
  {
    name: 'Dramatic',
    icon: <ContrastIcon />,
    filter: 'contrast(1.4) saturate(1.4) brightness(0.9)',
  },
  {
    name: 'Vivid',
    icon: <PaletteIcon />,
    filter: 'saturate(2) contrast(1.1)',
  },
  {
    name: 'Cool',
    icon: <BlurOnIcon />,
    filter: 'saturate(0.8) hue-rotate(30deg)',
  },
  {
    name: 'Warm',
    icon: <PaletteIcon />,
    filter: 'sepia(0.3) saturate(1.3) hue-rotate(-30deg)',
  },
  {
    name: 'Noir',
    icon: <ContrastIcon />,
    filter: 'grayscale(1) contrast(1.4) brightness(0.9)',
  },
];

function ImageEffects({ imageUrl, onSave, onCancel }) {
  const [selectedEffect, setSelectedEffect] = useState(null);
  const [intensity, setIntensity] = useState(100);
  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const image = new Image();
    image.src = imageUrl;
    image.onload = () => {
      imageRef.current = image;
      drawImage();
    };
  }, [imageUrl]);

  useEffect(() => {
    drawImage();
  }, [selectedEffect, intensity]);

  const drawImage = () => {
    if (!canvasRef.current || !imageRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = imageRef.current;

    // Set canvas size to match image dimensions
    canvas.width = img.width;
    canvas.height = img.height;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw image
    ctx.filter = selectedEffect 
      ? `${selectedEffect.filter} opacity(${intensity}%)`
      : 'none';
    ctx.drawImage(img, 0, 0);
  };

  const handleSave = () => {
    if (canvasRef.current) {
      const editedImageUrl = canvasRef.current.toDataURL('image/jpeg');
      onSave(editedImageUrl);
    }
  };

  return (
    <Paper 
      elevation={0}
      sx={{ 
        p: 3,
        borderRadius: 2,
        backgroundColor: 'background.paper',
      }}
    >
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Apply Effects
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Choose an effect and adjust its intensity to enhance your image
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: 'auto',
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}
          >
            <canvas
              ref={canvasRef}
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
              }}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            <Card variant="outlined">
              <CardContent>
                <Typography gutterBottom variant="subtitle2">
                  Effect Intensity
                </Typography>
                <Slider
                  value={intensity}
                  onChange={(_, value) => setIntensity(value)}
                  min={0}
                  max={100}
                  valueLabelDisplay="auto"
                  disabled={!selectedEffect}
                />
              </CardContent>
            </Card>

            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Available Effects
              </Typography>
              <Grid container spacing={1}>
                {EFFECTS.map((effect) => (
                  <Grid item xs={6} key={effect.name}>
                    <Button
                      fullWidth
                      variant={selectedEffect?.name === effect.name ? 'contained' : 'outlined'}
                      onClick={() => setSelectedEffect(effect)}
                      startIcon={effect.icon}
                      sx={{
                        justifyContent: 'flex-start',
                        textAlign: 'left',
                        py: 1,
                      }}
                    >
                      {effect.name}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Stack direction="row" spacing={2}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSave}
                disabled={!selectedEffect}
              >
                Save
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<CloseIcon />}
                onClick={onCancel}
              >
                Cancel
              </Button>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ImageEffects; 