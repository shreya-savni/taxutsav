import { Router } from 'express';
import { calculate } from '../controllers/tdsController.js';

const router = Router();

router.post('/calculate', calculate);

export default router;





