import { Client } from 'pg';

export async function handler(event: any){

    const client = new Client();
    
    const data = JSON.parse(event.body);
    const { song_id, user_id, playlist_name } = data;
  
    let q = 'insert into playlist ("song_id", "user_id", "playlist_name") values ($1, $2, $3::text)'
    await client.connect();
    
        const result = await client.query(q, [song_id, user_id, playlist_name]);       
        const resultString = JSON.stringify(result);   
        client.end();
        
        
        const response = {
            "statusCode": 200,
            "body": resultString
        };

        return response;

}
