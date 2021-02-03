import React from 'react';
import { Text, View } from 'react-native';

function PlayerComponent(props: any) {
	return (
		<View>
			<Text>
				Playing: {props.song.title} by {props.song.artist}
			</Text>
		</View>
	);
}

export default PlayerComponent;
