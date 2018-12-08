module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.0.112:3000',
        changeOrigin: true,
        ws: true
      }
    }
  }
}