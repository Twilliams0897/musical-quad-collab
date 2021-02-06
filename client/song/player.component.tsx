import React, { useEffect, useRef, useState } from 'react';
import {
	Animated,
	Text,
	Pressable,
	View,
	Image,
	StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { changeSong } from '../store/actions';
import { SongState } from '../store/store';
import { thunkGetSongs } from '../store/thunks';
import { Song } from './song';
import songService from './song.service';
import Playlist from '../playlist/playlist.component';

function PlayerComponent() {
	const [error, setError] = useState({ message: '' });
	const [isPlaying, setPlay] = useState(false);
	const [isStopped, setStop] = useState(false);
	const [volume, setVolume] = useState(true);
	const [playlistIndex, setIndex] = useState(0);
	const [showPlaylist, setShowPlaylist] = useState(false);
	const selectSong = (state: SongState) => state.song;
	const song = useSelector(selectSong);
	// const selectPlaylist = (state: SongState) => state.playlist;
	// const playlist = useSelector(selectPlaylist);
	const dispatch = useDispatch();

	const playlist = [
		{
			playlist_id: 1,
			playlist_name: 'Example',
			user_id: 1,
			song_id: 185,
			title: 'You Belong With Me',
			artist: 'Taylor Swift',
			year: '2008',
			web_url:
				'http://www.songnotes.cc/songs/44-taylor-swift-you-belong-with-me',
			img_url:
				'http://fireflygrove.com/songnotes/images/artists/TaylorSwift.png',
			clicks: 0,
			price: 1,
		},
		{
			playlist_id: 12,
			playlist_name: 'Example',
			user_id: 1,
			song_id: 180,
			title: 'Were Going To Be Friends',
			artist: 'The White Stripes',
			year: '2001',
			web_url:
				'http://www.songnotes.cc/songs/118-the-white-stripes-we-are-going-to-be-friends',
			img_url:
				'http://fireflygrove.com/songnotes/images/artists/TheWhiteStripes.jpg',
			clicks: 28,
			price: 1,
		},
	];

	//set up display animation

	const flickerAnimation = useRef(new Animated.Value(0)).current;

	// Will change blink display value to 1 in 3 seconds continuously

	useEffect(() => {
		Animated.loop(
			Animated.timing(flickerAnimation, {
				toValue: 1,
				duration: 1000,
				useNativeDriver: true,
			}),
			{ iterations: -1 }
		).start();
	}, [flickerAnimation]);

	const addClick = async () => {
		let { clicks } = song;
		let newClicks;
		if (clicks) newClicks = { clicks: clicks + 1 };

		if (song.song_id && newClicks)
			await songService
				.updateClicks(song.song_id, newClicks)
				.then(() => {
					dispatch(thunkGetSongs);
				})
				.catch((err) => setError({ message: err.message }));
	};

	useEffect(() => {
		if (song.title !== '') {
			addClick();
			setPlay(true);
		}
	}, [song]);

	const play = () => {
		setPlay(false);
		if (playlist.length === 0 || isStopped) {
			dispatch(changeSong(new Song()));
		}
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
			{error && error.message !== '' && (
				<Text style={{ color: 'red', fontSize: 32 }}>
					Something went wrong. Refresh the page.
				</Text>
			)}
			{song.title !== '' ? (
				<Animated.Text
					style={[
						styles.display,
						{
							opacity: flickerAnimation,
						},
					]}
				>
					{`Playing: ${song.title} by ${song.artist}`}
				</Animated.Text>
			) : (
				<Text style={styles.nosong}>Music Mania Player</Text>
			)}
			<View style={styles.container}>
				{isPlaying === false && (
					<Pressable
						onPress={() => {
							if (song.title !== '') {
								setPlay(true);
								setStop(false);
							}
						}}
					>
						<Image
							style={styles.stretch}
							source={require('../assets/play_icon.png')}
							accessibilityLabel="Play"
						/>
					</Pressable>
				)}
				{isPlaying && (
					<Pressable
						onPress={() => {
							clearTimeout(playTO);
							setPlay(false);
						}}
					>
						<Image
							style={styles.stretch}
							source={require('../assets/pause_icon.png')}
							accessibilityLabel="Pause"
						/>
					</Pressable>
				)}
				<Pressable
					onPress={() => {
						clearTimeout(playTO);
						setStop(true);
						setPlay(false);
						dispatch(changeSong(new Song()));
					}}
				>
					<Image
						style={styles.stretch}
						source={require('../assets/stop.png')}
						accessibilityLabel="Stop"
					/>
				</Pressable>
				<Pressable onPress={handlePrevious}>
					<Image
						style={styles.stretch}
						source={require('../assets/previous.png')}
						accessibilityLabel="Previous Song"
					/>
				</Pressable>
				<Pressable onPress={handleNext}>
					<Image
						style={styles.stretch}
						source={require('../assets/next.png')}
						accessibilityLabel="Next Song"
					/>
				</Pressable>
				<Pressable onPress={() => setShowPlaylist(!showPlaylist)}>
					<Image
						style={styles.stretch}
						source={require('../assets/playlist_icon.png')}
						accessibilityLabel="Show/Hide Playlist"
					/>
				</Pressable>
				{volume && (
					<Pressable onPress={() => setVolume(false)}>
						<Image
							style={styles.stretch}
							source={require('../assets/volume_on.png')}
							accessibilityLabel="Click to mute"
						/>
					</Pressable>
				)}
				{volume === false && (
					<Pressable onPress={() => setVolume(true)}>
						<Image
							style={styles.stretch}
							source={require('../assets/mute.png')}
							accessibilityLabel="Click to turn on volume"
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
		width: 500,
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
	nosong: {
		textAlign: 'center',
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
