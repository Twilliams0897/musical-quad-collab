## rest api endpoints

# express api endpoint:
* GET  http://35.166.133.163:3000/users


## api gateway
*  songs   https://socqhojy48.execute-api.us-west-2.amazonaws.com/dev/songs
```
 GET
 DELETE:   /dev/songs/:song_id    
 POST {}  ???

 PUT  https://socqhojy48.execute-api.us-west-2.amazonaws.com/dev/clicks/185
   {
       "clicks": 30
   }
```
-  favorites  https://socqhojy48.execute-api.us-west-2.amazonaws.com/dev/favorites
  
```
GET
POST body: {
    "song_id": 10, "user_id": 21
}
```

-  playlist  https://socqhojy48.execute-api.us-west-2.amazonaws.com/dev/playlists
  
```
GET
POST  body: {
   "song_id": 4,
   "user_id": 10,
   "playlist_name": "mylist10"   
}
```

- searchSongs   https://1bt2tfiy3m.execute-api.us-west-2.amazonaws.com/dev/search
```
   body: { "artist": "sublime" }  
   body: { "title": "fish" } 
```



## unfinished/unnecessary lambda function

- getPlaylistByUser can be {"user_id": 10} or you can make the user_id a parameter
- why error? 


- buySong should post the song_id, user_id, and price then do some sql to subtract the price from the user credits: should user data have list of song_id's purchased

