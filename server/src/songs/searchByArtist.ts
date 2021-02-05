import { Client } from 'pg';
import createResponse from 'createresponse';

export async function handler(event: any) {
	let body = JSON.parse(event.body);
	let artist = body.artist;

	const client = new Client({
		host: process.env.PGHOST,
		user: process.env.PGUSER,
		password: process.env.PGPASSWORD,
		database: process.env.PGDATABASE,
	});

	client.connect();

	let result;
	artist = artist.toLowerCase();
	artist = '%' + artist + '%';
	const q = 'select * from song where lower(artist) like $1::text';

	try {
		result = await client.query(q, [artist]);
		client.end();
		return createResponse(JSON.stringify(result.rows), 200);
	} catch (error) {
		console.log(error);
		client.end();
		return createResponse(JSON.stringify(error.stack), 400);
	}
}
