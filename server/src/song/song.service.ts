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

    async getSong(id: number): Promise<Song | null> {
        const params = {
            TableName: 'mw_song',
            Key: {
                'song_id': id
            }
        }
        return await this.doc.get(params).promise().then((data) => {
            return data.Item as Song;
        }).catch((err) => {
            logger.error(err);
            return null;
        });
    }

    async addSong(song: Song): Promise<boolean> {
        const datayorb = { ...song };
    
        // object to be sent to AWS.
        const params = {
            // TableName - the name of the table we are sending it to
            TableName: 'mw_song',
            // Item - the object we are sending
            Item: datayorb,
            ConditionExpression: '#name <> :name',
            ExpressionAttributeNames: {
                '#name': 'name',
            },
            ExpressionAttributeValues: {
                ':name': datayorb.name,
            }
        };

        return await this.doc.put(params).promise().then((result) => {
            logger.info('Successfully created item');
            return true;
        }).catch((error) => {
            logger.error(error);
            return false;
        });
    }

    async updateSong(song: Song): Promise<boolean> {
        console.log(song);
        const params = {
            TableName: 'mw_song',
            Key: {
                'song_id': song.song_id
            },
            UpdateExpression: 'set  #genre=:g, #clicked=:cl',
            ExpressionAttributeValues: {
                
                ':g': song.genre,
                ':cl': song.clicked,
            },
            ExpressionAttributeNames: {
                '#genre': 'genre',
                '#clicked': 'clicked'
            },
            ReturnValue: 'UPDATED_NEW'
        };

        return await this.doc.update(params).promise().then(() => {
            logger.info('Successfully updated song');
            return true;
        }).catch((error) => {
            logger.error(error);
            return false;
        })
    }
    async deleteSong(song_id: number): Promise<Boolean> {
        const params = {
            TableName: 'mw_song',
            Key: {
                'song_id': song_id
            }
        }
        return await this.doc.delete(params).promise().then((data) => {
            return true;
        }).catch((err) => {
            logger.error(err);
            return false;
        });
    }
}

const songService = new SongService();
export default songService;
