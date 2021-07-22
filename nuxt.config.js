import { getGameRoutes } from "./lib/getGameRoutes";
module.exports = {
  target: "static",
  telemetry: false,
  serverMiddleware: ["~/server-middleware/index.js"],
  plugins: [{ src: "~/plugins/vue-good-table.js", ssr: true }],
  modules: ["@nuxt/http"],
  generate: {
    async routes() {
      const gamesArr = await getGameRoutes();
      return gamesArr;
    }
  },
  env: {
    baseUrl:
      process.env.BASE_URL || `http://localhost:${process.env.PORT || 3000}`,
  },
};
