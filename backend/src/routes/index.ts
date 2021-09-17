import { Router } from "express";
import auth from './auth';
import embed from './embed';

const router = Router();

router.use('/auth', auth);
router.use('/embed', embed);

export default router;