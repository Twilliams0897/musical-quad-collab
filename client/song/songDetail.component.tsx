import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { Button, Linking, Text, View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { changeSong } from '../store/actions';
import { SongState, UserState } from '../store/store';
import { thunkGetSongs } from '../store/thunks';
import { Song } from './song';
import songService from './song.service';

const { create } = require('react-native-pixel-perfect');
const designResolution = {
	width: 1125,
	height: 2436,
}; // what we're designing for
const perfectSize = create(designResolution);

function SongDetail(props: any) {
	const nav = useNavigation();

	const song = useSelector((state: SongState) => state.song);
	const userContext = useSelector((state: UserState) => state.user);
	const dispatch = useDispatch();

	const openURL = (url: string) => {
		Linking.openURL(url).catch((err) =>
			console.error('An error occurred', err)
		);
	};

	function handleDelete() {
		if (song.song_id) {
			songService.deleteSong(song.song_id).then(() => {
				dispatch(changeSong(new Song()));
				dispatch(thunkGetSongs());
				nav.navigate('Home');
			});
		}
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{song.title}</Text>
			<Text style={styles.artist}>{song.artist}</Text>
			<Text style={styles.year}>{song.year}</Text>
			<Text style={styles.year}>Clicks: {song.clicks}</Text>
			<Text style={styles.year}>{song.price}Credit(s)</Text>
			<Text
				style={styles.url}
				onPress={() => {
					openURL(song.web_url);
				}}
			>
				Learn More
			</Text>
			<View style={styles.buttons}>
				<Button
					title="Favorite"
					onPress={() => {
						console.log(`favorited ${song.title} by ${song.artist}`);
					}}
				/>
				<Text> </Text>
				<Button
					title="Add to Playlist"
					onPress={() => {
						console.log(`go to added to playlist`);
					}}
				/>
				<Text> </Text>
				<Button
					title="Buy Song"
					onPress={() => {
						console.log(`buy song`);
					}}
				/>
				{userContext.role === 'employee' && (
					<>
						<Text> </Text>
						<Button onPress={handleDelete} title="Delete Song" />
					</>
				)}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-evenly',
		backgroundColor: '#0F4C5C',
		textAlign: 'center',
		padding: 10,
	},
	title: {
		color: '#b3ffb3',
		margin: 2,
		fontSize: 42,
		fontWeight: '500',
	},
	artist: {
		margin: 2,
		fontSize: 24,
		fontWeight: '700',
		color: '#b3ffb3',
	},
	year: {
		margin: 2,
		fontSize: 18,
		color: '#b3ffb3',
	},
	url: {
		margin: 5,
		fontStyle: 'italic',
		color: '#fef9ff',
	},
	buttons: {
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
});

export default SongDetail;
