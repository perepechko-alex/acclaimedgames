import express from "express";
import next from "next";
// const bodyParser = require('body-parser')

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
import router  from "./routes/routes.mjs";

app.prepare().then(() => {
  const server = express();

  server.use(router);

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(5000, (err) => {
    if (err) throw err;
    console.log("Ready on http://localhost:5000");
  });
});
