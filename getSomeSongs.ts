
import { Client } from 'pg';

interface MyEvent {
    path: string;
}
// getSongs by title or by artistname for example
export async function handler(event: MyEvent) {
    let query  = event.path.substring(event.path.lastIndexOf('/')+1, event.path.length);

    let result: any;
    let q: any;
    const client = new Client();
    await client.connect();
    if(query) {
        q = 'select * from song where lower(artist) like $1::text';
        query = query.toLowerCase();
        query = '%' + query + '%';
    }
    else {
        query='';
    }        

    // result = await client.query(q, [query]);
    // client.end();
   // return result.rows;
   return query;
}