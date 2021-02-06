import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { Button, Image, Linking, Text, View, StyleSheet } from 'react-native';
import { MaterialIcons, AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { changeSong } from '../store/actions';
import { UserState } from '../store/store';
import { thunkGetSongs } from '../store/thunks';
import { Song } from '../song/song';
import songService from '../song/song.service';

const { create } = require('react-native-pixel-perfect');
const designResolution = {
	width: 1125,
	height: 2436,
}; // what we're designing for
const perfectSize = create(designResolution);

interface Props {
	data: Song;
	route: any;
	navigation: any;
}

function SongDetail({ data, route, navigation }: Props) {
	const nav = useNavigation();
	const {
		song_id,
		artist,
		title,
		year,
		web_url,
		img_url,
		clicks,
		price,
	} = route.params;

	const userContext = useSelector((state: UserState) => state.user);
	const dispatch = useDispatch();

	const openURL = (url: string) => {
		Linking.openURL(url).catch((err) =>
			console.error('An error occurred', err)
		);
	};

	function handleDelete() {
		if (song_id) {
			songService.deleteSong(song_id).then(() => {
				dispatch(changeSong(new Song()));
				dispatch(thunkGetSongs());
				nav.navigate('Home');
			});
		}
	}

	return (
		<View style={styles.container}>
			<Image source={{ uri: img_url }} accessibilityLabel={`${artist} Image`} />
			<Text style={styles.title}>{title}</Text>
			<Text style={styles.artist}>{artist}</Text>
			<Text style={styles.year}>{year}</Text>
			<Text style={styles.year}>Clicks: {clicks}</Text>
			<Text style={styles.year}>{price}Credit(s)</Text>
			<Text
				style={styles.url}
				onPress={() => {
					openURL(web_url);
				}}
			>
				Learn More
			</Text>
			<View style={styles.buttons}>
				<Button
					title="Favorite"
					onPress={() => {
						console.log(`favorited ${title} by ${artist}`);
					}}
				/>
				<Text> </Text>
				<Button
					title="Add to Playlist"
					onPress={() =>
						nav.navigate('AddToPlaylist', {
							song_id,
							artist,
							title,
							year,
							web_url,
							img_url,
							clicks,
							price,
						})
					}
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
