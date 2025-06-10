const fs = require("fs");
const path = require("path");

const namingData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "naming_style.json"), "utf-8")
);

function getNamingStyle(region, decade, sex = null) {
  const data = namingData[region.toLowerCase()];
  if (!data) return null;

  if (region.toLowerCase() === "usa") {
    return data.general;
  }

  if (region.toLowerCase() === "europe") {
    return data[decade.toLowerCase()] ?? null; // or adjust if needed
  }

  if (data[decade] && sex && data[decade][sex]) {
    return data[decade][sex];
  }

  return null;
}
