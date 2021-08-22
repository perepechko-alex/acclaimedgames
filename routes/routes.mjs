import express from "express";
import { db } from "../lib/db/db.mjs";
import { Router } from "express";

const router = Router();

router.use(express.json());

router.get(["/api/results"], function (req, res, next) {
  const sql = `SELECT * FROM "main"."results_with_metadata_1000";`;
  db.all(sql, function (err, row) {
    res.json(row);
  });
});

router.get("/api/:game", function (req, res, next) {
  const sql = `SELECT name, rank, weightedpoints, publication, listyear, listtype FROM "main"."goat" WHERE name='${req.params.game}';`;
  db.all(sql, function (err, row) {
    res.json(row);
  });
});

export default router;
