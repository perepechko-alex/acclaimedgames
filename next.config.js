module.exports = {
  env: {
    baseUrl:
      `${process.env.BASE_URL}:${process.env.API_PORT}` ||
      `http://localhost:${process.env.API_PORT || 5000}`,
  },
};
