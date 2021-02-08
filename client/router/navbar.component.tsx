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
			{user && user.username !== '' && (
				<>
					<Button
						onPress={() => {
							dispatch(thunkGetSongs);
							nav.navigate('Home');
						}}
						title="Songs"
					/>
					<Button
						onPress={() => {
							nav.navigate('ViewPlaylists');
						}}
						title="Playlists"
					/>
					<Button
						onPress={() => {
							nav.navigate('Piano');
						}}
						title="Piano"
					/>
					<Button
						onPress={() => {
							nav.navigate('Logout');
						}}
						title="Logout"
					/>
				</>
			)}
			{user && (user.role === 'employee' || user.role === 'admin') ? (
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

/*
{if (user) ? (
	<Button onPress={() => {
		nav.navigate('Logout');
		}}
		title="Logout"/>
		) : (
		<></>
		)}
*/
