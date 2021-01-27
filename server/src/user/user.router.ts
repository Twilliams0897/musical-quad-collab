import express from 'express';
import * as user from './user';
import logger from '../log';
import userService from './user.service';

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
  res.send('This is where the login page would be');
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


router.delete('/:username', function(req: any, res: any){
  const username = req.params.username;
  if( req.session && req.session.user && req.session.user.role === 'admin'){
    userService.deleteUser(username).then((data) => {
      logger.debug(username, ' : delete a user');
      res.send(JSON.stringify(data));
    }).catch((err) => res.send(JSON.stringify(err)) )

  }
  else {
    res.send('You are not authorized to delete ' + username);
  }
});


router.post('/register', function(req: any, res: any){

  const username = req.body.username;
  const password = req.body.password;
  if (req.session && req.session.user.role == 'admin'){
    user.registerEmp(username, password).then(data => res.send(JSON.stringify(data)))
  .catch(err => res.send(JSON.stringify(err)))
  }
  else{
    user.register(username, password).then(data => res.send(JSON.stringify(data)))
  .catch(err => res.send(JSON.stringify(err)))
  }

})



export default router;
