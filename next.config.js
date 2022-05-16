module.exports = {
  env: {
    baseUrl: `${process.env.BASE_URL}:${process.env.API_PORT}` || `https://localhost:${process.env.API_PORT || 5000}`,
  },
};
