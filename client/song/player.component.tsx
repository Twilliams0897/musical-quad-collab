import React, { useEffect, useState } from 'react';
import { Animated, Pressable, View, Image, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Playlist from '../playlist/playlist.component';
import { changeSong } from '../store/actions';
import { SongState } from '../store/store';
import { Song } from './song';

function PlayerComponent() {
	const [isPlaying, setPlay] = useState(false);
	const [volume, setVolume] = useState(true);
	const [playlistIndex, setIndex] = useState(0);
	const [showPlaylist, setShowPlaylist] = useState(false);
	const selectSong = (state: SongState) => state.song;
	const song = useSelector(selectSong);
	const selectPlaylist = (state: SongState) => state.playlist;
	const playlist = useSelector(selectPlaylist);
	const dispatch = useDispatch();

	useEffect(() => {
		if (song.title !== '') setPlay(true);
	}, [song]);

	const play = () => {
		setPlay(false);
		if (playlist.length) {
			handleNext();
		}
	};

	let playTO: NodeJS.Timeout;

	useEffect(() => {
		if (isPlaying === true && song.title !== '') {
			playTO = setTimeout(() => play(), 15000);
		} else {
			clearTimeout(playTO);
		}
	}, [isPlaying]);

	const handlePrevious = () => {
		if (playlist.length) {
			if (playlistIndex === 0) {
				dispatch(changeSong(playlist[playlist.length - 1]));
				setIndex(playlist.length - 1);
			} else {
				dispatch(changeSong(playlist[playlistIndex - 1]));
				setIndex(playlistIndex - 1);
			}
		}
	};

	const handleNext = () => {
		if (playlist.length) {
			if (playlistIndex === playlist.length - 1) {
				dispatch(changeSong(playlist[0]));
				setIndex(0);
			} else {
				dispatch(changeSong(playlist[playlistIndex + 1]));
				setIndex(playlistIndex + 1);
			}
		}
	};

	return (
		<View style={styles.border}>
			<Animated.Text style={styles.display}>
				{song.title !== ''
					? `Playing: ${song.title} by ${song.artist}`
					: 'Music Mania Player'}
			</Animated.Text>
			<View style={styles.container}>
				{isPlaying === false && (
					<Pressable
						onPress={() => {
							if (song.title !== '') {
								setPlay(true);
							}
						}}
					>
						<Image
							style={styles.stretch}
							source={require('../assets/play_icon.png')}
						/>
					</Pressable>
				)}
				{isPlaying && (
					<Pressable onPress={() => setPlay(false)}>
						<Image
							style={styles.stretch}
							source={require('../assets/pause_icon.png')}
						/>
					</Pressable>
				)}
				<Pressable
					onPress={() => {
						clearTimeout(playTO);
						setPlay(false);
						dispatch(changeSong(new Song()));
					}}
				>
					<Image
						style={styles.stretch}
						source={require('../assets/stop.png')}
					/>
				</Pressable>
				<Pressable onPress={handlePrevious}>
					<Image
						style={styles.stretch}
						source={require('../assets/previous.png')}
					/>
				</Pressable>
				<Pressable onPress={handleNext}>
					<Image
						style={styles.stretch}
						source={require('../assets/next.png')}
					/>
				</Pressable>
				<Pressable onPress={() => setShowPlaylist(!showPlaylist)}>
					<Image
						style={styles.stretch}
						source={require('../assets/playlist_icon.png')}
					/>
				</Pressable>
				{volume && (
					<Pressable onPress={() => setVolume(false)}>
						<Image
							style={styles.stretch}
							source={require('../assets/volume_on.png')}
						/>
					</Pressable>
				)}
				{volume === false && (
					<Pressable onPress={() => setVolume(true)}>
						<Image
							style={styles.stretch}
							source={require('../assets/mute.png')}
						/>
					</Pressable>
				)}
			</View>
			{showPlaylist && <Playlist data={playlist} />}
		</View>
	);
}

const styles = StyleSheet.create({
	border: {
		borderColor: '#b3ffb3',
		borderStyle: 'solid',
		borderWidth: 1,
		margin: 50,
	},
	container: {
		flexDirection: 'row',
		justifyContent: 'center',
		backgroundColor: '#4BA3C3',
		padding: 20,
	},
	display: {
		backgroundColor: '#4d243d',
		color: '#b3ffb3',
		borderBottomColor: '#b3ffb3',
		borderStyle: 'solid',
		borderWidth: 1,
		fontSize: 24,
		padding: 40,
	},
	stretch: {
		width: 40,
		height: 40,
	},
});

export default PlayerComponent;
