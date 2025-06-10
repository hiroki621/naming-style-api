const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

app.get("/api/:region/:decade/:sex", (req, res) => {
  const { region, decade, sex } = req.params;
  const filePath = path.join(__dirname, "data", `${region}_naming_style.json`);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "Region not found" });
  }

  const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const result = jsonData?.[region]?.[decade]?.[sex];

  if (!result) {
    return res.status(404).json({ error: "No data for that combination" });
  }

  res.json(result);
});

// Vercel向けエクスポート
module.exports = app;
