import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { View, Text, StyleSheet, Button, Linking, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { changeSong } from '../store/actions';
import { UserState } from '../store/store';
import { thunkGetSongs } from '../store/thunks';
import { Song } from './song';
import songService from './song.service';
import images from '../images';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SongDetailComponent from './song.detail.component';

const { create } = require('react-native-pixel-perfect');

const onPress = (props: any) => {
	alert('you pressed');
	return (<View>pressed </View>);
}
const designResolution = {
	width: 1125,
	height: 2436,
}; // what we're designing for
const perfectSize = create(designResolution);

interface SongProps {
    data: Song;
}

function SongComponent({data}: SongProps) {
	const nav = useNavigation();

	const userContext = useSelector((state: UserState) => state.user);
	const dispatch = useDispatch();

	function goToSong() {
        // dispatch(changeSong(props.data));
        // passing our song to the SongDetail screen and going there.
		nav.navigate('SongDetail', data);
		 console.log(data);
	}
	

	function handleDelete() {
		if (data.song_id) {
			songService.deleteSong(data.song_id).then(() => {
				dispatch(changeSong(new Song()));
				dispatch(thunkGetSongs());
				nav.navigate('Songs');
			});
		}
	}




	return (
		<View style={styles.container} >
			<TouchableOpacity onPress ={ goToSong}>
				<Image  
					source={{ uri:  images[data.artist.length % 10]}} 
					style={styles.image }
				/>
				<Text style={styles.artist}>{data.artist}</Text>
				<Text style={styles.title}>{data.title}</Text>
				<Button title='songdetail' onPress ={ goToSong } />

			</TouchableOpacity>
			
			
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-between',
		margin: 10,
		textAlign: 'center',
		borderColor: '#4BA3C3',
		borderStyle: 'solid',
		borderWidth: 1,
		backgroundColor: '#0F4C5C',
		padding: 10,
		fontSize: 16,
		fontWeight: '400',
		width: perfectSize(500),
	},
	title: {
		color: '#b3ffb3',
		margin: 2,
		fontSize: 20,
	},
	artist: {
		margin: 2,
		fontSize: 16,
		fontWeight: '600',
		color: '#b3ffb3',
	},
	year: {
		margin: 2,
		fontSize: 16,
		color: '#b3ffb3',
	},
	image: {
		width: 200,
		height: 200
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
	button: {
		margin: 2,
	},
});

export default SongComponent;
