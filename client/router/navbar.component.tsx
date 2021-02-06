import React from 'react';
import { Button, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../store/store';
import styles from '../global-styles';
import { thunkGetSongs } from '../store/thunks';

function NavBarComponent() {
	const nav = useNavigation();
	const user = useSelector((state: AppState) => state.user);
	const dispatch = useDispatch();
	return (

		<View style={{ flex: 1, flexDirection: 'row' }}>
			{ user.username !== '' ? (<Button
				onPress={() => {
					dispatch(thunkGetSongs);
					nav.navigate('Home');
				}}
				title="Songs"
			/>) : (
				<></>
			)}
			{user.username !== '' ? (<Button
				onPress={() => {
					nav.navigate('Logout');
				}}
				title="Logout"
			/>): (
				<></>
			)}
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

			{user.role === 'admin' ? (
				<Button onPress={() => nav.navigate('ViewUsers')} title="View Users" />
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