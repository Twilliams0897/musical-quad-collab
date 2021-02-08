import React, { useState } from 'react';
import { Button, Text, View, Platform } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { TextInput } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { UserState } from '../store/store';
import styles from '../global-styles';
import songService from '../song/song.service';
import { Playlist } from './playlist';
import userService from '../user/user.service';

const { create } = require('react-native-pixel-perfect');
const designResolution = {
	width: 1125,
	height: 2436,
}; // what we're designing for
const perfectSize = create(designResolution);

interface Props {
	route: any;
	navigation: any;
}

class Item {
	constructor(
		public label: any,
		public value: any,
		public icon?: (() => Element) | undefined,
		public hidden?: boolean | undefined,
		public disabled?: boolean | undefined,
		public selected?: boolean | undefined
	) {}
}

function AddToPlaylist({ route, navigation }: Props) {
	const [error, setError] = useState({ message: '' });
	const [selection, setSelection] = useState<unknown>(null);
	const [textInput, setTextInput] = useState('');
	const user = useSelector((state: UserState) => state.user);

	const { song_id } = route.params;

	const createItems = (): Item[] => {
		let items: Item[] = [
			{
				label: 'Create new playlist',
				value: 'createnew',
			},
		];

		let playlistItems: Item[];
		if (user.playlist) {
			playlistItems = user.playlist.map(
				(list) =>
					new Item(list, list, undefined, undefined, undefined, undefined)
			);
			items = [...items, ...playlistItems];
		}
		return items;
	};

	const handleSubmit = () => {
		let playlist_name: any;

		if (selection && (selection as unknown) === 'createnew') {
			playlist_name = textInput;
		} else {
			playlist_name = selection as unknown;
		}

		let newPlaylist: Playlist = {
			song_id,
			playlist_name,
		};

		//add call to API
		songService
			.addToPlaylist(newPlaylist)
			.catch((err) => setError({ message: err.message }));

		if (error.message === '' && selection === 'createnew') {
			let updatedUser = user;
			if (updatedUser.playlist) updatedUser.playlist.push(playlist_name);
			userService
				.updateUser(updatedUser)
				.then(() => {
					setError({ message: `Playlist ${playlist_name} added` });
				})
				.catch(() =>
					setError({ message: `Playlist ${playlist_name} not added` })
				);
		}

		//in .then use to go back to home
		navigation.navigate('ViewPlaylists');
	};

	return (
		<View style={styles.container}>
			{error.message !== '' && (
				<Text style={{ color: 'red' }}>{error.message}</Text>
			)}
			<View style={[styles.row, Platform.OS !== 'android' && { zIndex: 2 }]}>
				<Text style={styles.label}>Pick playlist: </Text>
				{/* <DropDownPicker
					items={createItems}
					defaultValue={selection}
					placeholder="Select playlist"
					containerStyle={{
						height: Platform.OS === 'web' ? perfectSize(40) : perfectSize(80),
						width: Platform.OS === 'web' ? perfectSize(250) : perfectSize(500),
						borderColor: '#4BA3C3',
						borderWidth:
							Platform.OS === 'web' ? perfectSize(1) : perfectSize(2),
						borderStyle: 'solid',
						borderRadius:
							Platform.OS === 'web' ? perfectSize(5) : perfectSize(10),
					}}
					style={{
						backgroundColor: '#4BA3C3',
					}}
					itemStyle={{
						justifyContent: 'flex-start',
						zIndex: 3,
					}}
					labelStyle={{
						fontSize: Platform.OS === 'web' ? perfectSize(14) : perfectSize(28),
						textAlign: 'center',
						color: '#4d243d',
					}}
					selectedLabelStyle={{
						color: '#fef9ff',
					}}
					dropDownStyle={{ backgroundColor: '#4BA3C3' }}
					onChangeItem={(item) => setSelection(item.value)}
				/> */}
			</View>
			{(selection as unknown) === 'createnew' && (
				<View style={styles.row}>
					<Text style={styles.label}>Playlist Name: </Text>
					<TextInput
						style={styles.input}
						value={textInput}
						onChangeText={(text) => setTextInput(text)}
						placeholder="Playlist Name"
					/>
				</View>
			)}
			<Button title="Submit" onPress={handleSubmit} />
		</View>
	);
}

export default AddToPlaylist;
