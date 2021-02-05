
import { Client } from 'pg';

export async function handler(event){
    let userId = event.path.substring(event.path.lastIndexOf('/'+1, event.path.length));
    let stripped = userId.replace(/[^0-9]/g, '');
    console.log(Number(stripped), '------');
    const client = new Client();


    await client.connect();

    const q = 'SELECT * from playlist where user_id = $1;';
    const res = await client.query(q, [Number(stripped)]);
    
    console.log(res.rows[0]);

    await client.end();


    const response = {
        "statusCode": 200,
        "body": res.rows
    };

    return response;

}
