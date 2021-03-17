import express from "express";
import { db } from "../lib/db/db.js";

const { Router } = require("express");

const router = Router();

router.use(express.json());

router.get("/results", function (req, res, next) {
  const sql = `SELECT * FROM "main"."results_with_metadata_top_1000";`;
  db.all(sql, function (err, row) {
    res.json(row);
  });
});

module.exports = router;
