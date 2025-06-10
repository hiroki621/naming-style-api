export default async function handler(req, res) {
  const { region, decade, sex, country } = req.query;

  try {
    // ★ 相対パスに変更 → Vercelで安定動作
    const response = await fetch('https://naming-style-api.vercel.app/naming_style.json');
    if (!response.ok) throw new Error('Failed to fetch JSON');
    const data = await response.json();

    if (region === 'usa') {
      return res.status(200).json(data.usa.general);
    }

    if (region === 'europe') {
      if (!country) return res.status(400).json({ error: 'Missing country for Europe' });
      const result = data.europe[country.toLowerCase()];
      return result
        ? res.status(200).json(result)
        : res.status(404).json({ error: 'Country not found in Europe' });
    }

    const result = data?.[region]?.[decade]?.[sex];
    if (!result) return res.status(404).json({ error: 'Style not found' });

    return res.status(200).json(result);
  } catch (e) {
    console.error('API error:', e);
    return res.status(500).json({ error: 'Server Error', message: e.message });
  }
}
