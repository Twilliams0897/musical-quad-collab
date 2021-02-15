import { Client } from 'pg';

export async function handler(event: any) {
	let song_id = Number(
		event.path.substring(event.path.lastIndexOf('/') + 1, event.path.length)
	);

	let data = JSON.parse(event.body);
	let { clicks } = data;

	const client = new Client();

	client.connect();

	let result;

	const q = 'update song set clicks = $1::integer where song_id = $2::integer;';
	result = await client.query(q, [clicks, song_id]);
	const resultString = JSON.stringify(result);
	client.end();

	const response = {
		statusCode: 200,
		body: resultString,
	};

	return response;
}
