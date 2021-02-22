import { Client } from 'pg';

export async function handler(event: any) {
	let song_id = Number(
		event.path.substring(event.path.lastIndexOf('/') + 1, event.path.length)
	);
	const client = new Client();

	let q = 'delete from song where song_id = $1;';

	await client.connect();

	const result = await client.query(q, [song_id]);
	console.log(song_id);
	const resultString = JSON.stringify(result);
	client.end();

	const response = {
		statusCode: 200,
		body: resultString,
	};

	return response;
}
