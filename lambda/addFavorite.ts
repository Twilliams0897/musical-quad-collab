import { Client } from 'pg';

export async function handler(event: any) {
	const client = new Client();

	const data = JSON.parse(event.body);
	const { song_id, user_id } = data;

	let q = 'insert into favorites ("song_id", "user_id") values ($1, $2)';
	await client.connect();

	const result = await client.query(q, [song_id, user_id]);
	const resultString = JSON.stringify(result);
	client.end();

	const response = {
		statusCode: 200,
		body: resultString,
	};

	return response;
}
