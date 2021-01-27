
var axios = require('axios').default;

import dotenv from 'dotenv';
dotenv.config();



async function getDeezerData(){

    var options = {
        method: 'GET',
        url: 'https://deezerdevs-deezer.p.rapidapi.com/search',
        params: {q: 'eminem'},
        headers: {
          'x-rapidapi-key': process.env.SUPERSECRET,
          'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com'
        }
      };

    await axios.request(options).then(function (response: any) {
        console.log(response.data);
    }).catch(function (error: any) {
        console.error(error);
    });
    
}


export default getDeezerData;