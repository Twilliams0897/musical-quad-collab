import React from 'react';
import { View, Text, StyleSheet, Button, Linking } from 'react-native';

const { create } = require('react-native-pixel-perfect');
const designResolution = {
	width: 1125,
	height: 2436,
}; // what we're designing for
const perfectSize = create(designResolution);

function SongComponent(props: any) {
	const openURL = (url: string) => {
		Linking.openURL(url).catch((err) =>
			console.error('An error occurred', err)
		);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{props.data.title}</Text>
			<Text style={styles.artist}>{props.data.artist}</Text>
			<Text style={styles.year}>{props.data.year}</Text>
			<Text
				style={styles.url}
				onPress={() => {
					openURL(props.data.web_url);
				}}
			>
				Learn More
			</Text>
			<View style={styles.buttons}>
				<Button
					title="Play"
					onPress={() => {
						console.log(`playing ${props.data.title} by ${props.data.artist}`);
					}}
				/>
				<Button
					title="Favorite"
					onPress={() => {
						console.log(
							`favorited ${props.data.title} by ${props.data.artist}`
						);
					}}
				/>
				<Button
					title="Add to Playlist"
					onPress={() => {
						console.log(`go to added to playlist`);
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
	year: {
		margin: 2,
		fontSize: 16,
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
	button: {
		margin: 2,
	},
});

export default SongComponent;
