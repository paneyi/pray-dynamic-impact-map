import { Router } from 'express';
import { getPastor, getPastorEngagements } from './pastor.controller';

const router: Router = Router();

router.get('/:pastor_id', getPastor);
router.get('/:pastor_id/impact-map', getPastorEngagements);

export default router;