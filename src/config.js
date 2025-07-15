/**
 * Application configuration with environment variables and defaults
 */
export const config = {
  app: {
    title: import.meta.env.VITE_APP_TITLE || 'Smart Photo Editor',
    description: import.meta.env.VITE_APP_DESCRIPTION || 'Modern photo editing web application',
  },
  server: {
    port: import.meta.env.PORT || 3000,
    host: import.meta.env.HOST || '0.0.0.0',
  },
  features: {
    enableEffects: import.meta.env.VITE_ENABLE_EFFECTS !== 'false',
    enableProFeatures: import.meta.env.VITE_ENABLE_PRO_FEATURES !== 'false',
  },
  image: {
    maxSize: parseInt(import.meta.env.VITE_MAX_IMAGE_SIZE || '10485760', 10), // 10MB in bytes
    enableCompression: import.meta.env.VITE_ENABLE_IMAGE_COMPRESSION !== 'false',
    defaultQuality: 0.8,
  },
  api: {
    url: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '30000', 10),
  },
};

/**
 * Environment-specific configuration
 */
export const isProduction = import.meta.env.PROD;
export const isDevelopment = import.meta.env.DEV;

/**
 * Feature flags
 */
export const features = {
  isEffectsEnabled: config.features.enableEffects,
  isProFeaturesEnabled: config.features.enableProFeatures,
};

/**
 * Image processing configuration
 */
export const imageConfig = {
  maxSize: config.image.maxSize,
  enableCompression: config.image.enableCompression,
  supportedTypes: ['image/jpeg', 'image/png', 'image/webp'],
  defaultQuality: config.image.defaultQuality,
}; 