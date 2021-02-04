import { Client } from 'pg';

export async function handler(){

    const client = new Client();
    await client.connect();

    const q = 'SELECT * from playlist'
    const res = await client.query(q);
    console.log(res.rows[0]);

    await client.end();
    return res.rows;
}
