import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { changeSong } from '../store/actions';

const { create } = require('react-native-pixel-perfect');
const designResolution = {
	width: 1125,
	height: 2436,
}; // what we're designing for
const perfectSize = create(designResolution);

function SongComponent(props: any) {
	const nav = useNavigation();
	const dispatch = useDispatch();

	function handlePlay() {
		dispatch(changeSong(props.data));
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{props.data.title}</Text>
			<Text style={styles.artist}>{props.data.artist}</Text>
			<View style={styles.buttons}>
				<Button title="Play" onPress={handlePlay} />
				<Text> </Text>
				<Button
					title="Details"
					onPress={() => {
						handlePlay();
						nav.navigate('SongDetail');
					}}
				/>
			</View>
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
	buttons: {
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
});

export default SongComponent;
