import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const getSongs = async () => {
	const client = new Client({
		host: process.env.PGHOST,
		user: process.env.PGHOST,
		password: process.env.PGPASSWORD,
		database: process.env.PGDATABASE,
	});

	await client
		.query('SELECT * from song LIMIT 20')
		.then((res: any) => console.log(res.rows))
		.catch((e: any) => console.error(e.stack));

	await client.end();
};

export default getSongs;
