import express from 'express';
import { weatherRouter } from './modules/weather/weather.controller';

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());

app.use('/api/weather', weatherRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
