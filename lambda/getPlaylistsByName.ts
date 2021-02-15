import { Client } from 'pg';

interface MyEvent {
	path: string;
}

export async function handler(event: any) {
	let playlist_name = event.path.substring(
		event.path.lastIndexOf('/') + 1,
		event.path.length
	);

	playlist_name = decodeURIComponent(playlist_name);
	playlist_name = playlist_name.toLowerCase();

	const client = new Client({
		host: process.env.PGHOST,
		user: process.env.PGUSER,
		password: process.env.PGPASSWORD,
		database: process.env.PGDATABASE,
	});

	client.connect();

	let result;

	const q =
		'select * from song s join playlist p on s.song_id = p.song_id where lower(p.playlist_name) = $1::text order by p.playlist_id;';

	try {
		result = await client.query(q, [playlist_name]);
		client.end();
		return {
			body: JSON.stringify(result.rows),
			statusCode: 200,
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
		};
	} catch (error) {
		console.log(error);
		client.end();
		return {
			body: JSON.stringify(error.stack),
			statusCode: 400,
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
		};
	}
}
