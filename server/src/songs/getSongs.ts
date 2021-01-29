import { Client } from 'pg';
import createResponse from 'createresponse';

export async function handler() {
	const client = new Client({
		host: process.env.PGHOST,
		user: process.env.PGUSER,
		password: process.env.PGPASSWORD,
		database: process.env.PGDATABASE,
	});

	client.connect();

	const q = 'SELECT * from song LIMIT 20';

	let result;

	try {
		result = await client.query(q);
		client.end();
		return createResponse(JSON.stringify(result.rows), 200);
	} catch (error) {
		console.log(error);
		client.end();
		return createResponse(JSON.stringify(error.stack), 400);
	}
}
