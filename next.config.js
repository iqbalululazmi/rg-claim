module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/promo',
        permanent: true,
      },
    ]
  },
}
