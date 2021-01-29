

## directory structure on 1/23/21 (30min meeting)

```
client
   deezer
   components
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

 # user strories:
## Product backlog
* As a user I want to save favorite songs
* As a user I want to make a playlist
* As a user I want to buy songs
* As a user I want to preview a song
* As any user play piano
* As a system keep track of individual track plays

## Sprint Backlog
* As a new user I want to make a new account
* As admin remove employees
----------------------------

## In Progress
* As a user see available music
* As a user I want to login
* As an admin I want to add an employee
* As an employee I can delete user accounts** (delete from array of users?)

## In testing