import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { TextInput } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { UserState } from '../store/store';
import styles from '../global-styles';
import songService from '../song/song.service';
import { Playlist } from './playlist';

interface Props {
	route: any;
	navigation: any;
}

function AddToPlaylist({ route, navigation }: Props) {
	const [selection, setSelection] = useState<unknown>(null);
	const [textInput, setTextInput] = useState('');
	const user = useSelector((state: UserState) => state.user);

	const { song_id } = route.params;

	const handleSubmit = () => {
		let playlist_name;

		if (selection && (selection as unknown) === 'createnew') {
			playlist_name = textInput;
		} else {
			playlist_name = selection as unknown;
		}

		let newPlaylist: Playlist = {
			user_id: user.userId as number,
			song_id,
			playlist_name,
		};

		//add call to API
		songService.addToPlaylist(newPlaylist);
		//in .then use to go back to home
		navigation.navigate('PlaylistDetails');
	};

	return (
		<View style={styles.container}>
			<View style={[styles.row, { zIndex: 2 }]}>
				<Text style={styles.label}>Pick playlist: </Text>
				<DropDownPicker
					items={[
						{
							label: 'Create new playlist',
							value: 'createnew',
						},
						{
							label: 'Artist',
							value: 'artist',
						},
						{
							label: 'Title',
							value: 'title',
						},
					]}
					defaultValue={selection}
					placeholder="Select playlist"
					containerStyle={{
						height: 40,
						width: 250,
						borderColor: '#4BA3C3',
						borderWidth: 1,
						borderStyle: 'solid',
						borderRadius: 5,
					}}
					style={{
						backgroundColor: '#4BA3C3',
					}}
					itemStyle={{
						justifyContent: 'flex-start',
						zIndex: 3,
					}}
					labelStyle={{
						fontSize: 14,
						textAlign: 'center',
						color: '#4d243d',
					}}
					selectedLabelStyle={{
						color: '#fef9ff',
					}}
					dropDownStyle={{ backgroundColor: '#4BA3C3' }}
					onChangeItem={(item) => setSelection(item.value)}
				/>
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
