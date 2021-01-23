import * as AWS from 'aws-sdk';
import userService from '../user/user.service';


// Set the region
AWS.config.update({ region: 'us-west-2' });

// Create a DynamoDB service object
const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });


const removeUsers = {
    TableName: 'users'
}

const userSchema = {
    AttributeDefinitions: [
        {
            AttributeName: 'name',
            AttributeType: 'S'
        }
    ],
    KeySchema: [
        {
            AttributeName: 'name',
            KeyType: 'HASH'
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 3,
        WriteCapacityUnits: 3
    },
    TableName: 'users',
    StreamSpecification: {
        StreamEnabled: false
    }
};



ddb.deleteTable(removeUsers, function (err, data) {
    if (err) {
        console.error('Unable to delete table. Error JSON:', JSON.stringify(err, null, 2));
    } else {
        console.log('Deleted table. Table description JSON:', JSON.stringify(data, null, 2));
    }
    setTimeout(()=>{
        ddb.createTable(userSchema, (err, data) => {
            if (err) {
                // log the error
                console.log('Error', err);
            } else {
                // celebrate, I guess
                console.log('Table Created', data);
                setTimeout(()=>{
                    populateUserTable();
                }, 5000);
            }
        });
    }, 5000);
});

function populateUserTable() {
    userService.addUser({name: 'Bob', password: 'pass', credits: 10, role: 'customer', playlist: [{song_id: 5, clicked: 4}]}).then(()=>{});
    userService.addUser({name: 'Kamila', password: 'pass', credits: 10, role: 'employee', playlist: [{song_id:3, clicked: 7 }]}).then(()=>{});
}