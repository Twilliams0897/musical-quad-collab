### it is a little bit headache to setup git workflow especially when we don't know how. So I am suggesting we remove dev branch and just each branch asks for merge request to main.


# starting a project
* git clone https://github.com/Twilliams0897/musical-quad-collab.git
* cd musical-quad-collab
* git pull origin main  (just to make sure your local main is up to date with remote/main)
* git checkout -b yourbranchname (then do some work)
* add and commit then push to yourbranchname
* git push origin yourbranchname  (done and rest)
```
PS C:\Users\jungw\Desktop\p2> git clone https://github.com/Twilliams0897/musical-quad-collab.git
Cloning into 'musical-quad-collab'...
remote: Enumerating objects: 181, done.
remote: Counting objects: 100% (181/181), done.
remote: Compressing objects: 100% (107/107), done.
Receiving objects:  37% (67/181)used 155 (delta 55), pack-reused 0 eceiving objects:  36% (66/181)
Receiving objects: 100% (181/181), 233.23 KiB | 1.59 MiB/s, done.
Resolving deltas: 100% (79/79), done.
PS C:\Users\jungw\Desktop\p2> git pull origin main  
fatal: not a git repository (or any of the parent directories): .git
PS C:\Users\jungw\Desktop\p2> cd .\musical-quad-collab\
PS C:\Users\jungw\Desktop\p2\musical-quad-collab> git pull origin main
From https://github.com/Twilliams0897/musical-quad-collab
 * branch            main       -> FETCH_HEAD
Already up to date.
PS C:\Users\jungw\Desktop\p2\musical-quad-collab> git status
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
PS C:\Users\jungw\Desktop\p2\musical-quad-collab>
```

# To continue your project
* git checkout main
* git pull origin main
*  then ???
*  git checkout yourbranchname (more work)
*  git push origin yourbranchname (then rest)
*  ?? pull request or merge request in remote branch



## directory structure on 1/23/21 (30min meeting)
  
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
user { userId, username, password, role, credits,  favorites: [song_id],      
       playlist: [playlist_id]
 }
 // 'customer', 'employee', 'admin' in dynamoDb

playlist {
	playlist_id: PK, song_id : FK, user_id: FK,
 
}   : pg


 song {
     song_id: number , clicked: number
 }   in pg
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