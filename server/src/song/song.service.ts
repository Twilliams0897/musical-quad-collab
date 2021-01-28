import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import dynamo from '../dynamo/dynamo';
import logger from '../log';
import { Song } from './song';

class SongService {
    private doc: DocumentClient;
    constructor() {
        // The documentClient. This is our interface with DynamoDB
        this.doc = dynamo; // We imported the DocumentClient from dyamo.ts
    }

    async getSongs(): Promise<Song[]> {
        const params = {
            TableName: 'mw_song'
        };
        return await this.doc.scan(params).promise().then((data) => {
            return data.Items as Song[];
        }).catch((err) => {
            logger.error(err);
            return [];
        });
    }


    
}

const songService = new SongService();
export default songService;
