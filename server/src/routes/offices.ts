import { Router } from 'express';
import offices from '../data/offices.json' with { type: 'json' };

const router = Router();

router.get('/', (_req, res) => {
  res.json(offices);
});

export default router;
