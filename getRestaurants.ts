import * as AWS from 'aws-sdk';

let docClient = new AWS.DynamoDB.DocumentClient({
    region: 'us-west-2',
    endpoint: 'http://dynamodb.us-west-2.amazonaws.com'
});


export const handler = async () => {
    const rest =  await getRestaurants();
    if(rest){
        return JSON.stringify(rest);
    }
    else{
        return '404'
    }

}
async function getRestaurants(): Promise<Restaurant[] | null> {
    const params = {
        TableName: 'restaurants'
    };
    return await docClient.scan(params).promise().then((data: any) => {
        return data.Items as Restaurant[];
    }).catch((er: any) => {
        return null ;
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