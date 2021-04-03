import express from "express";
import Nuxt from "nuxt";
import Builder from "nuxt";
const app = express();

// Import and Set Nuxt.js options
import * as config from "./nuxt.config.js";
config.dev = !(process.env.NODE_ENV === "production");

(async function () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config);

  const {
    host = process.env.HOST || "127.0.0.1",
    port = process.env.PORT || 3000,
  } = nuxt.options.server;

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  }

  // Give nuxt middleware to express
  app.use(nuxt.render);

  // Listen the server
  app.listen(port, host);
})();
