module.exports = {
  target: "server",
  telemetry: false,
  serverMiddleware: ["~/api/index.js"],
  plugins: [{ src: "~/plugins/vue-good-table.js", ssr: false }],
};
