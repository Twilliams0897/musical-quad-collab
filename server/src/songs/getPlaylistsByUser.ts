import { Client } from 'pg';
import createResponse from 'createresponse';

export async function handler(event: any) {
	let body = JSON.parse(event.body);
	let user_id = body.user_id;

	const client = new Client({
		host: process.env.PGHOST,
		user: process.env.PGUSER,
		password: process.env.PGPASSWORD,
		database: process.env.PGDATABASE,
	});

	client.connect();

	let result;

	const q =
		'select * from song s join playlist p on s.song_id = p.song_id where p.user_id = $1::integer order by p.user_id, p.playlist_name;';

	try {
		result = await client.query(q, [user_id]);
		client.end();
		return createResponse(JSON.stringify(result.rows), 200);
	} catch (error) {
		console.log(error);
		client.end();
		return createResponse(JSON.stringify(error.stack), 400);
	}
}
