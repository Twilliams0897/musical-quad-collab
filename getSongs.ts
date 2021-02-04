import { Client } from 'pg';

export async function handler(){

    const client = new Client();
    await client.connect();

    const q = 'SELECT song_id, title, artist, year, img_url, clicks, price from song'
    const res = await client.query(q);
    console.log(res.rows[0]);

    await client.end();
    return res.rows;
}



