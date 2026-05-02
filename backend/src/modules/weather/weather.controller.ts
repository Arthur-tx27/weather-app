import { Router, Request, Response } from 'express';
import { getWeatherForecast, searchCity } from './weather.service';

const router = Router();

router.get('/search', async (req: Request, res: Response) => {
  const { q } = req.query;

  if (!q || typeof q !== 'string') {
    res.status(400).json({
      error: { message: 'Missing query param: q', code: 400 },
    });
    return;
  }

  try {
    const results = await searchCity(q);
    res.json({ data: results });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    res.status(500).json({ error: { message, code: 500 } });
  }
});

router.get('/forecast', async (req: Request, res: Response) => {
  const { city, latitude, longitude } = req.query;

  if (!city || !latitude || !longitude) {
    res.status(400).json({
      error: { message: 'Missing required query params: city, latitude, longitude', code: 400 },
    });
    return;
  }

  try {
    const forecast = await getWeatherForecast(
      String(city),
      Number(latitude),
      Number(longitude),
    );
    res.json({ data: forecast });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    res.status(500).json({ error: { message, code: 500 } });
  }
});

export { router as weatherRouter };
