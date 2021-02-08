import React from 'react';
import { Text, View } from 'react-native';
import SongComponent from '../song/song.component';
import styles from '../global-styles';
import { FlatList } from 'react-native-gesture-handler';
import PlayerComponent from '../song/player.component';
import { Song } from '../song/song';

interface Props {
	route: any;
}
function PlaylistDetail({ route }: Props) {
	const { playlist } = route;
	const playlistResponse = [new Song(), new Song(), new Song()];
	return (
		<View style={styles.container}>
			<Text style={styles.header}>{playlist}</Text>
			<PlayerComponent />
			<FlatList
				data={playlistResponse}
				renderItem={({ item }) => <SongComponent data={item}></SongComponent>}
				keyExtractor={(item) => `${item.song_id}`}
			/>
		</View>
	);
}

export default PlaylistDetail;
