import { readFileSync } from 'fs';
import path from 'path';

export default function handler(req, res) {
  const { region, decade, sex, country } = req.query;

  try {
    const filePath = path.join(process.cwd(), 'data', 'naming_style.json');
    const raw = readFileSync(filePath, 'utf-8');
    const data = JSON.parse(raw);

    // 特別処理：USA
    if (region === 'usa') {
      return res.status(200).json(data.usa.general);
    }

    // 特別処理：Europe + Country
    if (region === 'europe') {
      if (!country) return res.status(400).json({ error: 'Missing country for Europe' });
      const result = data.europe[country.toLowerCase()];
      return result
        ? res.status(200).json(result)
        : res.status(404).json({ error: 'Country not found in Europe' });
    }

    // 通常処理：region-decade-sex
    const result = data?.[region]?.[decade]?.[sex];
    if (!result) return res.status(404).json({ error: 'Style not found' });

    return res.status(200).json(result);
  } catch (e) {
    console.error('API error:', e);
    return res.status(500).json({ error: 'Server Error', message: e.message });
  }
}
