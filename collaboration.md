# Git branche names
* master branch name: main (update publishing time?)
* dev branch name: dev  (update at the meeting?)
* jamie: 
* michael: michael
* tashika: 
*  yasmine:

#One of two ways  of starting a project:
* git init
* git remote add origin https://github.com/Twilliams0897/musical-quad-collab.git
* git config --list
* git pull origin dev
* cd server  then npm install   
* cd client then npm install
* git checkout -b your-local-branch-name 
# Task done on 1/22/21
* setup dynamodb and aws rds both working'

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
      pg
      setup
      staticrouter
      user
      app
```

```
user { name, password, role, credits,       playlist
 }
 // 'customer', 'employee', 'admin'

 song {
     song_id: number , clicked: number
 }
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