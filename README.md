# Smart Photo Editor

A modern web-based photo editor built with React, Vite, and Material-UI.

## Features

- Image editing with filters and adjustments
- Special effects with real-time preview
- Responsive design
- Lazy loading and performance optimizations
- Modern UI with Material Design

## Tech Stack

- React 18
- Vite 5
- Material-UI 5
- Modern JavaScript (ES6+)

## Development

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Create a `.env` file in the root directory with the following variables:
```env
# Application
VITE_APP_TITLE=Smart Photo Editor
VITE_APP_DESCRIPTION=Modern photo editing web application

# Server Configuration
PORT=3000
HOST=0.0.0.0

# Feature Flags
VITE_ENABLE_EFFECTS=true
VITE_ENABLE_PRO_FEATURES=true

# Performance
VITE_MAX_IMAGE_SIZE=10485760
VITE_ENABLE_IMAGE_COMPRESSION=true

# API Configuration
VITE_API_URL=http://localhost:3000
VITE_API_TIMEOUT=30000
```

4. Start development server:
```bash
npm run dev
```

## Production Build

1. Create a `.env.production` file with your production settings:
```env
# Application
VITE_APP_TITLE=Smart Photo Editor
VITE_APP_DESCRIPTION=Modern photo editing web application

# Server Configuration
PORT=3000
HOST=0.0.0.0

# Feature Flags
VITE_ENABLE_EFFECTS=true
VITE_ENABLE_PRO_FEATURES=true

# Performance
VITE_MAX_IMAGE_SIZE=10485760
VITE_ENABLE_IMAGE_COMPRESSION=true

# API Configuration (update with your production API URL if needed)
VITE_API_URL=https://your-api-url.com
VITE_API_TIMEOUT=30000
```

2. Build the project:
```bash
npm run build
```

3. Preview production build:
```bash
npm run preview
```

## Deployment on Render

1. Create a new Web Service on Render
2. Connect your repository
3. Use the following settings:
   - **Environment**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`
   - **Node Version**: 18 or higher

### Environment Variables on Render
Add these environment variables in your Render dashboard:
```env
PORT=3000
HOST=0.0.0.0
VITE_APP_TITLE=Smart Photo Editor
VITE_APP_DESCRIPTION=Modern photo editing web application
VITE_ENABLE_EFFECTS=true
VITE_ENABLE_PRO_FEATURES=true
VITE_MAX_IMAGE_SIZE=10485760
VITE_ENABLE_IMAGE_COMPRESSION=true
VITE_API_URL=https://your-production-url.com
VITE_API_TIMEOUT=30000
```

### Auto Deploy Settings
- **Branch**: main
- **Auto-Deploy**: Yes

## Environment Variables Reference

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_APP_TITLE` | Application title | Smart Photo Editor |
| `VITE_APP_DESCRIPTION` | Application description | Modern photo editing web application |
| `PORT` | Server port | 3000 |
| `HOST` | Server host | 0.0.0.0 |
| `VITE_ENABLE_EFFECTS` | Enable effects feature | true |
| `VITE_ENABLE_PRO_FEATURES` | Enable pro features | true |
| `VITE_MAX_IMAGE_SIZE` | Maximum image size in bytes | 10485760 (10MB) |
| `VITE_ENABLE_IMAGE_COMPRESSION` | Enable image compression | true |
| `VITE_API_URL` | API base URL | http://localhost:3000 |
| `VITE_API_TIMEOUT` | API timeout in milliseconds | 30000 |

## Performance Optimizations

- Code splitting with React.lazy
- Image lazy loading
- Bundle optimization
- Tree shaking
- Minification and compression
- Vendor chunk splitting

## License

MIT

## Web APIs Used

1. **Canvas API**
   - Image manipulation and processing
   - Real-time filter application
   - Custom drawing operations
   - Image data extraction

2. **Background Tasks API**
   - Scheduling non-urgent tasks
   - Performance optimization
   - UI responsiveness
   - Resource management

3. **Intersection Observer API**
   - Lazy loading of images
   - Efficient resource usage
   - Performance optimization
   - Smooth scrolling

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to the provided URL

## Technical Stack

- React
- Vite
- Material-UI
- Modern Web APIs

## Requirements

- Modern web browser with support for:
  - Canvas API
  - Background Tasks API
  - Intersection Observer API
- Sufficient system resources for image processing

## Usage

1. Upload an image using drag-and-drop or file selection
2. Adjust image properties using the sliders
3. Preview changes in real-time
4. Save the edited image
5. View all edited images in the gallery

## Note

This is a demonstration project that shows how to use modern Web APIs to create an efficient and responsive image editing application. The project focuses on client-side processing and does not include server-side storage.
#   s m a r t - p h o t o - e d i t o r 
 
 