// Librarys
const path = require('path')

module.exports = {
  webpack: {
    alias: {
      '@api': path.resolve(__dirname, 'src/api'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@context': path.resolve(__dirname, 'src/context'),
      '@containers': path.resolve(__dirname, 'src/containers'),
      '@common': path.resolve(__dirname, 'src/components/common'),
      '@layouts': path.resolve(__dirname, 'src/components/layouts'),
      '@loaders': path.resolve(__dirname, 'src/components/loaders'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@types': path.resolve(__dirname, 'src/types'),
      '@interfaces': path.resolve(__dirname, 'src/interfaces'),
    },
  },
}
