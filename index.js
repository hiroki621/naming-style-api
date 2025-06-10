const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

// JSONファイルの読み込みエンドポイント（例：/api/style/japan/2010s/female）
app.get('/api/style/:region/:decade/:sex', (req, res) => {
  const { region, decade, sex } = req.params;

  const filePath = path.join(__dirname, `${region}_naming_style.json`);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Region not found' });
  }

  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  const style = data?.[region]?.[decade]?.[sex];
  if (!style) {
    return res.status(404).json({ error: 'Style not found' });
  }

  res.json(style);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
