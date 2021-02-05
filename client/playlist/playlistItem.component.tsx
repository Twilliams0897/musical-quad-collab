import React from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { changeSong } from '../store/actions';

function PlaylistItem(props: any) {
	const dispatch = useDispatch();

	return (
		<View style={styles.container}>
			<Text style={styles.description}>
				{props.data.title} by {props.data.artist}
			</Text>
			<Button title="Play" onPress={() => dispatch(changeSong(props.data))} />
		</View>
	);
}

export default PlaylistItem;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: 'rgba(77, 36, 61, 0.5)',
	},
	description: {
		margin: 2,
		fontSize: 16,
		color: '#b3ffb3',
	},
});
