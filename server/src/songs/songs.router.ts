import express from 'express';
import getSongs from './songs.service';

const router = express.Router();

router.get('/', (req, res, next) => {
	getSongs();
});

export default router;
