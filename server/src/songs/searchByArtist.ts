import { Client } from 'pg';
import createResponse from 'createresponse';

export async function handler(event: any) {
	let query: string = event.body;

	const client = new Client({
		host: process.env.PGHOST,
		user: process.env.PGUSER,
		password: process.env.PGPASSWORD,
		database: process.env.PGDATABASE,
	});

	client.connect();

	let result;
	query = query.toLowerCase();
	query = '%' + query + '%';
	const q = 'select * from song where lower(artist) like $1::text';

	try {
		result = await client.query(q, [query]);
		client.end();
		return createResponse(JSON.stringify(result.rows), 200);
	} catch (error) {
		console.log(error);
		client.end();
		return createResponse(JSON.stringify(error.stack), 400);
	}
}
