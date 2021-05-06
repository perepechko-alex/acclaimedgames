import express from "express";
import { db } from "../lib/db/db.js";
import { Router } from "express";

const router = Router();

router.use(express.json());

router.get("/results", function (req, res, next) {
  const sql = `SELECT * FROM "main"."results_with_metadata_top_1000";`;
  db.all(sql, function (err, row) {
    res.json(row);
  });
});

router.get("/:game", function(req, res, next) {
  const sql = `SELECT * FROM "main"."goat" WHERE name='${req.params.game}';`
  db.all(sql, function (err, row) {
    res.json(row);
  });
})

module.exports = router;
