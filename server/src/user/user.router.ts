import express from 'express';
import * as user from './user';
import logger from '../log';

const router = express.Router();

router.get('/', (req: any, res, next) => {
  let u = {...req.session.user};
  logger.debug(u);
  //delete u.password;
  if(u.username) {
    res.send(JSON.stringify(u));
  } else {
    res.sendStatus(401); // unauthorized
  }
});

// needed this to get session
router.get('/login', function(req: any, res, next) {
  // If I'm already logged in, why would I log in again?
  if(req.session.user) {
    console.log(req.session.user);
    res.redirect('/');
  }
  res.send('<h1> Cannot login </h1>');
});

/* testing whether dynamo db connection works and set session*/
router.post('/', function(req: any, res) {
  logger.debug(req.body);
  user.login(req.body.username, req.body.password).then((user) => {
    if(user === null) {
      res.sendStatus(401);
    }
    else{
      req.session.user = user;
      res.send(JSON.stringify(user) + ' from /users/dydb with post method and data from dynamoDb');
    }
  });
});


export default router;
