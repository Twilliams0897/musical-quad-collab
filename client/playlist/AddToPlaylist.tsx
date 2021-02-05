import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { TextInput } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { UserState } from '../store/store';
import styles from '../global-styles';

interface Props {
	route: any;
	navigation: any;
}

interface Select {
	selection: string | null;
}

function AddToPlaylist({ route, navigation }: Props) {
	const [selection, setSelection] = useState(null);
	const [textInput, setTextInput] = useState('');
	const user = useSelector((state: UserState) => state.user);
	const nav = useNavigation();
	const { song_id } = route.params;

	const handleSubmit = () => {
		const newPlaylist = {
			user_id: user.userId,
			song_id,
			playlist_name: selection === 'createnew' ? textInput : selection,
		};

		//add call to API
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
			{selection === 'createnew' && (
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
