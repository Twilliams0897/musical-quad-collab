import * as AWS from 'aws-sdk';

let docClient = new AWS.DynamoDB.DocumentClient({
    region: 'us-west-2',
    endpoint: 'http://dynamodb.us-west-2.amazonaws.com'
});

interface MyEvent {
    body: string;
}


export const handler = async (event: MyEvent ): Promise<any> =>  {
   
    let rest: Restaurant = JSON.parse(event.body) as Restaurant;
    let resp = await addRestaurant(rest);
    if (resp) {
        return {statusCode: 204};
    } else {
        return {statusCode: 400};
    }

}


async function addRestaurant(rest: Restaurant): Promise<boolean> {
    const datayorb = { ...rest };
    delete datayorb.eta;
    // object to be sent to AWS.
    const params = {
        // TableName - the name of the table we are sending it to
        TableName: 'restaurants',
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

    return await docClient.put(params).promise().then((result) => {
        return true;
    }).catch((error) => {
        return false;
    });
}


class Restaurant {
    name: string = '';
    chef: string = '';
    menu: Food[] = [];
    rating: number = 0;
    hours: Hours[] = [];
    img: string = '';
    type: string = '';
    eta?: number = 0;
    constructor(){}
}
interface Food {
    name: string;
    price: number;
}
interface Hours {
    day: string;
    open: number;
    close: number;
}