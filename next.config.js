const path = require('path')
const withExportImages = require('next-export-optimize-images')

const nextConfig = withExportImages({
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'node_modules/foundation-sites/scss')]
  }
})

module.exports = nextConfig
