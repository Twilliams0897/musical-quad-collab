import Express from 'express';
import logger from '../log';
import songService from '../song/song.service'

const router = Express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
    songService.getSongs().then((songs) => {
        res.send(JSON.stringify(songs));
    });
});

router.get('/:id', function(req, res, next) {
    songService.getSong(Number(req.params.id)).then((song)=>{
        res.send(JSON.stringify(song));
    });
})

router.delete('/:id', function (req, res, next) {
    logger.debug(req.body);
    songService.deleteSong(Number(req.params.id)).then((data)=> {
        logger.debug(data);
        res.sendStatus(200); // Created
    }).catch((err) => {
        logger.error(err);
        res.sendStatus(500); // Server error, sorry
    })
});

router.post('/', (req, res, next) => {
    logger.debug(req.body);
    songService.addSong(req.body).then((data)=> {
        logger.debug(data);
        res.sendStatus(201); // Created
    }).catch((err) => {
        logger.error(err);
        res.sendStatus(500); // Server error, sorry
    })
});

router.put('/', (req, res, next) => {
    logger.debug(req.body);
    songService.updateSong(req.body).then((data)=> {
        res.send(data);
    })
})
export default router;