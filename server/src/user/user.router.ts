import express from 'express';
import * as user from './user';
import logger from '../log';

const router = express.Router();

/* testing whether dynamo db connection works */
router.post('/', function(req: any, res, next) {
  logger.debug(req.body);
  user.login(req.body.name, req.body.password).then((user) => {
    if(user === null) {
      res.sendStatus(401);
    }
    req.session.user = user;
   console.log(JSON.stringify(user) + ' from /user with post method');
    res.send('success');

  });
});

export default router;
