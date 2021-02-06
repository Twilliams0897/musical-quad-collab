import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { UserState } from '../store/store';
import styles from '../global-styles';

interface Props {
	navigation: any;
}

function PlaylistScreen({ navigation }: Props) {
	const user = useSelector((state: UserState) => state.user);

	return (
		<View style={styles.container}>
			<Text style={styles.header}>{`${user.username}'s Playlists`}</Text>
			{user.playlist &&
				user.playlist.map((list) => (
					<Pressable
						onPress={() => {
							navigation.navigate('PlaylistDetail', { playlist: list });
						}}
						style={{
							padding: 20,
							margin: 10,
							backgroundColor: '#4BA3C3',

							borderColor: '#b3ffb3',
							borderStyle: 'solid',
							borderWidth: 1,
							borderRadius: 5,
						}}
					>
						<Text
							style={{ textAlign: 'center', fontSize: 32, color: '#4d243d' }}
						>
							{list}
						</Text>
						<Text style={[styles.url, { textAlign: 'center' }]}>
							Click for more...
						</Text>
					</Pressable>
				))}
		</View>
	);
}

export default PlaylistScreen;
