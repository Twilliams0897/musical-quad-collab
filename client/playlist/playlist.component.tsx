import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { View, Text, StyleSheet, Button, Linking, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { playlistChange } from '../store/actions';
import { UserState } from '../store/store';
import  Playlist  from './playlist';
import playlistService from './playlist.service';

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

interface PlaylistProps {
    data: Playlist;
}

function PlaylistComponent({data}: PlaylistProps) {
	const nav = useNavigation();

	const userContext = useSelector((state: UserState) => state.user);
	const dispatch = useDispatch();

	function goToPlaylist() {
        // dispatch(changeSong(props.data));
        // passing our song to the SongDetail screen and going there.
        nav.navigate('PlaylistDetail', data);
	}
	

	return (
		<View style={styles.container} >
			{/* imaage */}
			<Text>  {data.song_id} </Text>
		
			<Button title='playlistdetail' onPress ={ goToPlaylist } />
			
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

export default PlaylistComponent;
