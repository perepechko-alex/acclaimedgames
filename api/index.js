import express from "express";
const app = express();

// Require API routes
import * as apiRoutes from "../routes/routes.js";

// Import API Routes
app.use(apiRoutes);

// Export the server middleware
module.exports = {
  path: "/api",
  handler: app,
};

export default {
  path: "/api",
  handler: app,
};
