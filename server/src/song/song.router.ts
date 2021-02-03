import { Pool } from 'pg';
// We shouldn't use Client because it creates a connection not in the pool.
// We'll probably have to use client in AWS Lambda, though.

import express from 'express';
import dotenv from 'dotenv';
import publicDir from '../constant';
dotenv.config();

const router = express.Router();

// Creating a connection pool of pg Clients
// new Pool() will retrieve environment variables
const pool = new Pool();

// user should be handled from /users not /songs
function login(user: string, pass: string, cb: Function) {
  const q = `select * from user_account where username=$1::text and password=$2::text`;
  const args = [user, pass];
  cb(q, args);

}


// /songs -- get all songs
function songs(cb: Function){
  const q = `select * from song`;
  cb(q);
}


router.get('/', function(req: any, res: any){
    
  // songs( async (q: string) => {
  //   const resp = await pool.query(q);
  //   console.log(resp.rows[0]);
  //   // pool.end();
  //   res.send(resp.rows);
  
  // });
  res.send('test songs from api gateway ip address');
})

// get song by song_id or by artist return only one song
const getSongById = (song_id: number, cb: Function) => {
  const q = `select * from song where song_id=$1::integer`;
  const args = [song_id];
  cb(q, args);

}


const getSongByArtist = (artist: string, cb: Function) => {
  const q = `select * from song where artist=$1::text`;
  const args = [artist];
  cb(q, args);

}

// router.get('/:name',  function(req: any, res: any, next: Function){

//   const name = req.params.name;

//   if( Number(name) || name == 0 ){
//       getSongById(name, async (q: string, args: string[] )=>{
      
//         const resp = await pool.query(q, args);
    
//         console.log(resp.rows);
      
//         res.send(JSON.stringify(resp.rows[0]));
//       });
//   }
//   else if(typeof(name) === 'string'){

//     getSongByArtist(name, async (q: string, args: string[] )=>{
      
//       const resp = await pool.query(q, args);
  
//       console.log(resp.rows);
    
//       res.send(JSON.stringify(resp.rows[0]));
//     });
//   }
//  else {
//   res.send("error.html", {root: publicDir});
//  }


// })
 
// or we can do /songs/artist/:name  


function quit() {
    // The app is closing, shut down the connections. when should we terminate connection?
    pool.end();
    process.exit();
}




//update song by Id
// const updateSongById = (song_id: number, cb: Function) => {
//     const q = `select * from song where song_id=$1::integer`;
//     const args = [song_id];
//     cb(q, args);
  
//   }

// router.put('/songs/:song_id', (req, res, next) => {
//     logger.debug(req.body);
//     songService.updateSong(req.body).then((data)=> {
//         res.send(data);
//     })
// })
export default router;