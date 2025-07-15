import { useEffect, useRef, useState } from 'react';
import { 
  Box, 
  Button, 
  Slider, 
  Typography, 
  Paper, 
  Stack,
  Divider,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  LinearProgress,
} from '@mui/material';
import {
  Brightness6,
  Contrast,
  Colorize,
  Save,
  Cancel,
  Refresh,
  BlurOn,
  RotateRight,
  InvertColors,
  Grain,
  Download,
  PhotoFilter,
} from '@mui/icons-material';

function ImageEditor({ imageUrl, onSave, onCancel }) {
  const canvasRef = useRef(null);
  const [filters, setFilters] = useState({
    brightness: 100,
    contrast: 100,
    saturation: 100,
    blur: 0,
    rotation: 0,
    sepia: false,
    grayscale: false,
    invert: false,
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const originalImageRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const image = new Image();
    
    image.onload = () => {
      // Set canvas size to match image
      canvas.width = image.width;
      canvas.height = image.height;
      
      // Store original image for reuse
      originalImageRef.current = image;
      
      // Draw initial image
      ctx.drawImage(image, 0, 0);
    };
    
    image.src = imageUrl;
  }, [imageUrl]);

  const applyFilters = () => {
    if (isProcessing) return;
    setIsProcessing(true);

    // Use Background Tasks API for heavy processing
    const task = new Promise((resolve) => {
      requestIdleCallback((deadline) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const image = originalImageRef.current;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Save context state
        ctx.save();

        // Apply rotation if needed
        if (filters.rotation !== 0) {
          ctx.translate(canvas.width / 2, canvas.height / 2);
          ctx.rotate((filters.rotation * Math.PI) / 180);
          ctx.translate(-canvas.width / 2, -canvas.height / 2);
        }

        // Apply basic filters
        let filterString = `
          brightness(${filters.brightness}%) 
          contrast(${filters.contrast}%) 
          saturate(${filters.saturation}%)
          blur(${filters.blur}px)
          ${filters.sepia ? 'sepia(100%)' : ''}
          ${filters.grayscale ? 'grayscale(100%)' : ''}
          ${filters.invert ? 'invert(100%)' : ''}
        `;

        ctx.filter = filterString;
        ctx.drawImage(image, 0, 0);

        // Restore context state
        ctx.restore();

        resolve();
      }, { timeout: 1000 });
    });

    task.then(() => {
      setIsProcessing(false);
    });
  };

  useEffect(() => {
    applyFilters();
  }, [filters]);

  const handleFilterChange = (type, value) => {
    setFilters(prev => ({ ...prev, [type]: value }));
  };

  const handleToggleEffect = (effect) => {
    setFilters(prev => ({ ...prev, [effect]: !prev[effect] }));
  };

  const handleRotate = () => {
    setFilters(prev => ({
      ...prev,
      rotation: (prev.rotation + 90) % 360
    }));
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    const editedImageUrl = canvas.toDataURL('image/jpeg');
    onSave(editedImageUrl);
  };

  const handleReset = () => {
    setFilters({
      brightness: 100,
      contrast: 100,
      saturation: 100,
      blur: 0,
      rotation: 0,
      sepia: false,
      grayscale: false,
      invert: false,
    });
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    const timestamp = new Date().getTime();
    link.download = `edited-image-${timestamp}.jpg`;
    canvas.toBlob((blob) => {
      link.href = URL.createObjectURL(blob);
      link.click();
      URL.revokeObjectURL(link.href);
    }, 'image/jpeg', 0.9);
  };

  const FilterSlider = ({ icon, label, value, onChange, min = 0, max = 200 }) => (
    <Box sx={{ mb: 3 }}>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
        {icon}
        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
          {label}
        </Typography>
      </Stack>
      <Slider
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        disabled={isProcessing}
        sx={{
          '& .MuiSlider-thumb': {
            width: 16,
            height: 16,
          },
          '& .MuiSlider-track': {
            height: 4,
          },
          '& .MuiSlider-rail': {
            height: 4,
          },
        }}
      />
    </Box>
  );

  const EffectButton = ({ icon, label, active, onClick }) => (
    <Tooltip title={label} arrow>
      <IconButton
        onClick={onClick}
        color={active ? "primary" : "default"}
        sx={{
          border: active ? 2 : 1,
          borderColor: active ? 'primary.main' : 'divider',
          borderRadius: 2,
          p: 1.5,
          transition: 'all 0.2s',
          '&:hover': {
            backgroundColor: 'action.hover',
          },
        }}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );

  return (
    <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
      <Box sx={{ flex: 1 }}>
        <Card 
          elevation={3} 
          sx={{ 
            mb: 3,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {isProcessing && (
            <LinearProgress 
              sx={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                right: 0,
                zIndex: 1,
              }} 
            />
          )}
          <CardContent sx={{ p: 2 }}>
            <canvas
              ref={canvasRef}
              style={{
                maxWidth: '100%',
                height: 'auto',
                display: 'block',
                margin: '0 auto',
                borderRadius: '8px',
              }}
            />
          </CardContent>
        </Card>

        <Stack 
          direction="row" 
          spacing={2} 
          justifyContent="center"
          sx={{ mb: 2 }}
        >
          <Button
            variant="contained"
            color="primary"
            startIcon={<Save />}
            onClick={handleSave}
            disabled={isProcessing}
            sx={{ minWidth: 120 }}
          >
            Save
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<Download />}
            onClick={handleDownload}
            disabled={isProcessing}
            sx={{ minWidth: 120 }}
          >
            Download
          </Button>
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={handleReset}
            disabled={isProcessing}
            sx={{ minWidth: 120 }}
          >
            Reset
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<Cancel />}
            onClick={onCancel}
            disabled={isProcessing}
            sx={{ minWidth: 120 }}
          >
            Cancel
          </Button>
        </Stack>
      </Box>
      
      <Card 
        elevation={3}
        sx={{ 
          width: { xs: '100%', md: '320px' },
          height: 'fit-content',
        }}
      >
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
            <PhotoFilter />
            Adjustments
          </Typography>

          <Typography variant="subtitle1" color="primary" gutterBottom sx={{ fontWeight: 500 }}>
            Basic Adjustments
          </Typography>
          <Box sx={{ mb: 3 }}>
            <FilterSlider
              icon={<Brightness6 color="primary" />}
              label="Brightness"
              value={filters.brightness}
              onChange={(e, value) => handleFilterChange('brightness', value)}
            />
            <FilterSlider
              icon={<Contrast color="primary" />}
              label="Contrast"
              value={filters.contrast}
              onChange={(e, value) => handleFilterChange('contrast', value)}
            />
            <FilterSlider
              icon={<Colorize color="primary" />}
              label="Saturation"
              value={filters.saturation}
              onChange={(e, value) => handleFilterChange('saturation', value)}
            />
            <FilterSlider
              icon={<BlurOn color="primary" />}
              label="Blur"
              value={filters.blur}
              onChange={(e, value) => handleFilterChange('blur', value)}
              max={20}
            />
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="subtitle1" color="primary" gutterBottom sx={{ fontWeight: 500 }}>
            Effects
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
              <EffectButton
                icon={<Grain />}
                label="Sepia"
                active={filters.sepia}
                onClick={() => handleToggleEffect('sepia')}
              />
              <EffectButton
                icon={<Grain />}
                label="Grayscale"
                active={filters.grayscale}
                onClick={() => handleToggleEffect('grayscale')}
              />
              <EffectButton
                icon={<InvertColors />}
                label="Invert"
                active={filters.invert}
                onClick={() => handleToggleEffect('invert')}
              />
              <EffectButton
                icon={<RotateRight />}
                label="Rotate 90°"
                active={false}
                onClick={handleRotate}
              />
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default ImageEditor; 