import dotenv from 'dotenv';
dotenv.config();



async function getDeezerData(url: any){
    let requestHeaders: any = {
        'Content-Type': 'application/json',
        "x-rapidapi-key": process.env.superSecretKey,
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
    }
    await fetch(url, {
        method: 'GET', 
        headers : requestHeaders
    }).then(resp => {
        console.log(resp);
        return resp;
    }).catch(err => {
        console.error(err);
        return null;
    })
    
}


export default getDeezerData;