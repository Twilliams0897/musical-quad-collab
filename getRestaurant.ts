import * as AWS from 'aws-sdk';

let docClient = new AWS.DynamoDB.DocumentClient({
    region: 'us-west-2',
    endpoint: 'http://dynamodb.us-west-2.amazonaws.com'
});



async function getRestaurant(id: string): Promise<Restaurant | null> {
    const params = {
        TableName: 'restaurants',
        Key: {
            'name': id
        }
    }
    return await docClient.get(params).promise().then((data: any) => {
        return data.Item as Restaurant;
    }).catch((err: any) => {
        return null;
    });
}

interface MyEvent {
    path: string;
}

export const handler = async (event: MyEvent ): Promise<any> =>  {
   
    console.log(event.path);

    let restName = event.path.substring(event.path.lastIndexOf('/')+1, event.path.length);
    const rest = await getRestaurant(restName);
    if (rest) {
        return {statusCode: 200, body: JSON.stringify(rest)};
    } else {
        return {statusCode: 404, body: JSON.stringify({})};
    }

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