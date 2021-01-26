import express from 'express';
import publicDir from '../constant';
import getDeezerData from '../deezer/deezer';

const router = express.Router();

/* GET home page. */
router.get('/', function(req: any, res: any, next: Function) {
  res.sendFile('index.html', {root: publicDir});
});

const url = "https://deezerdevs-deezer.p.rapidapi.com/search?q=eminem";

router.get('/deezer', function(req: any,res: any){
  getDeezerData(url).then(resp => {
    console.log(resp);
    res.send(JSON.stringify(resp))
  }).catch(err => {
    res.send(JSON.stringify(err));
  })


})
export default router;
