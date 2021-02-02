import express from 'express';
import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.get('/', async (req, res, next) => {
	const client = new Client({
		host: process.env.PGHOST,
		user: 'RN2012michael',
		password: process.env.PGPASSWORD,
		database: process.env.PGDATABASE,
	});
	client.connect();
	const q = 'SELECT * from song LIMIT 20';
	let result;
	try {
		result = await client.query(q);
		res.status(200).send(result.rows);
	} catch (error) {
		console.log(error);
		res.status(400).send(error.stack);
	}
	client.end();
});

export default router;
