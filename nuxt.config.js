module.exports = {
  target: "server",
  telemetry: false,
  serverMiddleware: ["~/server-middleware/index.js"],
  plugins: [{ src: "~/plugins/vue-good-table.js", ssr: false }],
  modules: [
    '@nuxt/http',
  ],
  env: {
    baseUrl: process.env.BASE_URL || `http://localhost:${process.env.PORT || 3000}`
  }
};
