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