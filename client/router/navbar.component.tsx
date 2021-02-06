import React from 'react';
import { Button, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../store/store';
import { thunkGetSongs } from '../store/thunks';

function NavBarComponent() {
	const nav = useNavigation();
	const user = useSelector((state: AppState) => state.user);
	const dispatch = useDispatch();
	return (
		<View style={{ flex: 1, flexDirection: 'row' }}>
			<Button
				onPress={() => {
					dispatch(thunkGetSongs);
					nav.navigate('Home');
					window.location.reload();
				}}
				title="Songs"
			/>
			<Button
				onPress={() => {
					nav.navigate('ViewPlaylists');
				}}
				title="Playlists"
			/>
			{user.role === 'employee' || user.role === 'admin' ? (
				<Button
					onPress={() => {
						nav.navigate('EditUser');
					}}
					title="Manage Users"
				/>
			) : (
				<></>
			)}
		</View>
	);
}

export default NavBarComponent;
