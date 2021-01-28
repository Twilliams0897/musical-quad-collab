import express from 'express';
import publicDir from '../constant';
import getDeezerData from '../deezer/deezer';
import data from '../data';




const router = express.Router();

/* GET home page. */
router.get('/', function(req: any, res: any, next: Function) {
  res.sendFile('index.html', {root: publicDir});
});


router.get('/data', function(req,res,next){
  const songs = data.songs;
  const titles = songs.map(item => {
    return  item.title 
  });
  console.log('the total number of songs are: ', titles.length);
  console.log(songs[0]);
  res.send( titles);

} )


router.get('/deezer', function(req: any,res: any){
  res.send('Why here? I dont have data.  Deezer will deliver data to you');
})

export default router;
