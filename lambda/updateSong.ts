import { Client } from 'pg';
import createResponse from 'createresponse';

export async function handler(event: any) {
	let body = JSON.parse(event.body);
	let clicks = body.clicks;
	let song_id = body.song_id;

	const client = new Client({
		host: process.env.PGHOST,
		user: process.env.PGUSER,
		password: process.env.PGPASSWORD,
		database: process.env.PGDATABASE,
	});

	client.connect();

	let result;

	const q = 'update song set clicks = $1::integer where song_id = $2::integer;';

	try {
		result = await client.query(q, [clicks, song_id]);
		client.end();
		return createResponse(JSON.stringify(result.rows), 200);
	} catch (error) {
		console.log(error);
		client.end();
		return createResponse(JSON.stringify(error.stack), 400);
	}
}
