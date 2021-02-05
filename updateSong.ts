import { Client } from 'pg';
import createResponse from 'createresponse';

export async function handler(event: any) {
    let body = JSON.parse(event.body);
    let clicks = body.clicks;
    let song_id = body.song_id;

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
import { Client } from 'pg';
import createResponse from 'createresponse';

export async function handler(event: any) {
    let body = JSON.parse(event.body);
    let price= body.price;
    let song_id = body.song_id;

    client.connect();

    let result;

    const q = 'update song set price= $1::integer where song_id = $2::integer;';

    try {
        result = await client.query(q, [price, song_id]);
        client.end();
        return createResponse(JSON.stringify(result.rows), 200);
    } catch (error) {
        console.log(error);
        client.end();
        return createResponse(JSON.stringify(error.stack), 400);
    }
}