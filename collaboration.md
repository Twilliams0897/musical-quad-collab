# Git branche names

- master branch name: main (update publishing time?)
- dev branch name: dev (update at the meeting?)
- jamie:
- michael: michael
- tashika:
- yasmine:

#One of two ways of starting a project:

- git init
- git remote add origin https://github.com/Twilliams0897/musical-quad-collab.git
- git config --list
- git pull origin dev
- cd server then npm install
- cd client then npm install
- git checkout -b your-local-branch-name

# Task done on 1/22/21

- setup dynamodb and aws rds both working'

## directory structure

```
client
   deezer
   screens
   store
      action.tsx
      reducer.tsx
   user
   App.tsx
server
   bin
   build
   public
   src
      deezer
      dynamo
      song
      setup
      staticrouter
      user
      app
```

```
user { userId, username, password, role, credits,  favorites: [song_id],
       playlist: [playlist_id]
 }
 // 'customer', 'employee', 'admin' in dynamoDb

user_account { userId, username, password, role, credits,  favorites: [song_id],
       playlist: [playlist_id]
 }
 // user_account also in pg

playlist {
	playlist_id: PK, song_id : FK, user_id: FK,

}   : pg


 song {
     song_id: number , clicked: number
 }   in pg


 api endpoints to test: /, /users, /pg/user, /pg/songs, /pg/playlist/:id
```

## express server api endpoints for users:

- POST: /users/register body = { "username": "anyname", "password": "anypass"} register
- POST: /users/ {"username": "Cus", "password" : "pass" } // Cus, Emp, Adm login
- POST: /users/login {"username": "Cus", "password" : "pass" } // Cus, Emp, Adm login

- GET /users : checker whether user is logged in
- GET /users/login: same as above
- GET /users/logout : destroy session cookie
- DELETE /users : also destroy session cookie

- DELETE /users/anyname : delete user account in dynamo as an employee

- GET / : serve index.html shoud serve react native app if hooked with client properly.

### Maybe we will discuss good api endpoints at the meeting

### testing songs from the follow ip addresses. We might go with the first one. my suggestgion is save this .env

with name LAMBDASONGAPI=ipaddress

- 1.  https://v3gpanxg9k.execute-api.us-west-2.amazonaws.com/default/gethomesongs/
- 1.  https://3qt05wpja8.execute-api.us-west-2.amazonaws.com/default/songs/

# user strories:

## Product backlog

- As a user I want to save favorite songs
- As a user I want to make a playlist
- As a user I want to buy songs
- As a user I want to preview a song
- As any user play piano
- As a system keep track of individual track plays

## Sprint Backlog

- As a new user I want to make a new account
- As admin remove employees

---

## In Progress

- As a user see available music
- As a user I want to login
- As an admin I want to add an employee
- As an employee I can delete user accounts\*\* (delete from array of users?)

## In testing
