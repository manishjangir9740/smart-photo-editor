import { useState, useRef } from 'react';
import { Box, Card, Typography, Button, Stack, IconButton } from '@mui/material';
import { CloudUpload, AddPhotoAlternate, Image } from '@mui/icons-material';

function ImageUploader({ onImageSelect }) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      validateAndProcessFile(files[0]);
    }
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files && files[0]) {
      validateAndProcessFile(files[0]);
    }
  };

  const validateAndProcessFile = (file) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }
    onImageSelect(file);
  };

  return (
    <Card
      sx={{
        p: 4,
        mb: 4,
        textAlign: 'center',
        backgroundColor: isDragging ? 'action.hover' : 'background.paper',
        transition: 'all 0.3s ease',
        border: '2px dashed',
        borderColor: isDragging ? 'primary.main' : 'divider',
        borderRadius: 3,
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        '&:hover': {
          borderColor: 'primary.main',
          backgroundColor: 'action.hover',
        },
      }}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current.click()}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        style={{ display: 'none' }}
      />

      <Stack
        spacing={2}
        alignItems="center"
        sx={{
          transform: isDragging ? 'scale(1.02)' : 'scale(1)',
          transition: 'transform 0.3s ease',
        }}
      >
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            backgroundColor: 'primary.light',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2,
          }}
        >
          <CloudUpload
            sx={{
              fontSize: 40,
              color: 'primary.main',
            }}
          />
        </Box>

        <Typography variant="h5" component="h2" color="primary" gutterBottom fontWeight="500">
          Upload Your Image
        </Typography>

        <Typography variant="body1" color="text.secondary" gutterBottom>
          Drag and drop your image here, or click to browse
        </Typography>

        <Stack direction="row" spacing={1} alignItems="center">
          <Image fontSize="small" color="action" />
          <Typography variant="body2" color="text.secondary">
            Supports: JPG, PNG, GIF
          </Typography>
        </Stack>

        <Button
          variant="outlined"
          startIcon={<AddPhotoAlternate />}
          sx={{
            mt: 2,
            borderRadius: 2,
            textTransform: 'none',
            px: 4,
          }}
        >
          Choose File
        </Button>
      </Stack>
    </Card>
  );
}

export default ImageUploader; 