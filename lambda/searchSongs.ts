import { Client } from 'pg';

export async function handler(event: any) {
	let { artist, title } = event;
	let result: any;
	let query;
	let q: any;
	const client = new Client();
	await client.connect();
	if (artist) {
		q = 'select * from song where lower(artist) like $1::text';
		query = artist.toLowerCase();
		query = '%' + query + '%';
	} else if (title) {
		q = 'select * from song where lower(title) like $1::text';
		query = title.toLowerCase();
		query = '%' + query + '%';
	} else {
		return [];
	}

	result = await client.query(q, [query]);
	client.end();
	return result.rows;
}
