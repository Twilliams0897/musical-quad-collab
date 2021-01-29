import React, { useEffect } from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { thunkGetHomeSongs } from '../store/thunk';
import { SongState } from '../store/store';
import SongComponent from '../song/song.component';
import styles from '../global-styles';

const HomeScreen = () => {
	const selectSongs = (state: SongState) => state.songlist;
	const songs = useSelector(selectSongs);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(thunkGetHomeSongs());
	}, []);

	return (
		<View style={styles.container}>
			<Text style={styles.header}>Welcome to Music Mania</Text>
			{songs && songs.length ? (
				<FlatList
					data={songs}
					renderItem={({ item }) => <SongComponent data={item}></SongComponent>}
					keyExtractor={(item) => `${item.song_id}`}
				/>
			) : (
				<Text>Loading</Text>
			)}
		</View>
	);
};

const flatstyle = StyleSheet.create({
	container: { alignItems: 'center', width: '100%' },
});
export default HomeScreen;
