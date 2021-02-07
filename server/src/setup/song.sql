drop table playlist;
drop table song;

create table song(
	song_id serial primary key not null,
	title text not null,
	artist text not null,
	year text not null,
	web_url text,
	img_url text,
	price int not null,
	clickes integer not null, 
	CONSTRAINT pk_song PRIMARY KEY  (song_id)
);

create table playlist
(
    playlist_id integer not null,
    song_id integer not null,
		playlist_name text not null,
    CONSTRAINT pk_playlist PRIMARY KEY  (playlist_id)
);


alter table playlist add constraint fk_playlistsongid
	foreign key (song_id) references song (song_id) on delete no action on update no action;

insert into playlist (playlist_id, song_id, playlist_name)
	values (1, 2, 'Three');
insert into playlist (playlist_id, song_id, playlist_name)
	values (2, 1, 'Three');
insert into playlist (playlist_id, song_id, playlist_name)
	values (3, 2, 'One');



select * from song;

select * from playlist;
