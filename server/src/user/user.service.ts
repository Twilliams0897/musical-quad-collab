import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import dynamo from '../dynamo/dynamo';
import logger from '../log';
import { User } from './user';

class UserService {
    private doc: DocumentClient;
    constructor() {
        // The documentClient. This is our interface with DynamoDB
        this.doc = dynamo; // We imported the DocumentClient from dyamo.ts
    }


    async getUserByName(username: string): Promise<User | null> {
        // GetItem api call allows us to get something by the key
        const params = {
            TableName: 'users',
            Key: {
                'username': username
            }
        };
        return await this.doc.get(params).promise().then((data) => {
            if (data && data.Item) {
                logger.debug(`data.Item: ${JSON.stringify(data.Item)}`);
                return data.Item as User;
            } else {
                return null;
            }
        })
    }

    async addUser(user: User): Promise<boolean> {
        // object to be sent to AWS.
        const params = {
            // TableName - the name of the table we are sending it to
            TableName: 'users',
            // Item - the object we are sending
            Item: user,
            ConditionExpression: '#username <> :username',
            ExpressionAttributeNames: {
                '#username': 'username',
                //'#role': 'role'
            },
            ExpressionAttributeValues: {
                ':username': user.username,
                //':role': user.role
            }
        };

        return await this.doc.put(params).promise().then((result) => {
            logger.info('Successfully created user');
            return true;
        }).catch((error) => {
            logger.error(error);
            return false;
        });
    }

    async deleteUser(username: string): Promise<boolean> {
        const params = {
            TableName: 'users',
            Key: {
                'username': username
            }
        }

        return await this.doc.delete(params).promise().then((data) => {
            return true;
        }).catch(err => {
            logger.error(err);
            return false;
        });

    }






} //end of UserService

const userService = new UserService();
export default userService;
