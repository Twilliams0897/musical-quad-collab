--drop table playlist;
--drop table user_account;
drop table song;

create table song(
	song_id serial primary key not null,
	title text not null,
	artist text not null,
	year text not null,
	web_url text not null,
	img_url text not null,
	clicked integer default 0 not null,
	price integer DEFAULT 1 not null,
);


create table user_account(
	user_id serial primary key not null,
	username text unique not null,
	password text not null,
	role text not null,
	credits int
);

create table playlist
(
    playlist_id serial primary key not null,
    song_id integer,
	user_id integer
);

create table favorites
(
    favorite_id serial primary key not null,
    song_id integer,
	user_id integer
);


alter table playlist add constraint fk_playlistsongid
	foreign key (song_id) references song (song_id) on delete no action on update no action;
alter table playlist add constraint fk_playlistuserid
	foreign key (user_id) references user_account (user_id) on delete no action on update no action;
alter table favorites add constraint fk_favoritesongid
	foreign key (song_id) references song (song_id) on delete no action on update no action;
alter table favorites add constraint fk_favoriteuserid
	foreign key (user_id) references user_account (user_id) on delete no action on update no action;




